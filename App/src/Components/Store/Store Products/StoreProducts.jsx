import { Container, Divider, Typography, Stack, Button, CircularProgress, IconButton, Menu, MenuItem, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, MoreVert} from '@mui/icons-material';
import api from '../../../Services/api';
import ProductDataGrid from './Products Data Grid/ProductDataGrid';

const StoreProducts = ({storeid}) => {

    const [products, setProducts] = useState([])
    
    const [update, setUpdate] = useState(0);

    useEffect(()=>{
        api.get('store/products')
        .then(data=>{
            console.log(data)
            setProducts(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[update])



    if(!products) return <CircularProgress></CircularProgress>
    return (
        <>
        <Container>
                <Stack direction="row" justifyContent="space-between" padding={2}>
                    <Typography variant="h5">Products</Typography>
                    <Button variant="outlined" color="secondary" onClick={()=>{ window.location.href="./addProduct"}}>Add Product<Add fontSize='small'></Add></Button>
                </Stack>
                <Divider></Divider>
                {
                    products.length 
                    ? <ProductDataGrid products={products} update={update} setUpdate={setUpdate} /> 
                    : <Typography padding={2} textAlign={'center'} variant="h6">Start by adding a product.</Typography>
                }
        </Container>
        
        </>
    )
}

export default StoreProducts

