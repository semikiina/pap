const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    nickname: String,
    password: String,
    phonenumber: Number,
    bio: String,
    phone_code : String,
    phone : String,
    date_created: Date,
    profile_pic : String,
    store:[{
        type: Schema.Types.ObjectId,
        ref: 'store'
    }],
    favorite:[{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }],
    cart:{
        items:[
            {
                product_id:{
                    type:Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity: Number,
                price : Number
            }
        ],
        subtotal: Number,
    }
});

userSchema.methods.AddToCart = function(product){
    const CartItemIndex = this.cart.items.findIndex( item =>{
        return item.product_id.toString() == product._id.toString()
    })
    let newQuantity = 1;
    const updatedCart =[...this.cart.items];

    if(CartItemIndex >=0){
        newQuantity= this.cart.items[CartItemIndex].quantity +1;
        updatedCart[CartItemIndex].quantity = newQuantity;
    }
    else{
        updatedCart.push({
            product_id : product._id,
            quantity: newQuantity,
            price : product.price
        });
    }
    let subtotal = 0;

    updatedCart.forEach(i =>{
        subtotal += parseInt(i.quantity* i.price) ;
    })
    const nupdatedCart ={
        items : updatedCart,
        subtotal : subtotal
    }
    this.cart = nupdatedCart;

    return this.save();
}


userSchema.methods.RemoveFromCart = function(product){
    const updatedCartItems = this.cart.items.filter( item =>{
        return item.product_id.toString() !== product._id.toString()
    })
    let subtotal = 0;
    updatedCartItems.forEach(i =>{
        subtotal += parseInt(i.quantity* i.price) ;
    })
    const nupdatedCart ={
        items : updatedCartItems,
        subtotal : subtotal
    }
    this.cart = nupdatedCart;
    return this.save();
}

module.exports = mongoose.model("User",userSchema);