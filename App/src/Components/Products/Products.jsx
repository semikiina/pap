import React from 'react'
import {Grid, CssBaseline, Container} from '@mui/material';
import Product from './Product/Product';



const Products = ({onAddToCart, product}) => {

    return (
       <Container>
            <Grid item container spacing={2} >
                {product.map((product)=>(
                <Grid item key={product._id} xs={'auto'} md={'auto'} lg={'auto'}>
                    <Product key={product._id} product={product}  onAddToCart={onAddToCart}></Product>
                </Grid>
                ))}
                
            </Grid>
        </Container>
    )
}

export default Products
