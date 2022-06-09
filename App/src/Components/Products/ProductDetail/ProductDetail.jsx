import React, { useEffect, useState } from 'react'
import {CardMedia, Button, Typography, Grid, ButtonGroup,Stack, Box, Divider, Avatar, CircularProgress, Rating, Chip, FormControlLabel, Checkbox, ListItem, ListItemButton, ListItemAvatar, ListItemText} from '@mui/material';
import {Favorite,FavoriteBorder, Lock, RemoveRedEye, Visibility} from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';
import ProductImages from './Product Section/ProductImages';
import StoreSection from './Product Section/StoreSection';

const ProductDetail = ({product, newFav, reviewL,avr, onAddToCart}) => {
    
    const {user} = useAuth();

    const [currentPhoto, setCurrentPhoto] = useState();

    const[prQuantity, setPrQuantity] = useState(1);

    const [currentComb, setCurrentComb] = useState([]);

    const [skuid, setSkuid] = useState("");

    const [cartQuantity, setCartQuantity] = useState(0);

    const [currentVariantPrices, setCurrentVariantPrices] = useState(1);

    const ChangedPhoto = (photo)=>{
        setCurrentPhoto(photo)
    }

    const GetCombination = (val,index)=>{

        setPrQuantity(1);
        
        let newArr = [...currentComb]; 
        newArr[index] = val; 

        setCurrentComb(newArr);

    }

    useEffect(()=>{

        var newComb = "";

        currentComb.forEach((comb, x)=>{
            if(x < currentComb.length - 1) newComb += comb+"?";
            else newComb += comb
        })

        setSkuid(newComb)

        var result = product.variants?.prices?.find(obj => obj.skuid === newComb)
        
        if(result) {
            setCurrentVariantPrices(result)
        }

        
    },[currentComb])


    useEffect(()=>{

        var result = null;

        if(skuid){
            result = user.cart?.items?.find(obj => obj.skuid === skuid)
            if(result) setCartQuantity(result.quantity)
            else ( setCartQuantity(0))
        }
        else{
            result = user.cart?.items?.find(obj => obj.product_id._id === product._id )
            if(result) setCartQuantity(result.quantity)
            else ( setCartQuantity(0))
        }
      
        
    },[skuid,product,user])


    useEffect(()=>{
        
        if(product){
            
            if(product.images)  setCurrentPhoto(product.images[0]);

            if(product.variants){

                var getVal = [];
                if(product.variants.options.length)
                { 
                    product.variants.options.forEach((opt, index)=>{
                        
                        getVal.push(opt.values[0])
                    })
                }
                else{
                    getVal.push("default")
                }

                setCurrentComb(getVal)

            }
        }
    },[product])

    if (!product) return <CircularProgress/>;
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} >
                <ProductImages currentPhoto={currentPhoto} images={product.images} ChangedPhoto={ChangedPhoto} />
            </Grid>
            <Grid item  xs={12} md={6}>
                <StoreSection store={product.store_id} active={product.active} />
                <Divider />
            
                <ListItemText 
                    primary={<Typography variant="h5">{product.title}</Typography>}
                    secondary={product.category}
                />
                <Stack direction="row"  marginBottom={1} >
                    <Rating readOnly value={avr}></Rating>
                    <Typography variant="subtitle1"> ({reviewL})</Typography>
                </Stack>
                <ListItemText 
                    primary={<Typography variant="h5"  >{currentVariantPrices?.originalPrice || product.basePrice?.toFixed(2)}€</Typography>}
                    secondary={`Shipping : ${product.shipping?.toFixed(2)}€`}
                />

                    <Box marginBottom={4}>
                        {
                            product.variants?.options?.map((item,index)=>(
                                <Box key={index}>
                                    <Typography padding={1}>{item.name}</Typography>
                                    {
                                        item.values.map((val,ii) => <Chip color="primary" label={val} key={ii} variant={ currentComb[index] == val ? "contained" : "outlined"} onClick={() => GetCombination(val, index)} />)
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                    <Stack direction="row" spacing={2}  alignItems={'center'} marginBottom={3}>
                    { 
                        (currentVariantPrices.availableQuantity > 0 && cartQuantity < currentVariantPrices.availableQuantity)
                        ?    <>
                            <ButtonGroup  disableElevation >
                                <Button variant="contained" color="secondary" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                                <Button disabled>{prQuantity}</Button>
                                <Button variant="contained" color="secondary" disabled={prQuantity < (currentVariantPrices.availableQuantity - cartQuantity )? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                            </ButtonGroup>
                            <Button variant="contained" color="secondary" fullWidth onClick={()=> 
                                {
                                    if(user._id){
                                        onAddToCart(product._id,prQuantity, skuid) 
                                        setPrQuantity(1)
                                    }
                                    else window.location.href="../login"
                                }
                            } 
                            >Add to cart</Button>
                            </>
                        : <Button disabled variant="contained" color="secondary" fullWidth>This product can't be added.</Button>
                        }
                        {product.favorite &&
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        icon={<FavoriteBorder />} 
                                        checkedIcon={<Favorite sx={{ color : 'black'}}/>} 
                                        checked={product.favorite?.includes(user._id)} 
                                        onChange={()=>{
                                            if(user._id){
                                                newFav(product._id)
                                            }
                                            else window.location.href="../login"
                                        }}
                                        
                                    />}
                                labelPlacement="start"
                                label={product.favorite?.length}
                            />
                        }
                        
                    </Stack>  
                
                <Box>
                    <p dangerouslySetInnerHTML={{__html: product.description}}></p>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default ProductDetail
