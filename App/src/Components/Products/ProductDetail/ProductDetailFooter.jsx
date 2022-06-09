import React from 'react'
import {CardMedia, Typography, Card, CardContent, Box, Button, CircularProgress, Stack, Tooltip, IconButton } from '@mui/material';
import {ArrowForward} from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../Services/carouselResponsive';
import SimilarProduct from './Footer/SimilarProduct';

const ProductDetailFooter = ({storename, storeid, simProduct, storeActive}) => {

    if(!storeActive || !simProduct.length) return null;
    return (
        <>
            <Stack direction="row" justifyContent={'space-between'}>
                <Typography marginTop={10} marginBottom={4} variant="h5">See other products of {storename}</Typography>
                <Tooltip title="Visit the store">
                    <IconButton disableRipple onClick={()=> window.location.href="../store/"+storeid}><ArrowForward /></IconButton>
                </Tooltip>
            </Stack>
            
            <Box marginTop={2}>
                <Carousel arrows infinite responsive={responsive}>
                    {
                        simProduct.map((product)=>{
                            
                            return <SimilarProduct key={product._id} product={product} />
                        })
                    }
                </Carousel>
            </Box>
        </>
    )
}

export default ProductDetailFooter
