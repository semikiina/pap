import React,  { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../Services/api';
import {Container} from '@mui/material';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductDetailFooter from './ProductDetail/ProductDetailFooter';
import ProductReview from './ProductDetail/ProductReview';

const DetailsP = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [fav, setFav] = useState(false);
    
    const newFavorite = (id) =>{
        api.post('user/nfav/620ac00c85d485580493d87f/'+id)
        .then(({data})=>{
            console.log(data.fav)
            if(data.fav)setFav(true)
            else setFav(false)
        })
    }

    useEffect(() =>{
        api.get('product/'+id)
        .then(({data})=>{
            setProduct(data)
            console.log(data)
            if(data.favorite.includes('620ac00c85d485580493d87f')) setFav(true)
        })
    },[]);

    
    return (
        <Container >
            <ProductDetail product={product} newFav={newFavorite} fav={fav}></ProductDetail>
            <ProductReview></ProductReview>
            <ProductDetailFooter storename="Cris Linda's Store" product={product}></ProductDetailFooter>
        </Container>
    )
}

export default DetailsP
