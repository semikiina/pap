import { Container, Divider, Typography, Stack, Button, CircularProgress, IconButton, Menu, MenuItem, Box, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, History} from '@mui/icons-material';
import api from '../../../Services/api';
import ProductDataGrid from './Products Data Grid/ProductDataGrid';
import DeletedProducts from './Products Data Grid/DeletedProducts';
import useAuth from '../../Contexts/useAuth';

const StoreProducts = ({userRole}) => {

    const [products, setProducts] = useState([])
    const [removedProducts, setRemovedProducts] = useState([])
    const [update, setUpdate] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    const  handleRestore = (id) => {
        
        api.post('product/restore/'+id)
        .then(data=>{
            setUpdate(update +1)
            handleClose()
        })
        .catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        api.get('store/products')
        .then(data=>{
            setProducts(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
        api.get('store/rproducts')
        .then(data=>{
            setRemovedProducts(data.data)
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
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="secondary" onClick={()=>{ window.location.href="./addProduct"}}>Add Product<Add fontSize='small'></Add></Button>
                        <IconButton variant="contained" color="primary" onClick={handleClickOpen} >
                            <Tooltip title="Removed products">
                                <History/>
                            </Tooltip>
                        </IconButton>
                    </Stack>
                </Stack>
                <Divider></Divider>
                {
                    products.length 
                    ? <ProductDataGrid products={products} update={update} setUpdate={setUpdate} userRole={userRole}/> 
                    : <Typography padding={2} textAlign={'center'} variant="h6">Start by adding a product.</Typography>
                }
            </Container>
            <DeletedProducts open={open} handleClose={handleClose} removedProducts={removedProducts} handleRestore={handleRestore} />
        </>
    )
}

export default StoreProducts

