const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user_id:{
        type : Schema.Types.ObjectId,
        ref: 'User'
    } ,
    store_id : {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    product_id : {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    date_created: {
        type: Date,
        default : Date.now(),
    },
    message: String,
    read : Boolean,
    ref_type: Number,
});

module.exports = mongoose.model("Notification",NotificationSchema);


// types of notifications:

// 1 - Orders
// 2 - Product Favorites
// 3 - Store Colaborators
// 4 - Product Quantity 
// 5 - Following
