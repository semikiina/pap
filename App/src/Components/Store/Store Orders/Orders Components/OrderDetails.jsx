import { Divider, Typography, Stack, Dialog, DialogTitle, DialogContent, List, DialogActions, Button, Avatar, Box, ListItem, ListItemText, ListItemAvatar, ListItemIcon, ListItemButton, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'

const OrderDetails = ({updateOrder, shippingInformation, cart, orderid, currentOrder, setCurrentOrder}) => {

    
    return (
        <>
            <Dialog
                open={currentOrder==orderid}
                onClose={()=>setCurrentOrder('')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Stack>
                        <Typography variant="title">Order Summary</Typography>
                        <Typography variant="caption">{orderid}</Typography>
                    </Stack>
                
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>

                    <Typography variant="subtitle1">Items Summary</Typography>
                    <List disablePadding>
                        {
                        cart?.map( item => {
                            return( 
                                <ListItem key={item.product_id._id}>
                                    <ListItemButton role={undefined}  dense>
                                        <ListItemIcon>
                                            <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemAvatar >
                                            <Avatar variant="square" src={"http://localhost:8090/"+item?.product_id.images[0]}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.product_id.title} secondary={"Qtt."+ item.quantity}></ListItemText>
                                    </ListItemButton>
                                   
                                </ListItem>
                            )
                        }) 
                        }
                    </List>
                    <Box  textAlign={'center'}>
                        <Typography variant="caption">After you click <b>'ORDER FULFILLED'</b> , the order state will be updated.</Typography>
                    </Box>
                    </DialogContent>
                <DialogActions>
                <Button onClick={()=>setCurrentOrder('')} color="error" >Cancel</Button>
                <Button onClick={() =>{updateOrder(orderid); setCurrentOrder('')}} color="success">Order Fulfilled</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderDetails
