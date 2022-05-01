import React from 'react'
import {Grid, Container} from '@mui/material';
import Product from './Product/Product';



const Products = ({onAddToCart, product, newFav, userId}) => {

    return (
       <Container>
            <Grid item container spacing={2} >
                {product.map((product)=>{
                    return(
                        <Grid item key={product._id} xs={12} md={4} lg={3}>
                            <Product key={product._id} product={product}  onAddToCart={onAddToCart} userId={userId} newFav={newFav}></Product>
                        </Grid>
                    )})
                
                }
                
            </Grid>
        </Container>
    )
}

export default Products
