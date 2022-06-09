const Store = require('../models/store');
const Product = require('../models/product');
const Notification = require('../models/notification');
const Order = require('../models/order');
const User = require('../models/user');
var easyinvoice = require('easyinvoice');
const transporter = require('../mailer');


function OrderInvoice (CheckoutReq, cartItems) {
    return data = {

        "customize": {
            //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
        },
        "images": {
            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
        },
        // Your own data
        "sender": {
            "company": "TagMe!",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Portugal"
        },
        // Your recipient
        "client": {
            "company": CheckoutReq.first_name +" "+ CheckoutReq.last_name,
            "address": CheckoutReq.address_1,
            "zip": CheckoutReq.zip_code,
            "city": CheckoutReq.city,
            "country": CheckoutReq.country
        },
        "information": {
            // Invoice number
            "number": CheckoutReq.paypal_id,
            // Invoice data
            "date": new Date(Date.now()).toLocaleDateString(),
        },
        "products": cartItems,
        "bottom-notice": "Thanks for purchasing with TagMe!.",
        "settings": {
            "currency": "EUR", 
        },
    };
}



exports.GetOrder = (req, res, next) => {
    Order.find({email: req.params.email}).orFail()
    .populate('cart.items.product_id',['price','title','images'])
    //Product.find()
        .then(order => {
            res.status(200).json(order)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the order.",
                    errors: error.array()
                })
        })
}

async function  removeStock(prd, skuid, quantity){
    
    const product = await Product.findById(prd)

    var thisProduct = product.variants.prices.find((item)=> item.skuid == skuid)

    thisProduct.availableQuantity = thisProduct.availableQuantity - quantity ;

    if(thisProduct.availableQuantity <=5){
        
        const not = new Notification({
            store_id : product.store_id,
            product_id : product._id,
            message: `Your product "${product.title}" (${skuid.replaceAll("?", " ,")}) only have ${thisProduct.availableQuantity} units in stock left.`,
            read: false,
            date_created: Date.now(),
            ref_type: 4
        })

        await not.save();
    }

    await product.save();
}


exports.Checkout = async (req, res, next) => {
    
    console.log('POST /order')

    let CheckoutReq = { ...req.body };

   try{ 
       const user =  await User.findById(req.userId)
        .populate({
            path:'cart.items.product_id',
            select: 'price title variants',
            populate : {
                path: 'store_id',
                select:'_id'
            }
        })
    
        var cartItems = [];
        user.cart.items.map((item)=>{
            var thisComb = item.product_id.variants.prices.filter((comb)=>{ 
                
                return comb.skuid == item.skuid
            })

            removeStock(item.product_id._id, thisComb[0].skuid, item.quantity);

            
            cartItems.push({
                "quantity": item.quantity,
                "description": item.product_id.title + " - " + item.skuid.replaceAll('?', " ,"),
                "price": thisComb[0].originalPrice,
                "tax-rate": 0,
            })
        })
            
        const uniques = Array.from(new Set(user.cart.items.map(item => item.product_id.store_id)))
        
        const order = new Order({
            status: "Payed",
            paypal_id: CheckoutReq.paypal_id,
            user_id: req.userId,
            email : CheckoutReq.email,
            first_name: CheckoutReq.first_name,
            last_name: CheckoutReq.last_name,
            phone_code : CheckoutReq.phone_code,
            phone: CheckoutReq.phone,
            address_1: CheckoutReq.address_1,
            address_2: CheckoutReq.address_2,
            zip_code: CheckoutReq.zip_code,
            province: CheckoutReq.province,
            city: CheckoutReq.city,
            country: CheckoutReq.country,
            cart: user.cart,
            date_created : Date.now(),
        })

        const orderSave = await order.save()

        await Promise.all(uniques.map(async (e,i) => {

            var orderItems=[];

            const store =  await Store.findById(e)

            user.cart.items.map((item)=>{
                if(item.product_id.store_id._id.toString() == store._id)
                {
                    
                    orderItems.push({
                        product_id: item.product_id._id,
                        quantity: item.quantity,
                        skuid : item.skuid
                    })
                }
            })

            store.orders.push({
                orderid: orderSave._id,
                items: orderItems,
                status:'Payed'
            })

            const orderNot = new Notification({
                store_id : store._id,
                message: `Your store has a new order.`,
                read: false,
                date_created: Date.now(),
                ref_type: 1
            })
    
            await orderNot.save();

            await store.save()

        }))
    
        user.cart=[];

        await user.save();

        const data = OrderInvoice(CheckoutReq,cartItems)
            
        const newInvoice= await easyinvoice.createInvoice(data);

        await transporter.sendMail({
                from: 'tagmetheapp@gmail.com',
                to: CheckoutReq.email, 
                subject: "Your Order was placed successfully ✔", 
                text: "Than", 
                html: "<p>Hello "+CheckoutReq.first_name+",</p><p>Thanks for your purchase.</p>", // html body
                attachments: [
                    {
                    filename: `invoice.pdf`,
                    content: newInvoice.pdf,
                    encoding: 'base64',
                    },
                ],
            });

       

        res.status(201).json({
            message: "Order Placed Successfully!"
        })
    }
    catch( error){
        return res
            .status(422)
            .json({
                message: "Validation failed. Please insert correct data.",
                errors: error
            })
    }

}


exports.VerifyStock = (req, res, next) => {
    
    console.log('POST /order/stock')
    User.findById(req.userId).orFail()
        .populate('cart.items.product_id',["variants","active", "title"])
        .then(user =>{

            user.cart.items.forEach((e) =>{

                const verProd = e.product_id.variants.prices.find((comb)=> comb.skuid == e.skuid)

                if(!e.product_id.active) throw new Error("This product isn't available!")

                if(e.quantity > verProd.availableQuantity) throw new Error(`"${e.product_id.title}" doesn't have enough stock!`)
            })

            res.status(200).send('Stock available.')

        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    errors: error
                })
        })

}