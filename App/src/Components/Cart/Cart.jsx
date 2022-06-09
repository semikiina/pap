import React, { useState } from 'react';
import CartItem from './CartItems/CartItem';
import {Container, Typography, Stack, Button,Box, Divider, List, Grid, Collapse, Alert, IconButton } from '@mui/material';
import FavoriteProducts from './Favorite Products/FavoriteProducts';
import CheckoutLabel from './CartItems/CheckoutLabel';
import {  Close, ShoppingBasketOutlined } from '@mui/icons-material';
import api from '../../Services/api';

const Cart = ({Cart, onRemoveFromCart, onAddToCart, onRemoveQuantity}) => {
    
    const [ errors, setErrors] = useState(false);

    const EmptyCart = ()=>{
        return(
            <Stack spacing={1} alignItems={'center'} marginTop={3}>
                <ShoppingBasketOutlined/>
                <Typography variant="h6">Your cart is empty!</Typography>
                <Typography variant="caption">Start by adding a product.</Typography>
                <Button variant="contained" color="primary" href="/feed/products">Search Products</Button>  
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

    const handleClick = () =>{
        api.get('order/stock')
        .then(data=>{
            window.location.href="../checkout"
        })
        .catch(err=>{
            setErrors(true)
        })
       
    }

    if(!Cart) return null;
    return (
        <Container>
            <Collapse in={errors}>
                <Alert 
                    severity="error" 
                    action={<IconButton size="small" onClick={() => setErrors(false)}><Close/></IconButton>}
                >
                    One or more product(s) aren't available now.
                </Alert>
            </Collapse>
            <Typography variant='h5' padding={2}>Your Shopping Cart</Typography>
            <Divider/>
            {
                Cart?.items?.length 

                ?   <Grid container spacing={4} marginTop={1}>
                        <Grid item xs={12} md={7}>
                            <FilledCart />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <CheckoutLabel Cart={Cart} handleClick={handleClick} />
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
