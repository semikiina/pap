import React from 'react'
import {CardMedia, Typography, Card, CardContent, Box, Button, CircularProgress } from '@mui/material';

const SimilarProduct = ({product}) => {
    return (
        <Box padding={1}>
            <Card sx={{ maxWidth: 300 }} >
                <Button href={'../products/'+ product._id} padding={0} >
                <CardMedia
                    component="img"
                    height="auto"
                    image={"https://tagmeapi.herokuapp.com/" + product.images[0]} 
                    alt={product.title} 
                    sx={{width: 260,height: 260 , objectFit: 'cover'}}
                />
                </Button>
                
                <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                {product.category}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                {product.title} 
                </Typography>
                <Typography  variant="subtitle1" >
                {product.price?.toFixed(2)} € 
                </Typography>
                <Typography  variant="subtitle2" >
                 + {product.shipping?.toFixed(2)} € 
                </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SimilarProduct
