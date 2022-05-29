import { Container, Grid } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import AddProductPage from './AddProduct/AddProductPage';

const AddProducts = () => {
    
    const [categorys, setCategorys] = useState([])

    useEffect(()=>{
        api.get('product/categorys')
        .then(cats=>{
            setCategorys(cats.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    const handleAddProduct = data => {
        

        var formData = new FormData();

        for (var x = 0; x < data.imagesLen; x++) {
            formData.append("image", data.images[x]);
        }
        if(data.voptions.length){
            for (var x = 0; x < data.voptions.length; x++) {

                formData.append("voptions[]", JSON.stringify(data.voptions[x]));
            }
    
            for (var x = 0; x < data.vprices.length; x++) {
    
                formData.append("vprices[]", JSON.stringify(data.vprices[x]));
            }
        }
        if(!data.shipping.length) data.shipping = 0.00

        formData.append("title", data.title)
        formData.append("active", data.active)
        formData.append("basePrice", data.basePrice)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("shipping", data.shipping)
        formData.append("stock", data.stock)
       

        api.post('product',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
            console.log(data)
            window.location.href="./storeProducts"
        })
        .catch(err=>{
            console.log(err) 
        })
    };


   
    return (
        <>
            <Container>
                <Grid container>
                    <Grid item>
                        <AddProductPage categorys={categorys} handleAddProduct={handleAddProduct}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default AddProducts
