import React, { useEffect, useState } from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, } from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';

const Product = ({product, onAddToCart, newFav}) => {

    const [src, setSrc] = useState({});

    const HandleHovers = () =>{
        if(src.image == 0) {
            if(product.images[1])
            setSrc({src:"http://localhost:8090/" + product.images[1], image : 1})
        }
        else {
            if(product.images[1]) setSrc({src:"http://localhost:8090/" + product.images[0], image : 0})
        }  
    }

    useEffect(()=>{
        if(product) setSrc({src:"http://localhost:8090/" + product.images[0], image : 0})
    },[product])
    const {user} = useAuth();
    return (
        <Card sx={{ maxWidth: 345 }} >
            <Button href={'products/'+ product._id} padding={0} >
                <img 
                src={src.src}
                style={{objectFit:'cover',width: 260,height: 260 }}
                alt={product.title} 
                onMouseOver={HandleHovers}
                onMouseOut={HandleHovers} 
                />
            </Button>
            
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.category}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {product.title} 
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Typography  variant="subtitle1" component="div">
                        {product.price} € 
                    </Typography>
                    <Stack direction="row" spacing="2">
                        <Typography variant="subtitle1">{product.favorite.length}</Typography>
                            {
                                product.favorite.includes(user._id)
                                ? <Favorite size="small" onClick={()=>{newFav(product._id)}}/>
                                : <FavoriteBorder size="small" onClick={()=>{newFav(product._id)}}/>
                            }
                    </Stack>
                </Stack>
                
                
            
            </CardContent>
            <CardActions >
                    <Button size="large" variant="outlined" color="secondary" fullWidth onClick={()=> onAddToCart(product._id, 1)}>Add to Cart</Button>          
            </CardActions>
        </Card>
    )
}

export default Product
