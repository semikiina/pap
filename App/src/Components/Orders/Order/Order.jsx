import React, { useState } from 'react'
import { Container, Typography, Divider, Grid, Paper, Box, Stack, CardMedia, Button, CircularProgress, Pagination, Chip } from '@mui/material'
import OrderProduct from './Orders Products/OrderProduct'

const Order = ({order}) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const[page,setPage] = useState(0)


    if(!order) return <CircularProgress></CircularProgress>
    return (
        <Paper>
            <Typography paddingTop={2} paddingX={2} variant="subtitle1">Order #{order.paypal_id}</Typography>
            <Typography paddingX={2} paddingBottom={2} variant="subtitle2">{ new Date(order.date_created).toLocaleDateString("en-US",options)}</Typography>
            {/* {
                order.cart.items && 
                order.cart.items.map((item) =>{
                    return (
                        <OrderProduct key={item._id} item={item.product_id} quantity={item.quantity} i={page}></OrderProduct>
                    )
                })
            } */}
            <OrderProduct item={order.cart.items[page].product_id} quantity={order.cart.items[page].quantity} userId={order.user_id}></OrderProduct>
            <Stack alignItems={'center'} paddingBottom={2}>
                <Pagination count={order.cart.items.length} onChange={(event,page)=>{setPage(page-1); console.log(page-1)}}></Pagination>
            </Stack>
            
            <Divider></Divider>
            <Stack direction="row" justifyContent={'space-between'}>
                <Typography padding={3} >Total: </Typography>
                <Box marginRight={2} marginTop={2}>
                    <Chip  label="Completed" color="success"></Chip>
                </Box>
            </Stack>
        </Paper>
    )
}

export default Order