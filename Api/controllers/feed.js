const Store = require('../models/store');
const Product = require('../models/product');


//GET all products
exports.GetAll = (req, res, next) => {
    Product.find()
        .then(product => {

            res.status(200).json(product)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}

//GET product by id
exports.GetTheProduct = (req, res, next) => {
    console.log(req.params.id)
    Product.findById(req.params.id)
        .then(product => {
            console.log(product)
            res.status(200).json(product)
        })
        .catch(err => {
            if (!err.StatusCode) err.StatusCode = 500;
            next(err);
        })
}
