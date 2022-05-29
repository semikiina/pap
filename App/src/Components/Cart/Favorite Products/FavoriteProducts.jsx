import { ArrowForward } from '@mui/icons-material';
import { Divider, Typography, Box, Stack, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useAuth from '../../Contexts/useAuth';
import Carousselitem from '../../Products/Components/Carousselitem';

const responsive = {
    desktop: {
    breakpoint: {
        max: 3000,
        min: 1024
    },
    items: 4,
    partialVisibilityGutter: 40
    },
    mobile: {
    breakpoint: {
        max: 464,
        min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
    },
    tablet: {
    breakpoint: {
        max: 1024,
        min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
    }
}

const FavoriteProducts = ({onAddToCart, newFav}) => {

    const {user} = useAuth();

    if(!user.favorite) return null;
    return (
        <>
            <Typography padding={2} variant="h6" marginTop={10}>Your favorite products</Typography>
            <Divider />
            <Box marginTop={2}>
                <Carousel arrows infinite responsive={responsive}>
                    {
                        user.favorite?.map((product)=>{
                            return <Carousselitem key={product._id} product={product} onAddToCart={onAddToCart} newFav={newFav}/>
                        })
                    }
                </Carousel>
            </Box>
        </>
    )
}

export default FavoriteProducts
