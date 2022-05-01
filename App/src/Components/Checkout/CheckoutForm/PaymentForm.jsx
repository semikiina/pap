import { Divider, Typography, Button,Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Review from './Review'
import api from '../../../Services/api';

const PaymentForm = ({shippingData, cart,userId}) => {
    const [open, setOpen] = React.useState(false);
    var cartItems=[];
    var totalitems=0;
    const handleClickOpen = () => {
      setOpen(true);
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
        console.log(cartItems)
    },[])

    const handleClose = () => {
      setOpen(false);
    };
    const paypal = useRef()

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
                const order = await actions.order.capture()
                const postOrder = await api.post('order',{
                    user_id:userId,
                    email:shippingData.email,
                    first_name: shippingData.first_name,
                    last_name: shippingData.last_name,
                    country: shippingData.country,
                    zip_code: shippingData.zip_code,
                    city: shippingData.city,
                    address_1: shippingData.address_1,
                    paypal_id: order.id,
                })
                console.log(postOrder)
                setOpen(true)
            },
            onError: (err) =>{
                console.log(err)
            },
            onCancel : () =>{
                //redirect user
            }
        }).render(paypal.current)
    },[])

    return (
        <>
        <Review cart={cart} data={shippingData}/>
        <Divider></Divider>
        <Typography variant="h4" marginTop={3} marginBottom={3}> Payment method</Typography>
        <div ref={paypal}></div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Order placed Successfully!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Thanks For Purchasing with TagMe!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{ window.location.href ="../"}}>Return</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default PaymentForm
