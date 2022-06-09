import React, { useEffect, useState } from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, } from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import useAuth from '../../../Contexts/useAuth';
import AddToCartDialog from '../../New Products/Components/AddToCartDialog';

const Product = ({product, onAddToCart, newFav}) => {

    const [src, setSrc] = useState({});

    const {user} = useAuth();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (prid) => {
        setOpen(prid);
    };

    const handleClose = () => {
        setOpen('');
    };

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

   

    return (
        <>
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
                <CardActions>
                        <Button size="large" variant="outlined" color="secondary" fullWidth onClick={()=> handleClickOpen(product._id)}>Add to Cart</Button>          
                </CardActions>
            </Card>

            <AddToCartDialog open={open} handleClose={handleClose} product={product} onAddToCart={onAddToCart}/>
        </>
    )
}

export default Product
