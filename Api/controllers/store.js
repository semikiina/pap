const { validationResult } = require('express-validator');
const Store = require('../models/store');
const Order = require('../models/order');
const Notification = require('../models/notification');
const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const transporter = require('../mailer');
var crypto = require('crypto');

const roleLabels=["","Owner", "Administrator","Editor"];

//Verify Store account
exports.verifyEmail = (req, res, next) => {

    console.log('GET /verifyStoreEmail')

    Store.find({ store_email : req.params.id})
        .then(store => {

            if(store.length == 0) res.status(200).send('New Store');
            else res.status(400).send('Email already exists.')
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "An error ocurred.",
                    errors: error.array()
                })
        })
}

//Store New
exports.NewStore = async (req, res, next) => {

    console.log('POST store')
    let storeReq = { ...req.body };
    const n = crypto.randomInt(0, 1000000);
    console.log(n);

    //Check if validation returned errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.StatusCode = 422;
        error.data = errors.array();
        throw error;
    }

    var storeimg="";
    console.log(req.files)
    if(req.files) storeimg= req.files[0].path

    //Create new store
    const store = new Store({
        store_image: storeimg,
        store_name: storeReq.store_name,
        store_email: storeReq.store_email,
        active : false,
        creator_id: req.userId,
        date_created: Date.now(),
        tempCode: n,
        views: 0,
        collaborators:[{
            user_id : req.userId,
            role : 1,
            active: true,
            confirm: true,
            role_label : "Owner"
        }]
    })
    store.save()
        .then( result =>{
           
            return transporter.sendMail({
                from: 'tagmetheapp@gmail.com', // sender address
                to: storeReq.store_email, // list of receivers
                subject: "TagMe! - Store account confirmation ✔", // Subject line
                html: "<body style='font-family:Futura;font-size:20px'>"+
                "<p>Please confirm your email address to complete your TagMe account.</p><br>"+
                "<p>Use this code to confirm your account</p><br><p style='font-size:30px'><b>"+n+"</b></p>"+
                "<p>Thank you,</p><p>TagMe!</p></body>", // html body
              });
        })
        .then( result =>{

            res.status(201).send('Store Created sucessfully!');
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Validation failed. Please insert correct data.",
                    errors: error
                })
        })

}

//GET all users
exports.ConfirmAccount = (req, res, next) => {

    var storeForUser = "";

    console.log('POST /store/confirmAccount')


    Store.findOne({store_email: req.params.email})
        .then(store => {
            storeForUser = store._id
            if(store.tempCode == req.body.code){
                store.tempCode = null;
            } 
            else throw new Error('Code is invalid.');
            return store.save();
        })
         .then(result => {
            return User.findById(req.userId) ;
        })
        .then((user)=>{

            if(user) user.store.push(storeForUser)
            return user.save()
        })
        .then(store => {
            
            const token = jwt.sign({ id: storeForUser.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });

            res.status(201).json({ id: storeForUser.toString() ,stoken:token, store:store});
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//Store Get Info
exports.GetTheStore = (req, res, next) => {

    console.log('GET store (token)')
    
    Store.findById( req.storeId)
        .populate({
            path: 'product',
        })
        .populate("collaborators.user_id" ,"first_name last_name email nickname profile_pic")
        .then(store => {
            
            res.status(200).json(store)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find any store.",
                    errors: error

                })
        })
}

//Store Add new collaborator
exports.NewCollaborator = async (req, res, next) => {

    console.log('POST store/confirmInvite')

    try{
        const decoded = jwt.verify(req.params.token, 'newcollaboratorsecrettagmetoken');

        console.log(decoded)

        const user = await User.findById(req.userId)

        user.store.push(decoded.id);
        
        await user.save();
        
        await Store.updateOne(
            {_id : decoded.id, "collaborators.tempToken" : req.params.token}, 
            {"$set": {
                "collaborators.$.user_id": user._id,
                "collaborators.$.tempToken": "",
                "collaborators.$.active": true,
            }}
        )

        const colabNot = new Notification({
            store_id : decoded.id,
            message: `@${user.nickname} just joined the crew. `,
            read: false,
            date_created: Date.now(),
            ref_type: 3
        })
        await colabNot.save()

        const token = jwt.sign({ id: decoded.id }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
        res.status(200).json({ stoken:token});
    }
    catch(error){
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Validation failed. Please insert correct data.",
                errors: error
            })
    }
}

