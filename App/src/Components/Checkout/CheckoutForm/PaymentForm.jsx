import { Grid, Typography, Box, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Review from './Review'
import api from '../../../Services/api';
import { Email, Home, LocalPhone, Person } from '@mui/icons-material';
import DialogCheckout from './Components/DialogCheckout';

const PaymentForm = ({shippingData, cart, backStep}) => {

    const [open, setOpen] = useState(false);
    const paypal = useRef()
    var cartItems=[];
    var totalitems=0;

    const handleClose = () => {
        setOpen(false);
      };


    var add2 = "";
    if(shippingData.address_2) add2 =  shippingData.address_2 + ", "

    useEffect(()=>{
        cart.items.forEach((item)=>{
            var thisComb = item.product_id.variants.prices.filter((comb)=>{ return comb.skuid == item.skuid})
            cartItems.push(
                {
                    name:item.product_id.title,
                    unit_amount: {value: thisComb[0].originalPrice, currency_code: 'EUR'},
                    description: item.skuid.replaceAll("?", ", "),
                    quantity: item.quantity
                }
            )
            totalitems += thisComb[0].originalPrice * item.quantity
        })
    },[])

    useEffect(() =>{
        window.paypal.Buttons({
            createOrder: (data, actions, err) =>{
                return actions.order.create({
                    intent: 'Capture',
                    purchase_units: [
                        {
                            description: 'TagMe! purchase',
                            amount:{
                                currency_code: 'EUR',
                                value: cart.subtotal + cart.shipping,
                                breakdown: {
                                    item_total: {value: totalitems, currency_code: 'EUR'},
                                    shipping: {value: cart.shipping, currency_code: 'EUR'},

                                }
                            },
                            shipping:{
                                name:{
                                    full_name:shippingData.first_name +" "+ shippingData.last_name
                                },
                                type:"SHIPPING",
                                address:{
                                    address_line_1:shippingData.address_1,
                                    admin_area_2:shippingData.province,
                                    admin_area_1:shippingData.state,
                                    postal_code:shippingData.zip_code,
                                    country_code:'PT'
                                }
                            },
                            items:cartItems,


                        },
                        
                    ],
                    application_context:{
                        shipping_preference: 'SET_PROVIDED_ADDRESS'
                    }
                })
            },
            onApprove: async (data, actions) =>{
                try {
                    const order = await actions.order.capture()
                    const postOrder = await api.post('order',{
                        email:shippingData.email,
                        first_name: shippingData.first_name,
                        last_name: shippingData.last_name,
                        phone_code: shippingData.phone_code,
                        phone: shippingData.phone,
                        country: shippingData.country,
                        zip_code: shippingData.zip_code,
                        city: shippingData.city,
                        address_1: shippingData.address_1,
                        address_2: shippingData.address_2,
                        paypal_id: order.id,
                    })
                    setOpen(true)
                }
                catch(err){
                    console.log(err)
                }
            },
            onError: (err) =>{
                console.log("An error happened!")
            },
            onCancel : () =>{
                window.location.href="../cart"
            }
        }).render(paypal.current)
    },[])

    return (
        <>
        <Grid container marginTop={4}>
            <Grid item sm={12} md={8}>
                <Review cart={cart} data={shippingData} backStep={backStep} />
            </Grid>
            <Grid item sm={12} md={4}>
                <Box>
                    <Typography variant="h5" marginBottom={1} >Shipping Informations</Typography>
                    <ListItem dense> <ListItemIcon><Person fontSize="small"/></ListItemIcon><ListItemText>{shippingData.first_name + " " + shippingData.last_name}</ListItemText></ListItem>
                    <ListItem dense> <ListItemIcon><Email fontSize="small"/></ListItemIcon><ListItemText>{shippingData.email}</ListItemText></ListItem>
                    <ListItem dense> <ListItemIcon><LocalPhone fontSize="small"/></ListItemIcon><ListItemText>{shippingData.phone_code + " " + shippingData.phone + ", " + shippingData.country}</ListItemText></ListItem>
                    <ListItem dense> <ListItemIcon><Home fontSize="small"/></ListItemIcon><ListItemText>{shippingData.address_1 + ", " + add2 + shippingData.zip_code + ", " + shippingData.province + ", " + shippingData.city }</ListItemText></ListItem>
                </Box>
                <div ref={paypal}></div>
            </Grid>
        </Grid>
        <DialogCheckout open={open}/>
      
        
        
        </>
    )
}

export default PaymentForm
