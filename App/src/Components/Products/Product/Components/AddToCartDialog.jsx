import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Box , ButtonGroup, Chip, ListItem, ListItemText} from '@mui/material'


const AddToCartDialog = ({open, handleClose, product, onAddToCart}) => {

    const[prQuantity, setPrQuantity] = useState(1);
    const[selectedColor, setSelectedColor] = useState(0);
    const[selectedSize, setSelectedSize] = useState(0);

    return (
        <Dialog open={open == product._id} onClose={handleClose}  fullWidth={true} maxWidth={'sm'}>
            <DialogTitle> Choose your options</DialogTitle>
                <DialogContent>
                    <Box padding={2}>
                        <Stack direction="row" spacing={2} alignItems={'flex-start'}>
                            <img 
                                src={'http://localhost:8090/'+product.images[0]}
                                style={{objectFit:'cover',width: 150,height: 150 }}
                                alt={product.title} 
                            />
                            <Box>
                                <ListItem disablePadding>
                                    <ListItemText primary={product.title} secondary={product.category}/>
                                </ListItem>
                                <Stack direction="row" spacing={2} marginY={1}>
                                { 
                                        product.variants.color?.map((option, index) => (
                                            <Chip key={index} avatar={ <Box component="span" sx={{ bgcolor:`${option.replace(/ |_|-/g,'')}`, width: 40, height: 40, borderRadius: '50%', border: 1  }} />} variant={selectedColor == option ? "": "outlined"} label={option} onClick={()=>setSelectedColor(option)} />
                                        ))
                                    }
                                </Stack>
                                <Stack direction="row" spacing={2} marginY={1}>
                                { 
                                        product.variants.size?.map((option, index) => (
                                            <Chip key={index}  variant={selectedSize == option ? "contained": "outlined"} label={option} onClick={()=>setSelectedSize(option)}/>
                                        ))
                                    }
                                </Stack>
                                <Stack direction="row" spacing={2} marginTop={1} alignItems={'center'}>
                                    <ButtonGroup  disableElevation >
                                        <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                                        <Button disabled>{prQuantity}</Button>
                                        <Button variant="contained" color="info" onClick={()=>setPrQuantity(prQuantity+1)} disabled={prQuantity==product.stock ? false : true } >+</Button>
                                    </ButtonGroup>
                                    <Typography variant="h6">{product.price * prQuantity + " €"}</Typography>
                                </Stack>
                            </Box>
                            
                        </Stack>
                    </Box>
                    
                    
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={()=> onAddToCart(product._id,prQuantity,selectedSize,selectedColor)} autoFocus variant="outlined" color="secondary">Add to cart</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddToCartDialog
