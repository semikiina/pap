import { Divider, Typography, Button,Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Review from './Review'
import api from '../../../Services/api';

const PaymentForm = ({shippingData, cart, backStep}) => {

    const [open, setOpen] = useState(false);
    const paypal = useRef()
    var cartItems=[];
    var totalitems=0;
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=>{
        cart.items.forEach((item)=>{
            cartItems.push(
                {
                    name:item.product_id.title,
                    unit_amount: {value: item.product_id.price, currency_code: 'EUR'},
                    quantity: item.quantity
                }
            )
            totalitems += item.product_id.price * item.quantity
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
                                value: cart.subtotal,
                                breakdown: {
                                    item_total: {value: totalitems, currency_code: 'EUR'}
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
                console.log(err)
            },
            onCancel : () =>{
                window.location.href="../cart"
            }
        }).render(paypal.current)
    },[])

    return (
        <>
        <Review cart={cart} data={shippingData} backStep={backStep} />
        <Divider></Divider>
        <Typography variant="h4" marginTop={3} marginBottom={3}> Payment method</Typography>
            <div ref={paypal}></div>
        
        </>
    )
}

export default PaymentForm
