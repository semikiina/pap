import React,  { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../Services/api';
import {Container} from '@mui/material';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductDetailFooter from './ProductDetail/ProductDetailFooter';
import ProductReview from './ProductDetail/ProductReview';

const DetailsP = ({newFavorite,fav,onAddToCart}) => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [simProduct, setSimProduct] = useState([]);
    const [del, setDel] = useState(0);
    const [reviews, setReviews]=useState([])
    var avr= 0;

    const similarProducts = (strid) => {
        api.get('feed/similarProducts/'+strid+"/"+id)
        .then(({data})=>{
            setSimProduct(data)
            
        })
    }



    useEffect(() =>{
        api.get('product/'+id)
        .then(({data})=>{
             setProduct(data)
             similarProducts(data.store_id._id)
        })
    },[fav]);

    useEffect(() =>{
        api.get('review/'+id)
        .then(({data})=>{
            setReviews(data.rev)
        })
    },[del]);

    if(reviews.length){
        reviews.forEach((i)=>{
            avr += i.review;
        })
        avr=Math.floor(avr/reviews.length)
    }

    return (
        <Container >
            <ProductDetail product={product} newFav={newFavorite} reviewL={reviews.length} avr={avr} onAddToCart={onAddToCart}></ProductDetail>
            <ProductReview id={id} reviews={reviews} setDel={setDel} del={del}></ProductReview>
            <ProductDetailFooter storename={product.store_id?.store_name} storeid={product.store_id?._id} simProduct={simProduct} ></ProductDetailFooter>
        </Container>
    )
}

export default DetailsP
