const { validationResult } = require('express-validator');
const Store = require('../models/store');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

    //Check if validation returned errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.StatusCode = 422;
        error.data = errors.array();
        throw error;
    }

    //Create new store
    const store = new Store({
        store_name: storeReq.store_name,
        store_description: storeReq.store_description,
        store_email: storeReq.store_email,
        store_nickname: storeReq.store_nickname,
        creator_id: req.userId,
        date_created: Date.now(),

    })
    store.save()
        .then(result => {

            return User.findById(req.userId) ;
        })
        .then((user)=>{

            if(user) user.store.push(store)
            return user.save()
        })
        .then( result =>{

            //Create a token
            const token = jwt.sign({ store_email: store.store_email, id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
            res.status(201).json({ id: store._id.toString() ,stoken:token, creatorid: result._id.toString()});
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

//Store Get Info
exports.GetTheStore = (req, res, next) => {

    console.log('store/profile')
    var storeid = req.storeId

    //Find store by ID
    Store.findById(storeid)
        .then(store => {
            res.status(200).json(store)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the store.",
                    errors: error.array()
                })
        })
}

//Store Login
exports.Login = (req, res, next) => {

    console.log('store/login')
    const userId = req.userId;
    
    //Find User by Nickname
    Store.findOne({creator_id: userId})
        .then(store => {
            //Check if user exists.
            if (!store) {
                const error = new Error("Store doesn't exist");
                error.StatusCode = 404;
                throw error;
            }
            //Create a token
            const token = jwt.sign({ store_email: store.store_email, id: store._id.toString() }, 'supersecretstoretagmetoken', { expiresIn: '30d' });
  
            res.status(201).json({ id: store._id.toString() ,stoken:token});
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//Store Update
exports.UpdateStore = (req, res, next) => {
    console.log('PUT store')
    var storeid = req.params.id
    const storeReq = { ...req.body };

    //Find Store by ID
    Store.findById(storeid)
        .then(store => {
            //Store changes
            store.name = storeReq.store_name;
            store.description = storeReq.store_description;
            return store.save();
        })
        .then(store => {
            res.status(200).json({
                message: "Store ok!",
                store: store
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

}




//Store Get All
exports.GetTheStoreNew = (req, res, next) => {

    console.log('GET store By User')
    //Find all stores
    Store.findById( req.params.id)
        .populate({
            path: 'product',
            match: {
              active: false,
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