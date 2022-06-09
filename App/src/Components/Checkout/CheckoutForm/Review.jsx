import {List, ListItem, ListItemText, Typography, Box, Stack, ListItemAvatar, Avatar, Divider } from '@mui/material'
import React from 'react'

const Review = ({cart}) => {

    return (
        <Box paddingX={4} >
           <Typography textAlign={'center'} variant="h6" paddingBottom={1}>Order Summary</Typography>
           <Divider />
           <List disablePadding >
               {
                   cart.items.map((item,index) =>{
                       
                        var thisComb = item.product_id.variants.prices.filter((comb)=>{ return comb.skuid == item.skuid})
                        return(
                            <ListItem key={`${item.product_id._id}_${index}` } alignItems="center"  divider>
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
                                        </Stack>
                                    }
                                    sx={{width: 150, paddingLeft: 2}}
                                />
                                <ListItemText primary={`${thisComb[0].originalPrice}€`} />
                            </ListItem>
                        )
                    })
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
