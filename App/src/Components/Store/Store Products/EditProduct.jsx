import { Grid, Box, Paper, Button ,FormControlLabel, Switch, Container  } from '@mui/material'
import api from '../../../Services/api';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ColEditProduct from './Edit Product/ColEditProduct';

const EditProduct = ({storeid}) => {

    const  {id} = useParams();
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
        basePrice: 0,
        shipping: "0",
      })

    const Shipping = (e)=>{
        if(!e.target.checked) setIsDisabledShipping(false)
        else setIsDisabledShipping(true)
    }

    const handleEdit = data => {

        var formData = new FormData();

        var ins = data.images.length;

        console.log(data.images)
        for (var x = 0; x < ins; x++) {
            formData.append("image", data.images[x]);
        }

        if(data.vprices.length){
    
            for (var x = 0; x < data.vprices.length; x++) {
    
                formData.append("vprices[]", JSON.stringify(data.vprices[x]));
            }
        }

        formData.append("title", data.title)
        formData.append("stock", data.stock)
        formData.append("active", data.active)
        formData.append("basePrice", data.basePrice)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("shipping", data.shipping)

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

            var imgs=[]
            prd.data.images.forEach((image) => {
                imgs.push(`http://localhost:8090/${image}`)
            })

            setImages(imgs)
            setProduct(prd.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[update])
   
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <ColEditProduct product={product} setProduct={setProduct} categorys={categorys} images={images} handleEdit={handleEdit} ></ColEditProduct>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default EditProduct
