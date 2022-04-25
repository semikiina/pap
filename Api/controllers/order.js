const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
var easyinvoice = require('easyinvoice');
const fs = require('fs');

exports.GetOrder = (req, res, next) => {
    Order.find({email: req.params.email})
    .populate('cart.items.product_id',['price','title','images'])
    //Product.find()
        .then(order => {
            res.status(200).json(order)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the order.",
                    errors: error.array()
                })
        })
}


exports.Checkout = (req, res, next) => {
    
    let CheckoutReq = { ...req.body };

    User.findById(CheckoutReq.user_id)
        .then(user =>{

            const order = new Order({
                user_id: CheckoutReq.user_id,
                email : CheckoutReq.email,
                first_name: CheckoutReq.first_name,
                last_name: CheckoutReq.last_name,
                country: CheckoutReq.country,
                zip_code: CheckoutReq.zip_code,
                // phone_code : CheckoutReq.phone_code,
                // phone: CheckoutReq.phone,
                city: CheckoutReq.city,
                //state: CheckoutReq.state,
                address_1: CheckoutReq.address_1,
                // address_2: CheckoutReq.address_2,
                // total: CheckoutReq.total,
                cart: user.cart,
                date_created : Date.now(),
            })

            return order.save()
        })
        .then(result => {

            res.status(201).json({
                message: "Order Placed Successfully!",
                pdf: result
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