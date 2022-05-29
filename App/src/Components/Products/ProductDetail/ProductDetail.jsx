import React, { useEffect, useState } from 'react'
import {CardMedia, Button, Typography, Grid, ButtonGroup,Stack, Box, Divider, Avatar, CircularProgress, Rating, Chip, FormControlLabel, Checkbox} from '@mui/material';
import {Favorite,FavoriteBorder, BookmarkBorder, StarBorder} from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';

const ProductDetail = ({product, newFav, reviewL,avr, onAddToCart}) => {
    
    const {user} = useAuth();

    const [currentPhoto, setCurrentPhoto] = useState();

    const[prQuantity, setPrQuantity] = useState(1);

    const [currentComb, setCurrentComb] = useState([]);

    const [skuid, setSkuid] = useState("");

    const [cartQuantity, setCartQuantity] = useState(0);


    const [currentProductPrice, setCurrentProductPrice] = useState(1);

    let i=0;
    
    const ChangedPhoto = (photo)=>{
        setCurrentPhoto(photo)
    }

    const GetCombination = (val,index)=>{

        let newArr = [...currentComb]; 
        newArr[index] = val; 

        setCurrentComb(newArr);

    }


    useEffect(()=>{

        var newComb = "";

        currentComb.forEach((comb, x)=>{
            if(x < currentComb.length - 1)
            newComb += comb+"?";
            else newComb += comb
        })

        setSkuid(newComb)

        var result = product.variants?.prices?.filter(obj => {
            return obj.skuid === newComb
          })
        
        if(result) {

            setCurrentProductPrice(result[0])
        }

        
    },[currentComb])


    useEffect(()=>{
        if(skuid){
            setCartQuantity(0)
            var result = user.cart?.items?.filter(obj => {
                return obj.skuid === skuid
            })
            if(result.length) setCartQuantity(result[0]?.quantity)
            else ( setCartQuantity(0))
        }
      
        
    },[skuid,product])


    useEffect(()=>{
        
        
        if(product){
            
            if(product.images)  setCurrentPhoto(product.images[0]);

            if(product.variants){

                var getVal = [];
                product.variants.options.forEach((opt, index)=>{
                    
                    getVal.push(opt.values[0])
                })

                setCurrentComb(getVal)

            }
        }
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
                            image={"https://tagmeapi.herokuapp.com/" + currentPhoto} 
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
                                            image={"https://tagmeapi.herokuapp.com/" + e} 
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
                    { product.store_id && <Avatar alt="Remy Sharp" src={"https://tagmeapi.herokuapp.com/"+product.store_id.store_image} sx={{ width: 56, height: 56 }} variant="square"/>}
                    <Box>
                        <Typography variant="subtitle1" onClick={()=>{ window.location.href="../store/"+product.store_id._id}} >{product.store_id && product.store_id.store_name}</Typography>
                        <Typography variant="subtitle2" color="secondary" >Created by <b>{product.store_id && product.store_id.creator_id.first_name + " " + product.store_id.creator_id.last_name}</b></Typography>
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
                <Typography variant="h5"   marginTop={3}>{currentProductPrice?.originalPrice || product.basePrice?.toFixed(2)}€</Typography>
                <Typography variant="subtitle1"   marginBottom={1}>Shipping : {product.shipping?.toFixed(2)}€</Typography>

                <Box marginBottom={2}>
                    {
                        product.variants?.options?.map((item,index)=>{
                            return (
                                <div key={index}>
                                    <Typography padding={1}>{item.name}</Typography>
                                    {
                                        item.values.map((val,ii) =>{
                                            
                                            return <Chip color="primary" label={val} key={ii} variant={ currentComb[index] == val ? "contained" : "outlined"} onClick={() => GetCombination(val, index)} />
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </Box>

                <Stack direction="row" spacing={2}  alignItems={'center'} marginBottom={3}>
                   { 
                    (currentProductPrice.availableQuantity > 0 && cartQuantity < currentProductPrice.availableQuantity)
                    ?    <>
                        <ButtonGroup  disableElevation >
                            <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                            <Button disabled>{prQuantity}</Button>
                            <Button variant="contained" color="info" disabled={prQuantity < currentProductPrice.availableQuantity ? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                        </ButtonGroup>
                        <Button variant="outlined" color="secondary" fullWidth onClick={()=> {onAddToCart(product._id,prQuantity, skuid) }}>Add to cart</Button>
                        </>
                    : <Button disabled variant="contained" color="secondary" fullWidth>This product is sould out.</Button>
                    }
                    {product.favorite &&
                          <FormControlLabel 
                            control={
                                <Checkbox 
                                    icon={<FavoriteBorder />} 
                                    checkedIcon={<Favorite sx={{ color : 'black'}}/>} 
                                    checked={product.favorite?.includes(user._id)} 
                                    onChange={()=>{newFav(product._id)}}
                                    
                                />}
                            labelPlacement="start"
                            label={product.favorite?.length}
                        />
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
