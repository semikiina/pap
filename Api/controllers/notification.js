const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');
const User = require('../models/user');
const Product = require('../models/product');
const Store = require('../models/store');

exports.newOrderNotification = async (userID, storeID) => {

    console.log('new order notification')

    const senderUser =  await User.findById(userID)
    const store =  await Store.findById(storeID)

    const not = new Notification({
        user_id: senderUser._id,
        store_id : store._id,
        message: `@${senderUser.nickname} just ordered from your store!`,
        read: false,
        reference : {
            type_ref : 1,
            id_ref : data.orderid
        }
    })
    
    not.save();

    return {
        storeID : store.store_id,
        newNot : {
            _id :not._id,
            user_id : not.user_id,
            store_id:{
                _id : product.store_id._id,
                store_name : product.store_id.store_name,
            },
            message: not.message,
            read: not.read,
            ref_type: not.ref_type
        }
    };
}

exports.newFavoriteNotification = async (userID,productID) => {

    console.log('new favorite notification')
  
    const notification = await Notification.find({user_id: userID , product_id : productID}).count()

    if(notification == 0){
        const senderUser =  await User.findById(userID)
        const product =  await Product.findById(productID).populate('store_id', 'store_name')
    
    
        const not = new Notification({
            user_id: userID,
            store_id : product.store_id._id,
            product_id : product._id,
            message: `@${senderUser.nickname} just liked your product.`,
            read: false,
            date_created: Date.now(),
            ref_type: 2
        })
        
        not.save();
    
        return {
            storeID : product.store_id,
            newNot : {
                _id :not._id,
                user_id : not.user_id,
                store_id:{
                    _id : product.store_id._id,
                    store_name : product.store_id.store_name,
                },
                product_id:{
                    _id : product._id,
                    images : product.images
                },
                message: not.message,
                read: not.read,
                ref_type: not.ref_type
            }
        };
    }
    else {
        return null;
    }
}

exports.getNotifications = async (req, res, next)  => {

    console.log('store Notifications')
 
    try{
        const notRead = await Notification.find({store_id: req.storeId}).count({read: false})
        const nots = await Notification.find({store_id: req.storeId}).sort({date_created: "desc"})
        .populate({
            path:'store_id',
            select: 'store_name'
        })
        .populate({
            path:'product_id',
            select: 'images'
        })
        .limit(10)
    
        res.status(200).json({
            notRead : notRead,
            nots : nots
        })
    }
    catch (err) {
        console.log(err)
    }
    
}

exports.clearNotifications = async (req, res, next)  => {

    console.log('Clear Notifications')
 
    try{
        await Notification.updateMany({store_id: req.storeId}, {read:true})
    
        res.status(200).send('Notificatons cleared!')
    }
    catch (err) {
        console.log(err)
    }
    
}