import { Close, Home, Person } from '@mui/icons-material';
import { Divider, Typography, Stack, Dialog, DialogTitle, DialogContent, List, DialogActions, Button, Avatar, Box, ListItem, ListItemText, ListItemAvatar, ListItemIcon, ListItemButton, Grid, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'

const columns = [
    { field: 'product_id._id', headerName: 'ID', width: 70 },
    { field: 'product_id.title', headerName: 'Title', width: 130 }

];

const OrderDetails = ({ shippingInformation, cart, orderid, currentOrderDetails, setCurrentOrderDetails}) => {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    return (
        <>
            <Dialog
                open={currentOrderDetails==orderid}
                onClose={()=>setCurrentOrderDetails('')}
                fullWidth={true} 
                maxWidth={'md'} 
            >
            <DialogTitle>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} marginBottom={1}>
                    <Box >
                        <Typography variant="h6">Order Summary</Typography>
                        <Typography variant="subtitle1">{`#${orderid} (${new Date(shippingInformation.date_created).toLocaleDateString("en-US",options)}) `}</Typography>
                        
                    </Box>
                   
                    <IconButton onClick={()=>setCurrentOrderDetails('')}>
                        <Close/>
                    </IconButton>
                </Stack>
                <Divider/>
            </DialogTitle>
            <DialogContent >
                <Grid container>
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
                <Box padding={3}>
                    <Stack direction={"row"}  justifyContent="space-between" marginBottom={1}   >
                        <Typography variant="h6" >Total:</Typography>
                        <Typography variant="h6">{shippingInformation?.price} €</Typography>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default OrderDetails
