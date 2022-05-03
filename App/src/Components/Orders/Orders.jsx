import { Container, Typography, Divider, Grid, Paper, Box, Stack, CardMedia, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../Services/api'
import Order from './Order/Order'
import useAuth from '../Contexts/useAuth';

const Orders = () => {

    const {user} = useAuth();
    const [orders,setOrders] = useState([])

    useEffect(()=>{
        if(user._id)
        api.get('user/orders/'+user._id)
        .then(({data})=>{
            setOrders(data.orders)
        })
        .catch(err=>{
            console.log(err)
        })
    },[user])

    if(!orders) return <CircularProgress></CircularProgress>
    return (
        <Container>
            <Typography variant="h5" padding={2}>My Orders</Typography>
            <Divider></Divider>
            {/* <Stack direction={'row'}>
                <Box>
                <Stack direction={'row'}></Stack>
                </Box>
                <Box>
                <Stack direction={'row'}></Stack>
                </Box>
            </Stack> */}
            <Grid container marginTop={3} spacing={2}>
                    {
                        orders.map((order) =>(
                            <Grid item md={4} key={order._id} >
                                <Order order={order}></Order>
                            </Grid>
                        ))
                    }
                   
                
            </Grid>
        </Container>
    )
}

export default Orders
