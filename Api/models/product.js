const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    store_id:{
        type : Schema.Types.ObjectId,
        ref: 'Store'
    } ,
    basePrice: Number,
    date_created: Date,
    orders:Number,
    category:String,
    active: Boolean,
    shipping: Number,
    stock: Number,
    views: Number,
    exists: Boolean,
    removedDate : Date,
    images:[{
        type:String,
    }],
    favorite:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    variants:{
        options:[{
            name: String,
            values:[],
        }],
        prices:[{
            originalPrice: Number,
            availableQuantity : Number,
            skuid : String
        }]
    }
    
});

module.exports = mongoose.model("Product",ProductSchema);