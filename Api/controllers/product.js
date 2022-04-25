
const { createIndexes } = require('../models/product');
const Product = require('../models/product');
const Store = require('../models/store');


exports.GetProducts = (req, res, next) => {

    console.log(' GET /product')
    //{store_id: req.storeId}
    Product.find()
    //Product.find()
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


exports.NewProduct = (req, res, next) => {

    let productReq = { ...req.body };
    var images =[];
    req.files.forEach(element => {
        images.push(element.path)
    });

    const product = new Product({
        title: productReq.title,
        description: productReq.description,
        store_id: productReq.store_id,
        price: productReq.price,
        shipping: productReq.shipping,
        date_created: Date.now(),
        images:images,
        active:productReq.active,
    })
    product.save()
        .then(result =>{
            return Store.findById(productReq.store_id)    
        })
        .then(store=>{

            if(store) store.product.push(product)
            return store.save()
        })

        .then(result => {

            res.status(201).json({
                message: "Product created successfully!",
                product: result
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


exports.GetTheProduct = (req, res, next) => {

    console.log('GET /product/:id')
    
    var productid = req.params.id
    Product.findById(productid)
    .populate('store_id',['store_name','creator_id','store_image'])
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


//Update Product not working
exports.UpdateProduct = (req, res, next) => {
    var productid = req.params.id
    let productReq = { ...req.body };

    Product.findById(productid)
        .then(product => {
            product.title = productReq.title;
            product.price = productReq.price;
            product.description = productReq.description;
            return product.save();
        })
        .then(product => {
            res.status(200).json({
                message: "Product updated!",
                product: product
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


exports.GetSimilarProducts = (req, res, next) => {

    console.log('GET /product/:id')
    Product.find({store_id: req.params.id})
        .sort({'date': -1})
        .limit(2)
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

exports.GetProductsByStore = (req, res, next) => {

    console.log(' GET /product by store')
    //{store_id: req.storeId}
    Product.find({store_id: req.params.id})
    //Product.find()
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

exports.DistinctCategorys = (req, res, next) => {

    console.log(' GET distinct categorys')
    Product.find()
    .distinct('category')
        .then(cats => {
            res.status(200).json(cats)
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

exports.DeleteManyProduct = (req, res, next) => {

    console.log('Delete many products')

    let productIDS = { ...req.body };
    Product.deleteMany({_id : {$in: productIDS.d}})
        .then(deletes => {
            res.status(200).json(deletes)
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

exports.DeleteProduct = (req, res, next) => {

    console.log('Delete one Product')
    Product.deleteOne({_id : req.params.id})
        .then(cats => {
            res.status(200).json(cats)
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

exports.UpdateProductState = (req, res, next) => {

    console.log(' Update Product State')
    Product.findById(req.params.id)
        .then(prd => {
            if(prd.active)  prd.active =false;
            else prd.active = true
            return prd.save();
        })
        .then(prd =>{
            res.status(200).json('state updated!');
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