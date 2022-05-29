const Product = require('../models/product');
const Store = require('../models/store');


//GET all products
exports.GetAll = (req, res, next) => {

    console.log('GET feed/ (ALL PRODUCTS)')
    Product.find()
        .then(product => {

            res.status(200).json(product)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//GET all stores
exports.GetAllStores = (req, res, next) => {

    console.log('GET feed/stores (ALL STORES)')

    Store.find()
        .populate({
            path:'product',
            options: {
                limit: 4
            },
            select: 'title images'
        })
        .then(store => {

            res.status(200).json(store)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}


exports.GetTheStore = (req, res, next) => {

    console.log('GET feed/store/:id')

    Store.findById( req.params.id)
        .populate({
            path: 'product',
            match: {
              active: true,
            }
          })
        .then(store => { 
            console.log(store)
            store.views += 1;
            return store.save();
        })
        .then(store => {
            
            res.status(200).json(store)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "This store doesn't exist.",
                    errors: error

                })
        })
}

exports.SimilarProducts = (req, res, next) => {

    Store.findById( req.params.strid)
        .populate({
            path: 'product',
            match: {
              active: true,
              _id: { $ne : req.params.prid }
            }
          })
        .limit(10)
        .then(similarProducts => {
            
            res.status(200).json(similarProducts.product)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "This store doesn't exist.",
                    errors: error

                })
        })
}

exports.LastWeekStores = (req, res, next) => {

    console.log('GET feed/newStores')

    Store.find()
        .sort({ date_created: -1 }).limit(6)
        .populate({
            path:'product',
            options: {
                limit: 4
            },
            select: 'title images'
        })
        .then(stores => {

            res.status(200).json(stores)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

exports.FeaturedProducts = (req, res, next) => {

    console.log('GET feed/featuredProducts')

    Product.find()
        .sort({ views: -1 }).limit(10)
        
        .then(products => {

            res.status(200).json(products)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//GET product by id
exports.GetTheProduct = (req, res, next) => {

    console.log('GET /product/:id')

    Product.findById(req.params.id)
        .populate({
            path:"store_id",
            select:'store_image store_name',
            populate:{
                path:'creator_id',
                select:'first_name last_name'
            }
        })
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
