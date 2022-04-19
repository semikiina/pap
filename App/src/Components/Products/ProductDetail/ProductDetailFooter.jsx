import React from 'react'
import {CardMedia, Typography, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import {ArrowRightAlt} from '@mui/icons-material';

const ProductDetailFooter = ({storename, product}) => {
  return (
    <>
      <Typography marginTop={10} marginBottom={4} variant="h5">See other products of {storename}</Typography>
      {
          product?.length === 0 ?  <CircularProgress/> :  (
            <Card sx={{ maxWidth: 300 }} >
            <Button href={'../products/'+ product._id} padding={0} >
              <CardMedia
                component="img"
                height="auto"
                image={"http://localhost:8090/" + product.images[0]} 
                alt={product.title} 
              />
            </Button>
            
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
              {product.category}
              </Typography>
              <Typography gutterBottom component="div" variant="subtitle1">
               {product.title} 
              </Typography>
              <Typography  variant="subtitle1" component="div">
               {product.price} € 
              </Typography>
            </CardContent>
          </Card>
          )
      }
    </>
  )
}

export default ProductDetailFooter
