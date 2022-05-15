import React from 'react';
import CartItem from './CartItems/CartItem';
import {Container, Typography, Stack, CircularProgress, Button, Card,Box, Divider, List, Grid } from '@mui/material';

const Cart = ({Cart, onRemoveFromCart, onAddToCart, onRemoveQuantity}) => {
    
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
                        <List>
                            {Cart.items.map((item) => (
                                
                                <CartItem CartItem={item} key={item.product_id._id} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} onRemoveQuantity={onRemoveQuantity}></CartItem>
                            ))}
                        </List>
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
            <Typography variant='h4' marginBottom={3}>Your Shopping Cart</Typography>
            <Divider/>
            <Grid container spacing={4} marginTop={1}>
                <Grid item xs={12} md={7}>
                        {
                            Cart.length === 0 ?  <CircularProgress/> : 
                            (   
                                <CartTemplate></CartTemplate>
                            )
                            
                        }
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card>
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
                </Grid>
            </Grid>
           
            
            
            
        </Container>
    )
}

export default Cart
