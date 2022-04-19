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
                    errors: error.array()
                })
        })
}


exports.NewProduct = (req, res, next) => {

    let productReq = { ...req.body };
    console.log(req.body);

    var images =[];
    req.files.forEach(element => {
        images.push(element.path)
    });

    const product = new Product({
        title: productReq.title,
        description: productReq.description,
        store_id: req.storeId,
        price: productReq.price,
        date_created: Date.now(),
        images:images,
        active:false,
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


exports.GetTheProduct = (req, res, next) => {

    console.log('GET /product/:id')
    
    var productid = req.params.id
    Product.findById(productid)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the product.",
                    errors: error.array()
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
                    errors: error.array()
                })
        })

}