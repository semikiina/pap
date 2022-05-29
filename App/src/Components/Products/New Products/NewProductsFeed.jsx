import { ArrowForward } from '@mui/icons-material';
import { Divider, Typography, Box, Stack, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Carousselitem from '../Components/Carousselitem';
import { responsive} from '../../../Services/carouselResponsive';

const NewProductsFeed = ({products, onAddToCart, newFav}) => {

    
    if(!products) return null;

    return (
            <>
                <Stack direction="row" justifyContent={'space-between'}>
                        <Typography padding={2} variant="h6">Featured Products</Typography>
                    <Tooltip title="see more">
                        <IconButton disableRipple onClick={()=> window.location.href="../feed/products"}>
                            <ArrowForward />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Divider />
                <Box marginTop={2}>
                    <Carousel arrows infinite responsive={responsive}>
                        {
                            products.map((product)=>{
                                
                                return <Carousselitem key={product._id} product={product} onAddToCart={onAddToCart} newFav={newFav}/>
                            })
                        }
                    </Carousel>
                </Box>
            </>
    )
}

export default NewProductsFeed
