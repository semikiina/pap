const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    store_email: String,
    store_name: String,
    creator_id : {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    date_created: Date,
    store_nickname: String,
    store_description: String,
    product:[{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }]
})

module.exports = mongoose.model("Store", StoreSchema);;