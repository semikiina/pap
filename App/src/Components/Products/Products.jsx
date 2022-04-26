import React from 'react'
import {Grid, Container} from '@mui/material';
import Product from './Product/Product';



const Products = ({onAddToCart, product, newFav, userId}) => {

    return (
       <Container>
            <Grid item container spacing={2} >
                {product.map((product)=>{
                    return(
                        <Grid item key={product._id} xs={'auto'} md={'auto'} lg={'auto'}>
                            <Product key={product._id} product={product}  onAddToCart={onAddToCart} userId={userId} newFav={newFav}></Product>
                        </Grid>
                    )})
                
                }
                
            </Grid>
        </Container>
    )
}

export default Products
