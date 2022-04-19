import React,  { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../Services/api';
import {Container} from '@mui/material';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductDetailFooter from './ProductDetail/ProductDetailFooter';

const DetailsP = () => {
    const {id} = useParams();

    const [product, setProduct] = useState([]);
    
    useEffect(() =>{
        api.get('product/'+id)
        .then(({data})=>{
            setProduct(data)
            
        })
    },[]);
    return (
        <Container >
            <ProductDetail product={product}></ProductDetail>
            <ProductDetailFooter storename="Cris Linda's Store" product={product}></ProductDetailFooter>
        </Container>
    )
}

export default DetailsP
