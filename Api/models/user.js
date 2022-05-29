const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    nickname: String,
    password: String,
    bio: String,
    phone_code : String,
    phone : String,
    date_created: Date,
    profile_pic : String,
    active:Boolean,
    tempToken: String,
    store:[{
        type: Schema.Types.ObjectId,
        ref: 'Store'
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
                skuid: String,
                quantity: Number,
                price : Number,
                shipping: Number,
            }
        ],
        subtotal: Number,
        shipping: Number,
    },
    addresses:[{
        first_name: String,
        last_name: String,
        email: String,
        phone_code: String,
        phone: String,
        address_1: String,
        address_2: String,
        zip_code: String,
        province: String,
        city: String,
        country: String
    }]
});

userSchema.methods.AddToCart = function(product,quantity,skuid){

    //return the index of the cart
    const CartItemIndex = this.cart.items.findIndex( item =>{
        return item.product_id.toString() == product._id.toString()
    })

    //return the product of the cart
    const CartItem = this.cart.items[CartItemIndex]
    console.log(quantity)

    //return combination infos
    const Vprices = product.variants.prices.filter( item =>{
        return item.skuid == skuid
    })


    let newQuantity = quantity || 1;
    
    const updatedCart =[...this.cart.items];

    if(CartItemIndex >=0 && CartItem.skuid == skuid ){
        newQuantity= this.cart.items[CartItemIndex].quantity + newQuantity;
        updatedCart[CartItemIndex].quantity = newQuantity;
    }

    else{
        updatedCart.push({
            product_id : product._id,
            quantity: newQuantity,
            price : Vprices[0].originalPrice,
            shipping: product.shipping,
            skuid: skuid
        });
    }

    let subtotal = 0;
    let shipping = 0;

    updatedCart.forEach(i =>{
        subtotal += parseFloat(i.quantity* i.price) ;
        shipping += parseFloat(i.shipping);
    })

    const nupdatedCart ={
        
        items : updatedCart,
        subtotal : subtotal.toFixed(2),
        shipping : shipping.toFixed(2)
    }
    this.cart = nupdatedCart;

    return this.save();
}

userSchema.methods.RemoveFromCart = function(product, skuid){
    
    var updatedCartItems = this.cart.items.filter( item =>{
        return item.product_id != product._id && item.skuid != skuid
    })
  
    let subtotal = 0;
    let shipping = 0;

    updatedCartItems.forEach(i =>{
        console.log(i)
        subtotal += parseFloat(i.quantity* i.price) ;
        shipping += parseFloat(i.shipping);
    })

    const nupdatedCart ={
        items : updatedCartItems,
        subtotal : subtotal.toFixed(2),
        shipping : shipping.toFixed(2)
    }

    this.cart = nupdatedCart;

    return this.save();
}



module.exports = mongoose.model("User",userSchema);