import React from 'react';
import CartItem from './CartItems/CartItem';
import {Container, Typography, Stack, Button,Box, Divider, List, Grid } from '@mui/material';
import FavoriteProducts from './Favorite Products/FavoriteProducts';
import CheckoutLabel from './CartItems/CheckoutLabel';
import {  ShoppingBasketOutlined } from '@mui/icons-material';

const Cart = ({Cart, onRemoveFromCart, onAddToCart, onRemoveQuantity}) => {
    
    
    const EmptyCart = ()=>{
        return(
            <Stack spacing={1} alignItems={'center'} marginTop={3}>
                <ShoppingBasketOutlined/>
                <Typography variant="h6">Your cart is empty!</Typography>
                <Typography variant="caption">Start by adding a product.</Typography>
                <Button variant="contained" color="primary" href="/category">Search Products</Button>  
            </Stack>
        ) 
    }

    const FilledCart = ()=>(
        <List>
            {Cart.items.map((item) => (
                
                <CartItem CartItem={item} key={item.product_id._id} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} onRemoveQuantity={onRemoveQuantity}></CartItem>
            ))}
        </List>
    )

    if(!Cart) return null;
    return (
        <Container>
            <Typography variant='h5' padding={2}>Your Shopping Cart</Typography>
            <Divider/>
            {
                Cart?.items?.length 

                ?   <Grid container spacing={4} marginTop={1}>
                        <Grid item xs={12} md={7}>
                            <FilledCart />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <CheckoutLabel Cart={Cart} />
                        </Grid>
                    </Grid>
                :   <EmptyCart></EmptyCart>
            }
           <Box>
                <FavoriteProducts onAddToCart={onAddToCart}/>
           </Box>
        </Container>
    )
}

export default Cart
