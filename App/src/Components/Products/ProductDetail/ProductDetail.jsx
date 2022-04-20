import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Container,Stack, Box, Divider, Avatar} from '@mui/material';
import {FavoriteBorder, BookmarkBorder, StarBorder} from '@mui/icons-material';

const ProductDetail = ({product, newFav}) => {

    console.log(product)
    let i=0;
    const [currentPhoto, setCurrentPhoto] = useState()
    
    const ChangedPhoto = (photo)=>{
        setCurrentPhoto(photo)
    }

    useEffect(()=>{
        if(product.images)  setCurrentPhoto(product.images[0]);
    },[product])
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} >
                {
                    currentPhoto && (
                        <Box>
                            <CardMedia
                            component="img"
                            height={'auto'}
                            image={"http://localhost:8090/" + currentPhoto} 
                            alt={product.title} 
                            />
                            <Stack direction="row" spacing={2} marginTop={2} alignItems={'center'}>
                                {
                                    product.images.map(e => {
                                        i++
                                        return ( <CardMedia
                                            key={i}
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            image={"http://localhost:8090/" + e} 
                                            onClick={()=> {ChangedPhoto(e)}}
                                        />
                                        )

                                        
                                    })
                                }
                                
                            </Stack>
                        </Box>  
                        
                    )
                }
            </Grid>
            <Grid item  xs={12} md={6}>
                <Stack direction="row" spacing={2} marginBottom={1} alignItems={'center'}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
                    <Box >
                        <Typography variant="subtitle1"  >Cris Linda's Store</Typography>
                        <Typography variant="subtitle2" color="secondary" >Created by <b>@me</b></Typography>
                    </Box>
                </Stack>
            

                <Divider></Divider>
                
                <Box marginTop={3}>
                    <Typography variant="subtitle1" color="grey" >Category of the product</Typography>
                    <Typography variant="h6" padding={0}>{product.title}</Typography>
                </Box>
                <Stack direction="row"  marginBottom={1} >
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <StarBorder/>
                    <Typography variant="subtitle1"> (2394)</Typography>
                </Stack>
                <Typography variant="h5" marginBottom={1}  marginTop={3}>{product.price}€</Typography>

                <Stack direction="row" spacing={2}  alignItems={'center'} marginBottom={3}>
                    <Button variant="outlined" color="secondary" fullWidth>Add to cart</Button>
                    <FavoriteBorder onClick={()=>{newFav(product._id)}}></FavoriteBorder>
                </Stack>
                <Box>
                    <Typography variant="h5">Description</Typography>
                    <p dangerouslySetInnerHTML={{__html: product.description}}></p>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default ProductDetail