//Store Edit Collaborator
exports.EditCollaborator = async (req, res, next) => {

    console.log('POST store/editCollaborator')

    console.log(req.body.role)
    try{

        const user = await User.findById(req.params.id)
        
        await Store.updateOne(
            {_id : req.storeId, "collaborators.user_id" : req.params.id}, 
            {"$set": {
                "collaborators.$.role" : req.body.role,
                "collaborators.$.role_label" : roleLabels[req.body.role]
            }}
        )

        const colabNot = new Notification({
            store_id : req.storeId,
            message: `@${user.nickname} is now an ${roleLabels[req.body.role]}. `,
            read: false,
            date_created: Date.now(),
            ref_type: 3
        })
        await colabNot.save()

        res.status(200).send("Updated Sucessfully.");
    }
    catch(error){
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Validation failed. Please insert correct data.",
                errors: error
            })
    }
}

exports.RemoveCollaborator = async (req, res, next) => {

    console.log('POST store/confirmInvite')

    try{

        await Store.updateOne(
            {_id : req.storeId}, 
            {
                $pull : {
                    collaborators : {
                        user_id : req.params.id
                    }
                }
            }
        )

        await User.updateOne(
            { _id : req.params.id },
            {
                $pull: {
                    store: req.storeId 
                }
            }
        )


        res.status(200).json("User removed.");
    }
    catch(error){
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Validation failed. Please insert correct data.",
                errors: error
            })
    }
}

//Store Invite Collaborator
exports.InviteCollaborator = async (req, res, next) => {

    console.log('POST store/inviteCollaborator')

    
    const InviteReq = {...req.body}

    try {
        const store = await Store.findById(req.storeId)

        var message = ""
        const token = jwt.sign({id: store._id.toString() }, 'newcollaboratorsecrettagmetoken', { expiresIn: '12h' });
        
        store.collaborators.push({
            tempToken: token,
            role : InviteReq.role,
            role_label : roleLabels[InviteReq.role]
        })
        await store.save();

        if(InviteReq.message) message = InviteReq.message + `<br/><a href="http://localhost:3000/confirmInvite/${token}">JOIN NOW!</a>`;
        else message= `<p>Hello!</p><br/><p>You are invited to join "${store.store_name}" crew!</p><br/><p>Click below to join!</p><br/><a href="http://localhost:3000/confirmInvite/${token}">JOIN NOW!</a>`

        await transporter.sendMail({
            from: 'tagmetheapp@gmail.com', 
            to: InviteReq.email, 
            subject: "TagMe! - Collaboration Invite !", 
            html: message
        });
        
        res.send("email send successfully!")

    } catch (error) {
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Validation failed. Please insert correct data.",
                errors: error
            })
    }
    
}


