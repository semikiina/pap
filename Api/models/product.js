const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    store_id:{
        type : Schema.Types.ObjectId,
        ref: 'Store'
    } ,
    price: Number,
    date_created: Date,
    orders:Number,
    category:String,
    active: Boolean,
    shipping: Number,
    stock: Number,
    views: Number,
    images:[{
        type:String,
    }],
    favorite:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]

});

module.exports = mongoose.model("Product",ProductSchema);