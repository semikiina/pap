const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
var easyinvoice = require('easyinvoice');
const fs = require('fs');
const transporter = require('../mailer');

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
    
    console.log('POST /order')
    let CheckoutReq = { ...req.body };
    var cartItems=[];
    User.findById(CheckoutReq.user_id)
        .populate('cart.items.product_id',['price','title','images','category','store_id'])
        .then(user =>{

            user.cart.items.forEach((e) =>{
                cartItems.push({
                    "quantity": e.quantity,
                    "description": e.product_id.title,
                    "price": e.product_id.price,
                    "tax-rate": 0,
                })
            })

            const order = new Order({
                user_id: CheckoutReq.user_id,
                email : CheckoutReq.email,
                first_name: CheckoutReq.first_name,
                last_name: CheckoutReq.last_name,
                country: CheckoutReq.country,
                zip_code: CheckoutReq.zip_code,
                province: CheckoutReq.province,
                paypal_id: CheckoutReq.paypal_id,
                phone_code : CheckoutReq.phone_code,
                phone: CheckoutReq.phone,
                city: CheckoutReq.city,
                state: "Payed",
                address_1: CheckoutReq.address_1,
                address_2: CheckoutReq.address_2,
                state: 'Payed',
                cart: user.cart,
                date_created : Date.now(),
            })

            user.cart=[]
            user.save().exec()

            return order.save()
        })
        .then(result => {

        })
        .then(result => {
            var data = {
                // Customize enables you to provide your own templates
                // Please review the documentation for instructions and examples
                "customize": {
                    //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
                },
                "images": {
                    // The logo on top of your invoice
                    "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                },
                // Your own data
                "sender": {
                    "company": "TagMe!",
                    "address": "Sample Street 123",
                    "zip": "1234 AB",
                    "city": "Sampletown",
                    "country": "Portugal"
                },
                // Your recipient
                "client": {
                    "company": CheckoutReq.first_name +" "+ CheckoutReq.last_name,
                    "address": CheckoutReq.address_1,
                    "zip": CheckoutReq.zip_code,
                    "city": CheckoutReq.city,
                    "country": CheckoutReq.country
                },
                "information": {
                    // Invoice number
                    "number": CheckoutReq.paypal_id,
                    // Invoice data
                    "date": new Date(Date.now()).toLocaleDateString(),
                },
                // The products you would like to see on your invoice
                // Total values are being calculated automatically
                "products": cartItems,
                "bottom-notice": "Thanks for purchasing with TagMe!.",
                "settings": {
                    "currency": "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                },
            };
           return easyinvoice.createInvoice(data);
        })
        .then(result => {

            return transporter.sendMail({
                from: 'tagmetheapp@gmail.com', // sender address
                to: CheckoutReq.email, // list of receivers
                subject: "Your Order was placed successfully ✔", // Subject line
                text: "Than", // plain text body
                html: "<p>Hello "+CheckoutReq.first_name+",</p><p>Thanks for your purchase.</p>", // html body
                attachments: [
                    {
                      filename: `invoice.pdf`,
                      content: result.pdf,
                      encoding: 'base64',
                    },
                  ],
              });
        })
       
     
        .then(result => {

            res.status(201).json({
                message: "Order Placed Successfully!",
                email: result
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