//Store Login
exports.Login = (req, res, next) => {

    console.log('store/login')
    const userId = req.userId;
    
    Store.findOne({"collaborators.user_id": userId, _id: req.params.id})
        .populate("collaborators.user_id" ,"first_name last_name email nickname profile_pic")
        .then(store => {
            //Check if user exists.
            if (!store) {
                const error = new Error("Store doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            //Create a token
            const token = jwt.sign({ store_email: store.store_email, id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
  
            res.status(200).json({ id: store._id.toString() ,stoken:token, store: store});
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//Store Update
exports.NewUpdateStore = (req, res, next) => {

    console.log('POST store/editStore')

    const storeReq = { ...req.body};

    Store.findById(req.storeId)
        .then(store => {
            //Store changes
            store.store_name = storeReq.store_name;
            store.store_description = storeReq.store_description;
            store.active =  storeReq.active;
            if(req.files.length >0) store.store_image = req.files[0].path;
            return store.save();
        })
        .then(store => {
            res.status(200).json({
                message: "Store updated sucessfully!",
                store: store
            })
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Validation failed. Please insert correct data.",
                    errors: error
                })
        })

}

//Store Orders
exports.StoreOrders = (req, res, next) => {

    console.log('Store Orders')
    Store.findById(req.storeId)
    .populate({
        path: 'orders.orderid',
        select : ' first_name last_name address_1 address_2 zip_code province city country status date_created'
    })
    .populate({
        path: 'orders.items.product_id',
        select : 'title images price variants'
    })
    .then(store =>{
        var orderArray=[];
        store.orders.map((order)=>{
             var totalPrice= 0;
           

            order.items.map((item)=>{
                var price = item.product_id.variants.prices.filter((item1) => item1.skuid == item.skuid )[0].originalPrice
                totalPrice += price * item.quantity
            })

            if(order.orderid){

                var address = order.orderid.address_1 +", "
                if(order.orderid.address_2) address += order.orderid.address_2 + " ,"
                address += order.orderid.zip_code +", "+ order.orderid.province +", "+ order.orderid.city +", "+ order.orderid.country
                
                orderArray.push({
                    orderid:order.orderid._id,
                    address: address,
                    name: order.orderid.first_name +" "+ order.orderid.last_name,
                    status: order.status,
                    date_created: order.orderid.date_created,
                    items: order.items,
                    price: totalPrice.toFixed(2)
                })
            }
           
        })
        res.status(200).json({orders : orderArray})
    })
    .catch(error => {
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Validation failed.",
                errors: error
            })
    })

}

exports.NewOrderState = async (req,res, next) =>{
    console.log('POST store/ordersssss/'+ req.params.id)
   try{ 
        await Store.updateOne({_id : req.storeId, 'orders.orderid' : req.params.id}, {
            '$set': {
                'orders.$.status': 'fulfilled',
            }
        })

        const stores = await Store.find().elemMatch("orders", {"orderid":req.params.id})
        var verify = 1;
        stores.forEach((store)=>{
            const order = store.orders.find((ord) => ord.orderid == req.params.id)
            if (order.status.toLowerCase() == "payed") verify *= 0;
            else if (order.status.toLowerCase() == "fulfilled") verify *=1; 
        })
        

        if(verify){
            await Order.updateOne({_id : req.params.id},{status : "fulfilled"})
        }


        res.status(200).send('order updated sucessfully!')
    }
    catch(err){
        return res
        .status(422)
        .json({
            message: "An error ocurred. Try again later.",
            errors: err
        })
    }
}


exports.GetProductsByStore = (req, res, next) => {

    console.log(' GET /product by store')

    Product.find({store_id: req.storeId , exists : true})
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the product.",
                    errors: error
                })
        })
}


exports.GetRemovedProductsByStore = (req, res, next) => {

    console.log(' GET /rproduct by store')

    Product.find({store_id: req.storeId , exists : false})
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the product.",
                    errors: error
                })
        })
}



exports.GetStoreOrdersChart = async (req, res, next) => {

    console.log('POST /store/ordersLog')

    try{
        const orderDates = await Store.findById(req.storeId)
        .populate({
            path: 'orders.orderid',
            select : 'date_created'
        })

        var myDate = new Date(req.body.date);
    
        const orderCount = orderDates.orders.filter((order) =>  new Date(order.orderid?.date_created) >= myDate).length

        res.status(200).json(orderCount)
    }
    catch (error){
        console.log(error)
        return res
        .status(422)
        .json({
            message: "Can't find the store.",
            errors: error
        })
    }
   
}

exports.GetStoreSalesChart = async (req, res, next) => {

    console.log('POST /store/salesLog')

    try{

        const salesStore = await Store.findById(req.storeId)
        .populate({
            path: 'orders.orderid',
            select : 'date_created'
        })
        .populate({
            path: 'orders.items.product_id',
            select : 'variants'
        })

        var myDate = new Date(req.body.date)
    
        const sales = salesStore.orders.filter((order) => new Date(order.orderid?.date_created) >= myDate)
        
        var totalSales = 0;
        
        sales.forEach((order) =>{
            order.items.forEach((item) =>{
                
                var price = item.product_id.variants.prices.filter ((e) => e.skuid == item.skuid)[0].originalPrice
                totalSales += price * item.quantity
            })
        })

        res.status(200).json(totalSales)
    }
    catch (error){
        console.log(error)
        return res
        .status(422)
        .json({
            message: "Can't find the store.",
            errors: error
        })
    }
}
