const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../mailer');
var crypto = require('crypto');

//POST new User
exports.NewUser = (req, res, next) => {

    const userReq = { ...req.body };

    //Handling validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed. Email or Nickname Taken.');
        error.StatusCode = 422;
        error.data = errors.array();
        throw error;
    }

    var tempToken = crypto.randomBytes(20).toString('hex');

    //Encrypt user's password
    bcrypt.hash(userReq.password, 12).then(hashedPw => {

        const user = new User({
            first_name: userReq.first_name,
            last_name: userReq.last_name,
            email: userReq.email,
            password: hashedPw,
            nickname: userReq.nickname,
            tempToken : tempToken,
            date_created: Date.now(),
            active: false,
        }
        );
        user.save()
            .then(result => {
                return transporter.sendMail({
                    from: 'tagmetheapp@gmail.com', // sender address
                    to: userReq.email, // list of receivers
                    subject: "TagMe! - Account confirmation ✔", // Subject line
                    html: "<body style='font-family:Futura;font-size:20px'><p>Hello "+userReq.first_name+",</p>"+
                    "<p>Please confirm your email address to complete your TagMe account.</p><br>"+
                    "<a style='width:100%;background-color:green;padding:10px;text-decoration:none;color:white;font-size:30px;border-radius:10px;' href='http://localhost:8090/user/confirmAccount/"+userReq.nickname+"/"+tempToken+"'>Confirm Email address</a>"+
                    "<p>Thank you,</p><p>TagMe!</p></body>", // html body
                    
                  });
            })
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    user: result._id
                })
            })
            .catch(error => {
                console.log(error);
                return res
                    .status(422)
                    .json({
                        message: "Validation failed. Please insert correct data.",
                        errors: error.array()
                    })
            })
    })

}

//GET all users
exports.ConfirmAccount = (req, res, next) => {

    console.log('POST /user/confirmAccount')
    User.findOne({nickname: req.params.nickname})
        .then(user => {
            if(user.tempToken == req.params.token){
                user.active = true;
                user.tempToken = "";
            } 
            else throw new Error('Token is invalid.');
            return user.save();
        })
        .then(user => {
            res.redirect('http://localhost:3000');
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//GET all users
exports.GetUsers = (req, res, next) => {

    console.log(' GET /user')
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}


//GET user's profile
exports.Profile = (req, res, next) => {
    
    const userId = req.userId;
    console.log('GET user/profile')
    User.findById(userId)
        //Excludes fields
        .select(['-password'])
        // Populate gets info from other collections
        .populate('cart.items.product_id',['price','title','images','_id','category'])
        .populate('favorite',['title','images','price'])
        .populate('store')
        .then(user => {
            if (!user) {
                const error = new Error('Could not find the user.')
                error.StatusCode = 404;
                throw error;
            }
            res.status(200).json(user)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}




//User Login
exports.Login = (req, res, next) => {
    
    const userReq = { ...req.body };
    let loadedUser;
    //Find User by Nickname
    User.findOne({ email: userReq.email })
        .then(user => {
            //Check if user exists.
            if (!user) {
                const error = new Error("Email doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            loadedUser = user;
            //Compare hash password with req password
            return bcrypt.compare(userReq.password, user.password)
        })
        .then(isEqual => {
            //Check is password matches
            if (!isEqual) {
                const error = new Error('Password wrong');
                error.StatusCode = 401;
                throw error;
            }

            //Create a token
            const token = jwt.sign({ nickname: loadedUser.nickname, id: loadedUser._id.toString() }, 'supersecrettagmetoken', { expiresIn: '30d' })
        
            res.status(201).json({ token:token , nickname: loadedUser.nickname , email : loadedUser.email});

        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}


exports.EditProfile = (req, res, next) => {

    var userid = req.userId
    const userReq = { ...req.body };
    console.log(req.files)
    //Find User by ID
    User.findById(userid)
        .then(user => {
            //User changes
            if(!user){
                const error = new Error("User doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            if(req.files) user.profile_pic = req.files[0].path;
            user.first_name = userReq.first_name;
            user.last_name = userReq.last_name;
            user.nickname = userReq.nickname;
            return user.save();
        })
        .then(user => {
            res.status(200).json({
                message: "User updated sucessfully!",
                user: user
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

exports.AddAddress = (req, res, next) => {

    console.log('POST user/addAdress')
    var userid = req.userId
    const userReq = { ...req.body };
    User.findById(userid)
        .then(user => {
            if(!user){
                const error = new Error("User doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            user.addresses.push(userReq);
            return user.save();
        })
        .then(user => {
            res.status(200).json({
                message: "Address add successfull!",
                user: user.addresses
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

exports.Favorite = (req, res, next) => {
    console.log('New Fav')
    const userId = req.userId;
    let exists;
    User.findById(userId)
    .then(user =>{
        if(!user.favorite.includes(req.params.id)){
            exists=true;
            return user.updateOne({ $push : { favorite: {_id:req.params.id}}}).exec()
        }
        else{
            exists=false;
            return user.updateOne({ $pull : { favorite: req.params.id}}).exec()
        }
        
    })
    .then(user=>{
        return Product.findById(req.params.id)
    })
    .then(product=>{
        if(!product.favorite.includes(userId)){
            product.updateOne({ $push : { favorite: userId}}).exec()
        }
        else{
            product.updateOne({ $pull : { favorite: userId}}).exec()
        }

        return product.save()
    })
    .then(result=>{
        res.status(200).json({
            fav: exists
        })
    })
    
    .catch(error => {
        console.log(error)
        return res
            .status(422)
            .json({
                message: "Operation failed.Try again later.",
                errors: error
            })
    })
}


exports.Cart = async (req, res, next) => {

    const cartReq = { ...req.body };
    const product = await Product.findById(cartReq.product_id)
    User.findById(req.userId)
    .then(user => {
        return user.AddToCart(product)
    })
    .then(user => {
        res.status(201).json( {cart : user.cart})
    })
    .catch(error => {
        console.log(error)
        return res
            .status(422)
            .json({
                message: "Try again later.",
                errors: error
            })
    })
}

exports.DeleteCart = async (req, res, next) => {

    const product = await Product.findById(req.params.productid)
    User.findById(req.userId)
    .then(user => {
        return user.RemoveFromCart(product)
    })
    .then(user => {
        res.status(201).json( {cart : user.cart})
    })
    .catch(error => {
        console.log(error)
        return res
            .status(422)
            .json({
                message: "Try again later.",
                errors: error
            })
    })

}


//User Orders
exports.UserOrders = (req, res, next) => {

    console.log('User Orders')

    Order.find({user_id : req.userId})
        .populate({
            path:'cart.items.product_id',
            select:'title images price category',
            populate:{
                path:"store_id",
                select:'store_name store_image'
            }
        })
        .then(orders => {
            res.status(200).json({orders})
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

//User Orders
exports.DeleteAddress = (req, res, next) => {

    console.log('DELETE user/deleteAddress')

    User.findById(req.userId)
    .then(user=>{
        return user.updateOne({ $pull : { addresses: {_id: req.params.addressId}}}).exec()
    })
    .then(data=>{
        res.status(200).send('ok')
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