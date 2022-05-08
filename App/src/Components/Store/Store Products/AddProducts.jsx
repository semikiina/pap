import { Container, Grid, Box, Paper, Button, Typography, Divider, FormControlLabel, Switch } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import ColAddProduct from './AddProduct/ColAddProduct';
import { useForm } from "react-hook-form";

const AddProducts = ({storeid}) => {
    
    const {  handleSubmit, register } = useForm();
    const [categorys, setCategorys] = useState([])
    const [images, setImages] = useState([]);
    const [htmlEditor, setHtmlEditor] = useState();
    const [isDisabledShipping, setIsDisabledShipping] = useState(false);
   

    const Shipping = (e)=>{
        if(!e.target.checked) setIsDisabledShipping(true)
        else setIsDisabledShipping(false)
    }

    const onSubmit = data => {
        var formData = new FormData();
        var ins = images.length;
        for (var x = 0; x < ins; x++) {
            formData.append("image", images[x]);
        }
        formData.append("title", data.title)
        formData.append("stock", data.stock)
        formData.append("active", data.active)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("description", htmlEditor)
        formData.append("store_id", storeid)
        if(!isDisabledShipping)formData.append("shipping", data.shipping)
        else formData.append("shipping", 0)

        api.post('product',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            window.location.href="./storeProducts"
        })
        .catch(err=>{
            console.log(err) 
        })
    };

    useEffect(()=>{
        api.get('product/categorys')
        .then(cats=>{
            setCategorys(cats.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
   
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} >
                        <ColAddProduct register={register} setImages={setImages} setHtmlEditor={setHtmlEditor} isDisabledShipping={isDisabledShipping} Shipping={Shipping} categorys={categorys}></ColAddProduct>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Box marginBottom={4}>
                            <Paper >
                                <Box padding={2}>
                                    <Button padding={2} variant="contained" fullWidth type="submit">Save Changes</Button>
                                </Box>
                                <Box padding={2}>
                                    <FormControlLabel control={<Switch defaultChecked {...register('active')}/>} label="Active Product" />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                </form>
            </Container>
        </>
    )
}

export default AddProducts
