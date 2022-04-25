import { Divider, Typography, Button,Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Review from './Review'

const PaymentForm = ({shippingData, cart}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
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
                                value: cart.subtotal
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
                            }

                            
                        },
                        
                    ],
                    application_context:{
                        shipping_preference: 'SET_PROVIDED_ADDRESS'
                    }
                })
            },
            onApprove: async (data, actions) =>{
                const order = await actions.order.capture()
                console.log(order)
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
