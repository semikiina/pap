const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    store_email: String,
    store_name: String,
    creator_id : {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    store_image : String,
    date_created: Date,
    private: Boolean,
    active: Boolean,
    store_description: String,
    views: Number,
    tempCode: Number,
    product:[{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }],
    orders :[{
        orderid:{
            type: Schema.Types.ObjectId,
            ref:'Order'
        },
        items:[{
            product_id :{
                type: Schema.Types.ObjectId,
                ref:'Product'
            },
            status : String,
            quantity: String
        }]
    }]
})

module.exports = mongoose.model("Store", StoreSchema);;