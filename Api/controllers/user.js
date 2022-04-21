const User = require('../models/user');
const Product = require('../models/product');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

    //Encrypt user's password
    bcrypt.hash(userReq.password, 12).then(hashedPw => {

        const user = new User({
            first_name: userReq.first_name,
            last_name: userReq.last_name,
            email: userReq.email,
            password: hashedPw,
            nickname: userReq.nickname,
            phone_code : userReq.phone_code,
            phone : userReq.phone,
            date_created: Date.now(),
        }
        );
        user.save()
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


//GET user's profile
exports.Profile = (req, res, next) => {
    
    const userId = req.userId;

    User.findById(userId)
    // Populate gets info from other collections
        .populate('cart.items.product_id',['price','title','images'])
        .populate('favorite',['title','images'])
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

    //Find User by ID
    User.findById(userid)
        .then(user => {
            //User changes
            if(!user){
                const error = new Error("User doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            user.first_name = userReq.first_name;
            user.last_name = userReq.last_name;
            user.nickname = userReq.nickname;
            user.bio = userReq.bio;
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

exports.Cart = (req, res, next) => {

    var userid = req.userId
    const cartReq = { ...req.body };
    console.log('Cart'+cartReq.quantity)
    let num=0;
    
    //Find Store by ID
    User.findById(userid)
        
        .then(user => {

            var exists=0;
            user.cart.items.forEach(e => {

                if(e.product_id == cartReq.product_id){

                    e.quantity = parseInt(e.quantity)+parseInt(cartReq.quantity);
                    
                    return exists=1;
                   
                }
            });
            if(exists==0)user.cart.items.push(cartReq)

            //Add  Total
            num += cartReq.price*cartReq.quantity;
            user.cart.total += num;
            return user.save();
        })
        
        .then(user => {
            res.status(200).json({
                message: "Item add sucessfully to the cart!",
                user: user
            })
        })
        .catch(error => {
            console.log(error)
            return res
                .status(422)
                .json({
                    message: "Add to cart failed. Try again later.",
                    errors: error
                })
        })

}


exports.Favorite = (req, res, next) => {

    const userId = req.userId;
    var exists = 0;
    User.findById(userId)
    .then(user =>{
        user.favorite.forEach(e=>{
            if(e == req.params.id){
                user.favorite.pull(req.params.id)
                exists=1;
            } 
            
        })
        if(exists==0) user.favorite.push(req.params.id)

        return user.save()
    })
    .then(result=>{
        return Product.findById(req.params.id)
    })
    .then(product=>{

        if(exists==0) product.favorite.push(req.params.id)
        else product.favorite.pull(req.params.id)
        return  product.save()
    })
    .then(result=>{
        res.status(200).json({
            lll: result.favorite.length,
            color: exists
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

//
//TESTES
//


//GET user by Id
exports.GetUserById = (req, res, next) => {
    
    const userId = req.params.id;

    User.findById(userId)
        //Excludes fields
        .select(['-password'])
        // Populate gets info from other collections
        .populate('cart.items.product_id',['price','title','images','_id'])
        .populate('favorite',['title','images'])
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

exports.NewCart = async (req, res, next) => {

    const cartReq = { ...req.body };
    const product = await Product.findById(cartReq.product_id)
    User.findById(cartReq.userId)
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

    //Find Store by ID
    const product = await Product.findById(req.params.productid)
    User.findById(req.params.userid)
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



exports.NewFavorite = (req, res, next) => {
    console.log('New Fav')
    const userId = req.params.userid;
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
