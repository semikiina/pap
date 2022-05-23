import React, { useEffect, useState } from 'react'
import {CardMedia, Button, Typography, Grid, ButtonGroup,Stack, Box, Divider, Avatar, CircularProgress, Rating, Chip} from '@mui/material';
import {Favorite,FavoriteBorder, BookmarkBorder, StarBorder} from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';

const ProductDetail = ({product, newFav, reviewL,avr, onAddToCart}) => {
    
    const {user} = useAuth();

    const [currentPhoto, setCurrentPhoto] = useState();

    const[prQuantity, setPrQuantity] = useState(1);

    const[selectedColor, setSelectedColor] = useState(0);

    const[selectedSize, setSelectedSize] = useState(0);

    let i=0;
    
    const ChangedPhoto = (photo)=>{
        setCurrentPhoto(photo)
    }

    useEffect(()=>{
        if(product.images)  setCurrentPhoto(product.images[0]);
    },[product])

    if (!product) return <CircularProgress/>;

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} >
                {
                    currentPhoto && (
                        <Box>
                            <CardMedia
                            component="img"
                            sx={{objectFit:'cover', maxHeight:550, maxWidth:550, minHeight:100, minWidth:100 }}
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
                    { product.store_id && <Avatar alt="Remy Sharp" src={"http://localhost:8090/"+product.store_id.store_image} sx={{ width: 56, height: 56 }} variant="square"/>}
                    <Box>
                        <Typography variant="subtitle1" onClick={()=>{ window.location.href="../store/"+product.store_id._id}} >{product.store_id && product.store_id.store_name}</Typography>
                        <Typography variant="subtitle2" color="secondary" >Created by <b>@{product.store_id && product.store_id.creator_id.first_name + " " + product.store_id.creator_id.last_name}</b></Typography>
                    </Box>
                </Stack>
                <Divider></Divider>
                
                <Box marginTop={3}>
                    <Typography variant="subtitle1" color="grey" >{product.category}</Typography>
                    <Typography variant="h6" padding={0}>{product.title}</Typography>
                </Box>
                
                <Stack direction="row"  marginBottom={1} >
                    <Rating readOnly value={avr}></Rating>
                    <Typography variant="subtitle1"> ({reviewL})</Typography>
                </Stack>
                <Typography variant="h5"   marginTop={3}>{product.price?.toFixed(2)}€</Typography>
                <Typography variant="subtitle1"   marginBottom={1}>Shipping : {product.shipping?.toFixed(2)}€</Typography>

                <Stack direction="row" spacing={2} marginY={1}>
                    { 
                        product.variants?.color?.map((option, index) => (
                            <Chip key={index} avatar={ <Box component="span" sx={{ bgcolor:`${option.replace(/ |_|-/g,'')}`, width: 40, height: 40, borderRadius: '50%', border: 1  }} />} variant={selectedColor == option ? "": "outlined"} label={option} onClick={()=>setSelectedColor(option)} />
                        ))
                    }
                    </Stack>
                    <Stack direction="row" spacing={2} marginY={1}>
                    { 
                        product.variants?.size?.map((option, index) => (
                            <Chip key={index}  variant={selectedSize == option ? "contained": "outlined"} label={option} onClick={()=>setSelectedSize(option)}/>
                        ))
                    }
                </Stack>

                <Stack direction="row" spacing={2}  alignItems={'center'} marginBottom={3}>
                    <ButtonGroup  disableElevation >
                        <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                        <Button disabled>{prQuantity}</Button>
                        <Button variant="contained" color="info" disabled={prQuantity < product.stock ? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                    </ButtonGroup>
                    <Button variant="outlined" color="secondary" fullWidth onClick={()=> {onAddToCart(product._id,prQuantity,selectedSize,selectedColor) ; window.location.href="../cart"}}>Add to cart</Button>
                    {
                            product.favorite?.includes(user._id)
                            ? <Favorite onClick={()=>{newFav(product._id)}} ></Favorite>
                            : <FavoriteBorder onClick={()=>{newFav(product._id)}} ></FavoriteBorder>
                    }
                    
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
