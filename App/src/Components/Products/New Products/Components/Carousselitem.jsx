import React, { useEffect, useState } from 'react';
import {Card, CardActions, CardContent, Checkbox, Button, Typography, Stack, Box, ListItemText, FormControlLabel, } from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import useAuth from '../../../Contexts/useAuth';
import AddToCartDialog from './AddToCartDialog';


const Carousselitem = ({product, newFav, onAddToCart}) => {

    
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
        if(product) {
            setSrc({src:"http://localhost:8090/" + product.images[0], image : 0})
        }
    },[product])

    if(!product) return null;
    return (
        <>
            <Box padding={1}>
                <Card>
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
                        <ListItemText primary={product.title} secondary={product.category} />
                        <Stack direction="row" justifyContent="space-between" marginTop={2}>
                            <Typography  variant="subtitle1" component="div">
                                {product.price} € 
                            </Typography>
                            
                           { product.favorite && 
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
                    </CardContent>
                    <CardActions>
                            <Button size="large" variant="outlined" color="secondary" fullWidth onClick={()=> handleClickOpen(product._id)}>Add to Cart</Button>          
                    </CardActions>
                </Card>
            </Box>
            <AddToCartDialog open={open} handleClose={handleClose} product={product} onAddToCart={onAddToCart}/>
        </>
    )
}

export default Carousselitem
