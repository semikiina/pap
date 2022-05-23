import { Grid, List, ListItem, ListItemText, Typography, Paper, Box, Chip, Stack, IconButton, ListItemAvatar, Avatar, Divider } from '@mui/material'
import React from 'react'
import { ArrowBack } from '@mui/icons-material'

const Review = ({cart, data , backStep}) => {

    console.log(cart)
    var add2 = "";
    if(data.address_2) add2 =  data.address_2 + ", "
    return (
        <Box paddingX={4} >
           <Typography textAlign={'center'} variant="h6" paddingBottom={1}>Order Summary</Typography>
           <Divider />
           <List disablePadding >
               {
                   cart.items.map((item) =>(
                        <ListItem key={ item.product_id._id} alignItems="center"  divider>
                            <ListItemAvatar >
                                <Avatar src={'http://localhost:8090/'+ item.product_id.images[0]} variant="square" sx={{width: 80 , height :  80}}/>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={item.product_id.title}
                                secondary={
                                    <Stack spacing={1}  component="span">
                                        {item.product_id.category}
                                        <br/>
                                            Qtt. {item.quantity}
                                        {item.variants && <Typography variant="caption">{item.variants?.color + ", "+ item.variants?.size}</Typography>}
                                    </Stack>
                                }
                                sx={{width: 150, paddingLeft: 2}}
                            />
                            <ListItemText primary={item.product_id.price.toFixed(2)+"€"} />
                        </ListItem>
                   ))
               }
               
           </List>
           <Box marginTop={4}>
               <Stack direction="row" justifyContent={'space-between'}>
                   <Typography variant="subtitle1">Subtotal</Typography>
                   <Typography variant="subtitle1">{cart.subtotal.toFixed(2)}€</Typography>
               </Stack>
               <Stack direction="row" justifyContent={'space-between'}>
                   <Typography variant="subtitle2">Shipping</Typography>
                   <Typography variant="subtitle2">{cart.shipping.toFixed(2)}€</Typography>
               </Stack>
               <Stack direction="row" justifyContent={'space-between'}>
                   <Typography variant="h5">TOTAL</Typography>
                   <Typography variant="h5">{(cart.subtotal + cart.shipping).toFixed(2)}€</Typography>
               </Stack>
           </Box>
        </Box>
    )
}

export default Review
