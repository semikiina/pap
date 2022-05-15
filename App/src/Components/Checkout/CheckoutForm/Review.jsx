import { Grid, List, ListItem, ListItemText, Typography, Paper, Box, Divider, Tooltip, IconButton } from '@mui/material'
import React from 'react'
import { ArrowBack } from '@mui/icons-material'

const Review = ({cart, data , backStep}) => {
    return (
        <>
            <Grid container spacing={3}>
               <Grid item xs={12} lg={1} marginTop={4}>
                   <Tooltip title="Back">
                       <IconButton onClick={backStep}>
                            <ArrowBack/>
                       </IconButton>
                   </Tooltip>
               </Grid>
                <Grid item xs={12} lg={5} marginBottom={4}>
                    
                <Paper elevation={3}>
                    <Typography variant="h4" marginTop={4} marginBottom={1} padding={2}>Order Summary</Typography>
                    <List>
                        <ListItem>
                            <Typography  variant="h6">Total items: {cart.items.length}</Typography>
                        </ListItem>
                        {
                            cart.items.map((item) =>(
                                <ListItem key={item.product_id._id}>
                                    <ListItemText primary={item.product_id.title} secondary={item.price +"€     - Qtt. "+ item.quantity}></ListItemText>
                                </ListItem>
                            ))
                        
                        }
                         <ListItem>
                            <Divider></Divider>
                        </ListItem>
                         <ListItem>
                            <Typography  variant="h6">Subtotal: {cart.subtotal}€</Typography>
                        </ListItem>
                         <ListItem>
                            <Typography  variant="h6">Shipping: FREE</Typography>
                        </ListItem>
                         <ListItem>
                            <Typography  variant="h5">Total: {cart.subtotal}€</Typography>
                        </ListItem>
                    </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6} marginBottom={4}>
                    <Paper  elevation={3}>
                        <Typography variant="h4" marginTop={4} marginBottom={1} padding={2}>Shipping Information</Typography>
                        <Typography  variant="h6" padding={2}> <b>Name:</b> {data.first_name  + " " + data.last_name}</Typography>
                        <Typography  variant="h6" padding={2}> <b>Email:</b> {data.email}</Typography>
                        <Typography  variant="h6" padding={2}> <b>Phone:</b> {data.phone}</Typography>
                        <Typography  variant="h6" padding={2}> <b>Address 1:</b> {data.address_1}</Typography>
                        <Typography  variant="h6" padding={2}> <b>Country:</b> {data.country}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            
        </>
    )
}

export default Review
