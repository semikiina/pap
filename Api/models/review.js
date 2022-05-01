const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user_id:{
        type : Schema.Types.ObjectId,
        ref: 'User'
    } ,
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    description: String,
    review: Number,
    date_created: Date,
    favorites:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    images:[{
        type: String,
    }]
});

module.exports = mongoose.model("Review",ReviewSchema);