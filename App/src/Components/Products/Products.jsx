import React from 'react'
import {Grid, Container} from '@mui/material';
import Product from './Product/Product';



const Products = ({onAddToCart, product, newFav}) => {

    let fav;
    return (
       <Container>
            <Grid item container spacing={2} >
                {product.map((product)=>{
                    fav=false;
                    if(product.favorite.includes('620ac00c85d485580493d87f')) fav =true
                    return(
                        <Grid item key={product._id} xs={'auto'} md={'auto'} lg={'auto'}>
                            <Product key={product._id} product={product}  onAddToCart={onAddToCart} fav={fav} newFav={newFav}></Product>
                        </Grid>
                    )})
                
                }
                
            </Grid>
        </Container>
    )
}

export default Products
