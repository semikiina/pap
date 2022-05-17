const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id : {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    paypal_id: String,
    email : String,
    first_name: String,
    last_name: String,
    phone_code : String,
    phone: String,
    address_1: String,
    address_2: String,
    zip_code:String,
    province: String,
    city: String,
    country: String,
    total: Number,
    date_created : Date,
    status: String,
    cart:{
        items:[
            {
                product_id:{
                    type:Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity: { 
                    type:Number 
                },
                variants:{
                    color: String,
                    size: String,
                }
            }
        ],
        subtotal: Number,
        shipping: Number,
        total : Number,
    }
});

module.exports = mongoose.model("Order",OrderSchema);