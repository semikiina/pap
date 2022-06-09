import { Email, Home, Person, WarningAmberOutlined } from '@mui/icons-material'
import { Divider, Typography, Stack, Dialog, DialogTitle, DialogContent, List, DialogActions, Button, Avatar, Box, ListItem, ListItemText, ListItemAvatar, ListItemButton, Alert, ListItemIcon, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'



const OrderStateUpdate = ({updateOrder, shippingInformation, cart, orderid, currentOrder, setCurrentOrder}) => {

  return (
        <Dialog
            open={currentOrder==orderid}
            onClose={()=>setCurrentOrder('')}
            fullWidth={true} 
            maxWidth={'md'} 
        >
        <DialogContent >
            <Stack spacing={1} alignItems={'center'} >
                <WarningAmberOutlined color="warning" sx={{ width: 100, height : 100 }} />
                <Typography>Do you confirm that  you are ready to send all this items?</Typography>
                <Grid container >
                    <Grid item xs={12} md={6}>
                        <Typography textAlign={'center'} padding={1}>Product List</Typography>
                        <Divider variant="middle"/>
                        <List disablePadding >
                            {
                            cart?.map( item => {
                                return( 
                                    <ListItem key={item.product_id._id}>
                                        <ListItemButton onClick={()=> window.location.href = "../products/"+ item.product_id._id}  dense>
                                            <ListItemAvatar >
                                                <Avatar variant="square" src={"http://localhost:8090/"+item?.product_id.images[0]}></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${item.product_id.title} (${item.skuid.replaceAll('?', ', ')})`} secondary={"Qtt."+ item.quantity}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }) 
                            }
                        </List>
                        <ListItem dense><ListItemText>Total Items : {cart.length }</ListItemText></ListItem>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography textAlign={'center'} padding={1}>Shipping Informations</Typography>
                        <Divider variant="middle"/>
                        <Box paddingTop={1}>
                            <ListItem dense> <ListItemIcon><Person fontSize="small"/></ListItemIcon><ListItemText>{shippingInformation.name}</ListItemText></ListItem>
                            <ListItem dense> <ListItemIcon><Home fontSize="small"/></ListItemIcon><ListItemText>{shippingInformation.address }</ListItemText></ListItem>
                        </Box>
                    </Grid>
                </Grid>
                
                <Typography variant="subtitle2" paddingTop={5}>You <b>can't</b> change this later.</Typography>
                <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                <Button fullWidth color="error" variant="contained" onClick={() =>{setCurrentOrder('')}}>Order isn't ready yet</Button>
                <Button fullWidth color="success" variant="contained" onClick={() =>{updateOrder(orderid); setCurrentOrder('')}}>Confirm order</Button>
                </Stack>
                
            </Stack>
        </DialogContent>
    </Dialog>
  )
}

export default OrderStateUpdate
