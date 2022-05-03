import React, { useEffect,useState } from 'react'
import {Grid, Container} from '@mui/material';
import Product from './Product/Product';
import api from '../../Services/api';



const Products = ({onAddToCart, newFav}) => {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        api.get('product')
        .then(products =>{
            setProducts(products.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
       <Container>
            <Grid item container spacing={2} >
                {products.map((product)=>{
                    return(
                        <Grid item key={product._id} xs={12} md={4} lg={3}>
                            <Product key={product._id} product={product}  onAddToCart={onAddToCart} newFav={newFav}></Product>
                        </Grid>
                    )})
                
                }
                
            </Grid>
        </Container>
    )
}

export default Products
