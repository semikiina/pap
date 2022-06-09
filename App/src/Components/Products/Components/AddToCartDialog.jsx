import React, { useState , useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Box , ButtonGroup, Chip, ListItem, ListItemText, IconButton} from '@mui/material'
import { Close } from '@mui/icons-material';
import useAuth from '../../Contexts/useAuth';


const AddToCartDialog = ({open, handleClose, product, onAddToCart}) => {

    const{user} = useAuth();
    
    const[prQuantity, setPrQuantity] = useState(1);

    const [currentComb, setCurrentComb] = useState([]);

    const [skuid, setSkuid] = useState("");

    const [currentVariantPrices, setCurrentVariantPrices] = useState(1);

    const [cartQuantity, setCartQuantity] = useState(0);

    const GetCombination = (val,index)=>{

        setPrQuantity(1);

        let newArr = [...currentComb]; 
        newArr[index] = val; 
        setCurrentComb(newArr);
    }

    useEffect(()=>{
       
        setCartQuantity(0)
        var result=null;
        if(skuid){

            var result = user.cart?.items?.find(obj =>  obj.skuid === skuid)
            if(result) setCartQuantity(result.quantity)
            else ( setCartQuantity(0))
        }
        else{
            var result = user.cart?.items?.find(obj =>obj.product_id._id === product._id)

            if(result) setCartQuantity(result.quantity)
            else ( setCartQuantity(0))
        }
      
        
    },[skuid,product, user])

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

            setCurrentVariantPrices(result[0])
        }
        
    },[currentComb, user])

    useEffect(()=>{
        
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
    },[product])

    return (
        <Dialog open={open == product._id} onClose={handleClose}  fullWidth={true} maxWidth={'sm'}>
            <DialogTitle> 
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                    {"Choose your options"}
                    <IconButton onClick={handleClose} sx={{p:0}} disableRipple>
                        <Close/>
                    </IconButton>
                </Stack>
                

            </DialogTitle>
                <DialogContent>
                    <Box padding={2}>
                        <Stack  spacing={2} alignItems={'center'}>
                            <img 
                                src={'http://localhost:8090/'+product.images[0]}
                                style={{objectFit:'cover',maxWidth: 350,maxHeight: 350 }}
                                alt={product.title} 
                            />
                            <Box>
                                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} marginBottom={2}>
                                    <ListItem disablePadding>
                                        <ListItemText primary={product.title} secondary={product.category}/>
                                    </ListItem>
                                    <ListItemText primary={currentVariantPrices?.originalPrice+"€"} secondary={"+" + product.shipping +"€"}/>
                                </Stack>
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
                                <Stack direction="row" spacing={2} marginTop={1} alignItems={'center'}>
                                { 
                                    (currentVariantPrices?.availableQuantity > 0 && cartQuantity < currentVariantPrices?.availableQuantity )
                                    ?    <>
                                        <ButtonGroup  disableElevation >
                                            <Button variant="contained" color="secondary" disabled={prQuantity>1 ? false : true } onClick={()=>setPrQuantity(prQuantity-1)}>-</Button>
                                            <Button disabled>{prQuantity}</Button>
                                            <Button variant="contained" color="secondary" disabled={prQuantity < (currentVariantPrices.availableQuantity  - cartQuantity) ? false : true} onClick={()=>setPrQuantity(prQuantity+1)} >+</Button>
                                        </ButtonGroup>
                                        <Button variant="contained" color="secondary" fullWidth onClick={()=> {onAddToCart(product._id,prQuantity, skuid); setPrQuantity(1); handleClose(); }}>Add to cart</Button>
                                        </>
                                    : <Button disabled variant="contained" color="secondary" fullWidth>This product can't be added.</Button>
                                }
                                </Stack>
                            </Box>
                            
                        </Stack>
                    </Box>
                </DialogContent>
        </Dialog>
    )
}

export default AddToCartDialog
