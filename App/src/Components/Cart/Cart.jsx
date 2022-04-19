import React from 'react';
import CartItem from './CartItems/CartItem';
import {Container, Typography, Toolbar, Stack, CircularProgress, Button, Card,Box } from '@mui/material';

const Cart = ({Cart, onRemoveFromCart}) => {
    
    let  isEmpty = null;

    Cart?.length === 0 ? isEmpty =null : isEmpty = !Cart.items.length

    
    const EmptyCart = ()=>{
        return(
            <div>
                <Typography variant="h6">No Products yet!</Typography>
                <Button variant="contained" color="primary" href="/category">Search Products</Button>  
            </div>
        ) 
    }

    const FilledCart = ()=>{
            return (
                <>
                {
                    Cart?.length === 0 ?  <CircularProgress/> : 
                    (
                        <Stack>
                            {Cart.items.map((item) => (
                                
                                <CartItem CartItem={item} key={item.product_id._id} onRemoveFromCart={onRemoveFromCart}></CartItem>
                            ))}
                        </Stack>
                    )
                }
                </>
            )
    }

    const CartTemplate = ()=>{
       if(isEmpty ) return <EmptyCart></EmptyCart>
       else return <FilledCart></FilledCart>
    }

    return (
        <Container>
            <Typography variant='h3' marginBottom={1}>Your Shopping Cart</Typography>
            <Typography variant="h6" marginBottom={5} color="secondary">Missing something?<a href="/category">Click here.</a></Typography>
            {
                Cart.length === 0 ?  <CircularProgress/> : 
                (   
                    <CartTemplate></CartTemplate>
                )
                
            }
            <Card >
                <Stack>
                    <Stack direction={"row"}  justifyContent="space-between" alignItems={'end'}  paddingX={3} paddingY={3}>
                        <Typography variant="h5" >Subtotal:</Typography>
                        <Typography variant="h6">{Cart.subtotal} €</Typography>
                    </Stack>
                    <Stack direction={"row"}  justifyContent="space-between" alignItems={'end'}  paddingX={3} paddingBottom={3}>
                        <Typography variant="h5" >Shipping:</Typography>
                        <Typography variant="h6" color="warning">FREE</Typography>
                    </Stack>
                    <Stack direction={"row"}  justifyContent="space-between" alignItems={'end'}  paddingX={3} >
                        <Typography variant="h5" >Total:</Typography>
                        <Typography variant="h6">{Cart.subtotal} €</Typography>
                    </Stack>
                    <Box padding={3}>
                        <Button variant="contained" color="success" href="/checkout" fullWidth>Checkout</Button>
                    </Box>
                    
                </Stack>
                
            </Card>
            
            
        </Container>
    )
}

export default Cart
