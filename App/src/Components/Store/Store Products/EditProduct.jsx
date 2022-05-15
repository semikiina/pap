import { Grid, Box, Paper, Button ,FormControlLabel, Switch, Container  } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ColEditProduct from './Edit Product/ColEditProduct';

const EditProduct = ({storeid}) => {

    const  {id} = useParams();
    const { handleSubmit, register } = useForm();
    const [categorys, setCategorys] = useState([])
    const [images, setImages] = useState([]);
    const [update, setUpdate] = useState(0);
    const [htmlEditor, setHtmlEditor] = useState();
    const [isDisabledShipping, setIsDisabledShipping] = useState(false);
    const [product, setProduct] = useState({
        _id: 0,
        title: '',
        description: '',
        category: '',
        stock: 0,
        price: 0,
        images: [],
        shipping: 0,
      })

    const Shipping = (e)=>{
        if(!e.target.checked) setIsDisabledShipping(false)
        else setIsDisabledShipping(true)
    }

    const onSubmit = data => {
        var formData = new FormData();
        var shippingData;
        if(!isDisabledShipping) shippingData = data.shipping
        else shippingData = 0;
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
        formData.append("shipping", shippingData)

        api.post('product/upd/'+id,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            window.location.href="../products/"+id
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
        api.get('product/'+id)
        .then(prd=>{
            console.log(prd.data)
            if(prd.data.shipping == 0) setIsDisabledShipping (true)
            setProduct(prd.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[update])
   
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} >
                        <ColEditProduct product={product} setProduct={setProduct} update={update} setUpdate={setUpdate} register={register} setImages={setImages} setHtmlEditor={setHtmlEditor} isDisabledShipping={isDisabledShipping} Shipping={Shipping} categorys={categorys}></ColEditProduct>
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

export default EditProduct
