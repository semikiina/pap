const Product = require('../models/product');
const Store = require('../models/store');
var fs = require('fs');


//Delete
exports.GetProducts = (req, res, next) => {

    console.log(' GET /product')

    Product.find({active:true})
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

    var variants={
        color: productReq.color,
        size: productReq.size
    };
    

    const product = new Product({
        title: productReq.title,
        description: productReq.description,
        store_id: req.storeId,
        price: productReq.price,
        stock: productReq.stock,
        category : productReq.category,
        shipping: parseInt(productReq.shipping) ,
        date_created: Date.now(),
        images:images,
        active:productReq.active,
        variants: variants,
        exists: true
    })
    product.save()
        .then(result =>{
            return Store.findById(req.storeId)    
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

exports.UploadImageToProduct = (req,res, next) =>{
    console.log('Upload Image to product')
    Product.findById(req.params.id)
        .then(product => {
            product.images.push(req.files[0].path)
            return product.save()
        })
        .then(product => {
            res.status(200).json({
                message: "Image successfully added!",
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
exports.DeleteImageFromProduct = (req,res, next) =>{
    console.log('Delete Image from product')
    let imageReq = req.body.img

    console.log(imageReq)
    Product.findById(req.params.id)
        .then(product => {
            fs.unlinkSync('C:\\Users\\ASUS\\Desktop\\pap\\pap\\Api\\'+imageReq);
            product.images = product.images.filter(src =>{
                                return src !== imageReq
                            })
            return product.save();
        })
        .then(product => {
            res.status(200).json({
                message: "Image updated!",
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


//Products by id
exports.GetTheProduct = (req, res, next) => {

    console.log('GET /product/:id')
    
    var productid = req.params.id
    Product.findById(productid)
    .populate({
        path:"store_id",
        select:'store_image store_name',
        populate:{
            path:'creator_id',
            select:'first_name last_name'
        }
    })
        .then(product => {
            product.views += 1;
            return product.save()
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
                    message: "Can't find the products.",
                    errors: error
                })
        })
}

exports.DeleteProduct = (req, res, next) => {

    console.log('Delete one Product HELPPP')
    Product.updateOne({_id : req.params.id},{exists: false})
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