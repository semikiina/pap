const { validationResult } = require('express-validator');
const Store = require('../models/store');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const transporter = require('../mailer');
var crypto = require('crypto');

//Store Get All
exports.GetStores = (req, res, next) => {

    console.log('GET all store')
    //Find all stores
    Store.find()
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find any store.",
                    errors: error.array()
                })
        })
}

//Store New
exports.NewStore = (req, res, next) => {

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

    var storeimg;
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
        views: 0

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

            //Create a token
            //const token = jwt.sign({ store_email: store.store_email, id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
            //res.status(201).json({ id: store._id.toString() ,stoken:token, creatorid: result._id.toString()});
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
                store.active = true;
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
            
            const token = jwt.sign({ id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });

            res.status(201).json({ id: store._id.toString() ,stoken:token});
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
            match: {
              active: true,
            }
          })
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

//Store Login
exports.Login = (req, res, next) => {

    console.log('store/login')
    const userId = req.userId;
    
    //Find User by Nickname
    Store.findOne({creator_id: userId, _id: req.params.id})
        .then(store => {
            //Check if user exists.
            if (!store) {
                const error = new Error("Store doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            //Create a token
            const token = jwt.sign({ store_email: store.store_email, id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
  
            res.status(200).json({ id: store._id.toString() ,stoken:token});
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

    //Find Store by ID
    Store.findById(req.storeId)
        .then(store => {
            //Store changes
            store.store_name = storeReq.store_name;
            store.store_description = storeReq.store_description;
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
        select : 'title images price'
    })
    .then(store =>{
        var orderArray=[];
        store.orders.map((order)=>{
            var totalPrice= 0;

           

            order.items.map((item)=>{
                console.log(item)
                totalPrice += item.product_id.price * item.quantity
            })
            
            orderArray.push({
                orderid:order.orderid._id,
                address: order.orderid.address_1 +", "+ order.orderid.zip_code +", "+ order.orderid.province +", "+ order.orderid.city +", "+ order.orderid.country,
                address_2 : order.orderid.address_2,
                name: order.orderid.first_name +" "+ order.orderid.last_name,
                status: order.orderid.status,
                date_created: order.orderid.date_created,
                items: order.items,
                price: totalPrice
            })
            
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

exports.NewOrderState = (req,res, next) =>{
    console.log('POST order/newState')
    Store.findById(req.storeId)
        .then(order => {
            order.status = req.body.status
            return order.save()
        })
        .then(order => {
            res.status(200).send('State updated successfully!')
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .send('An error occurred. Please try again later.')
        })
}


exports.GetProductsByStore = (req, res, next) => {

    console.log(' GET /product by store')

    Product.find({store_id: req.storeId})
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
