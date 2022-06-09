const Product = require('../models/product');
const Notification = require('../models/notification');
const User = require('../models/user');
const Store = require('../models/store');

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


exports.NewProduct = async (req, res, next) => {

    let productReq = { ...req.body };
    console.log(productReq)

    const user = User.findById(req.userId);
    var vprices= []
    var voptions = []
    if(productReq.voptions){
        productReq.vprices.forEach((prc)=>{
            try{
                vprices.push(JSON.parse(prc))
            }
            catch(err){
                
            }
        })

        productReq.voptions.forEach((opt)=>{
            try{
                voptions.push(JSON.parse(opt))
            }
            catch(err){

            }
        })
    }
    else{
        vprices=[{
            skuid: "default",
            availableQuantity: productReq.stock,
            originalPrice : productReq.basePrice
        }]
    }

    var images =[];

    req.files.forEach(element => {

        images.push(element.path)
    });

    const product = new Product({
        title: productReq.title,
        description: productReq.description,
        store_id: req.storeId,
        basePrice: parseFloat(productReq.basePrice),
        stock: productReq.stock,
        category : productReq.category,
        shipping: parseFloat(productReq.shipping) ,
        date_created: Date.now(),
        images:images,
        active:productReq.active,
        variants: {
            options: voptions,
            prices : vprices
        },
        exists: true,
        views:0
    })
    
    product.save()
        .then(result =>{
            return Store.findById(req.storeId)    
        })
        .then(store=>{
            const newPrd = new Notification({
                store_id : store._id,
                product_id : product._id,
                message: `@${user.nickname} created a new product - "${product.title}" . `,
                read: false,
                date_created: Date.now(),
                ref_type: 6
            });

            newPrd.save()

            if(store) store.product.push(product)
            return store.save()
        })
        .then(result => {
            res.status(201).send("Product created successfully!")
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
exports.UpdateProduct = async (req, res, next) => {

    console.log(' POST product/upd/'+req.params.id)


    var productid = req.params.id
    let productReq = { ...req.body };

    var vprices=[];
    var images =[];

    if(req.files){
        req.files.forEach(element => {

            images.push(element.path)
        });
    }
   
    if(productReq.vprices){
        productReq.vprices.forEach((opt)=>{
            try{
                vprices.push(JSON.parse(opt))
            }
            catch(err){

            }
        })
    }

    const user = await User.findById(req.userId);

    Product.findById(productid)
        .then(product => {
            product.title = productReq.title;
            product.stock = productReq.stock;
            product.category = productReq.category;
            product.basePrice = productReq.basePrice;
            product.active = productReq.active;
            product.description = productReq.description;
            if(req.files) product.images = images;
            if(product.variants.prices.length) product.variants.prices =  vprices;
            
            const newPrd = new Notification({
                store_id : product.store_id,
                product_id : product._id,
                message: `@${user.nickname} updated the product - "${product.title}" . `,
                read: false,
                date_created: Date.now(),
                ref_type: 6
            });
            newPrd.save()
            
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

exports.DeleteManyProduct =  async (req, res, next) => {

    console.log('Delete many products')

    let productIDS = req.body.arr

    try {
        const user = await User.findById(req.userId);
        const products = await Product.find({ _id : {"$in" : productIDS}})
        await Promise.all(products?.forEach((prd) => {
              
                prd.removedDate = Date.now();
                prd.active = false;
                prd.exists = false;
                prd.save();
        }))
        var newPrd = new Notification({
            store_id : products[0].store_id,
            message: `@${user.nickname} removed ${productIDS.length} products. `,
            read: false,
            date_created: Date.now(),
            ref_type: 6
        });
        newPrd.save();
       
       
        res.status(200).json("Products will be permanently deleted in 30 days.")

    } catch (error) {
        console.log(error)
        return res
        .status(422)
        .json({
            message: "Can't find the product.",
            errors: error
        })
    }
}

exports.RestoreProduct = async (req, res, next) => {

    console.log('Restore Product')

    try{

        const prd = await Product.findById(req.params.id)

        prd.exists = true
        prd.removedDate = "";

        await prd.save()

        const user = await User.findById(req.userId);

        var newPrd = new Notification({
            store_id : prd.store_id,
            message: `@${user.nickname} just restored the product - "${prd.title}". `,
            read: false,
            date_created: Date.now(),
            ref_type: 6
        });
        newPrd.save();

        res.status(200).json('product restored!');
    }
    catch(error){
        
        return res
            .status(422)
            .json({
                message: "Can't find the product.",
                errors: error
            })
    }
}


exports.UpdateProductState = async (req, res, next) => {

    console.log(' Update Product State')

    try{

        const prd = await Product.findById(req.params.id)

        prd.active = !prd.active

        await prd.save()

        res.status(200).json('state updated!');
    }
    catch(error){
        
        return res
            .status(422)
            .json({
                message: "Can't find the product.",
                errors: error
            })
    }
}