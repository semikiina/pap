import React,  { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../Services/api';
import {Container} from '@mui/material';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductDetailFooter from './ProductDetail/ProductDetailFooter';

const DetailsP = () => {
    const {id} = useParams();

    const [product, setProduct] = useState([]);
    const [fav, setFav] = useState(false);
    
    useEffect(() =>{
        api.get('product/'+id)
        .then(({data})=>{
            setProduct(data)
            if(data.favorite.includes('620ac00c85d485580493d87f')) setFav(true)
        })
    },[]);

    const newFavorite = (id) =>{
        api.post('user/nfav/620ac00c85d485580493d87f/'+id)
        .then(({data})=>{
            console.log(data)
        })
    }
    console.log(fav)
    return (
        <Container >
            <ProductDetail product={product} newFav={newFavorite}></ProductDetail>
            <ProductDetailFooter storename="Cris Linda's Store" product={product}></ProductDetailFooter>
        </Container>
    )
}

export default DetailsP
