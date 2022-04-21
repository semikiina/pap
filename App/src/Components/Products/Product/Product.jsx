import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, } from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';

const Product = ({product, onAddToCart, fav, newFav}) => {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <Button href={'products/'+ product._id} padding={0} >
        <CardMedia
          component="img"
          height="400"
          image={"http://localhost:8090/" + product.images[0]} 
          alt={product.title} 
        />
      </Button>
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {product.category}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
         {product.title} 
        </Typography>
        {
          fav
          ? <Favorite onClick={()=>{newFav(product._id)}}/>
          : <FavoriteBorder onClick={()=>{newFav(product._id)}}/>
        }
        <Typography  variant="h6" component="div">
         {product.price} € 
        </Typography>
       
      </CardContent>
      <CardActions >
            <Button size="large" variant="outlined" color="secondary" fullWidth onClick={()=> onAddToCart(product._id, 1)}>Add to Cart</Button>          
      </CardActions>
    </Card>
  )
}

export default Product
