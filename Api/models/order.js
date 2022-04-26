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
    country: String,
    phone_code : String,
    phone: String,
    city: String,
    state: String,
    address_1: String,
    address_2: String,
    total: Number,
    date_created : Date,
    status:String,
    zip_code:String,
    cart:{
        items:[
            {
                product_id:{
                    type:Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity: { 
                    type:Number 
                }
            }
        ]
    }
});

module.exports = mongoose.model("Order",OrderSchema);