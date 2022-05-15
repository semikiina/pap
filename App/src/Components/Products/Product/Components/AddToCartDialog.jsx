import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Box , ButtonGroup, Chip} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const AddToCartDialog = ({open, handleClose, product}) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const[prQuantity, setPrQuantity] = useState(1);
    const[selectedColor, setSelectedColor] = useState(0);
    const[selectedSize, setSelectedSize] = useState(0);

    return (
        <Dialog open={open == product._id} onClose={handleClose} fullScreen={fullScreen}>
            <DialogTitle> Choose your options</DialogTitle>
                <DialogContent>
                    <Stack direction="row" spacing={2} >
                        <img 
                            src={'http://localhost:8090/'+product.images[0]}
                            style={{objectFit:'cover',width: 150,height: 150 }}
                            alt={product.title} 
                        />
                        <Box>
                            <Box marginBottom={2}>
                                <Typography>{product.title}</Typography>
                                <Typography>{product.category}</Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography>{product.price} €</Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Box>
                       { 
                            product.variants.color?.map((option, index) => (
                                <Chip avatar={ <Box component="span" sx={{ bgcolor:`${option.replace(/ |_|-/g,'')}`, width: 40, height: 40, borderRadius: '50%', border: 1  }} />} variant={setSelectedColor == index ? "contained": "outlined"} label={option} onClick={()=>setSelectedColor(index)} />
                            ))
                        }
                    </Box>
                    <Box>
                       { 
                            product.variants.sizes?.map((option, index) => (
                                <Chip avatar={ <Box component="span" sx={{ width: 40, height: 40, borderRadius: '50%', border: 1  }} />} variant={setSelectedSize == index ? "contained": "outlined"} label={option} onClick={()=>setSelectedSize(index)}/>
                            ))
                        }
                    </Box>
                    <ButtonGroup  disableElevation >
                        <Button variant="contained" color="info" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                        <Button disabled>{prQuantity}</Button>
                        <Button variant="contained" color="info" onClick={()=>setPrQuantity(prQuantity+1)}>+</Button>
                    </ButtonGroup>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus variant="outlined" color="secondary">Add to cart</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddToCartDialog
