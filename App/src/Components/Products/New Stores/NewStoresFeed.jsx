import { ArrowForward } from '@mui/icons-material';
import { Divider, Typography, Box, Stack, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarousselitemStores from './Components/CarousselitemStores';

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
    items: 3,
    partialVisibilityGutter: 30
    }
}
 

const NewStoresFeed = ({newStores}) => {

    

    if(!newStores) return null;
   
    return (
        <>
            <Stack direction="row" justifyContent={'space-between'}>
                <Typography padding={2} variant="h6">New Stores</Typography>
                <Tooltip title="see more">
                    <IconButton disableRipple onClick={()=> window.location.href="../feed/stores"}>
                        <ArrowForward />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider />
            <Box marginTop={2}>
                <Carousel arrows infinite responsive={responsive}>
                    {
                        newStores.map((store)=>{
                            return <CarousselitemStores key={store._id} store={store} />
                        })
                    }
                </Carousel>
            </Box>
        </>
    )
}

export default NewStoresFeed
