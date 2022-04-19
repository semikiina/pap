const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    store_id: Schema.Types.ObjectId,
    price: Number,
    date_created: Date,
    orders:Number,
    active: Boolean,
    images:[{
        type:String,
    }],
    favorite:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }]

});

module.exports = mongoose.model("Product",ProductSchema);