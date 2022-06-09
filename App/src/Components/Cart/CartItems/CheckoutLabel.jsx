import React from 'react'
import { Box, Stack, Typography, Card, Button } from '@mui/material'
import api from '../../../Services/api'

const CheckoutLabel = ({Cart, handleClick}) => {

    const Tot = (Cart.subtotal + Cart?.shipping).toFixed(2)

   

    if(!Cart) return null
    return (
        <Card>
            <Box padding={3}>
                <Stack direction={"row"}  justifyContent="space-between" marginBottom={1}>
                    <Typography variant="subtitle1" >Subtotal:</Typography>
                    <Typography variant="subtitle1">{Cart?.subtotal.toFixed(2)} €</Typography>
                </Stack>
                <Stack direction={"row"}  justifyContent="space-between"  marginBottom={1} >
                    <Typography variant="subtitle2" >Shipping:</Typography>
                    <Typography variant="subtitle2" color="warning">{Cart?.shipping} €</Typography>
                </Stack>
                <Stack direction={"row"}  justifyContent="space-between" marginBottom={1}   >
                    <Typography variant="h6" >Total:</Typography>
                    <Typography variant="h6">{Tot} €</Typography>
                </Stack>
                <Box >
                    <Button variant="contained" color="success" onClick={handleClick} fullWidth>Checkout</Button>
                </Box>
            </Box>
        </Card>
    )
}

export default CheckoutLabel
