import { Container, Divider, Typography, Stack, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../../Services/api';

import OrdersDataGrid from './Orders Components/OrdersDataGrid';

const StoreOrders = ({storeid}) => {

    const [storeOrders, setStoreOrders] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(()=>{
        api.get('store/orders')
        .then(data=>{
            setStoreOrders(data.data.orders)
        })
        .catch(err=>{
            console.log(err)
        })
    },[update])

    const updateOrder = (ordid) =>{

        console.log(ordid)
        // api.post('store/updateOrderState/'+ ordid,{status : 'Fulfilled'})
        // .then(data =>{
        //     console.log(data)
        //     setUpdate(update+1)
        // })
        // .catch( err =>{
        //     console.log(err)
        // })
    }


    if(!storeOrders) return <CircularProgress></CircularProgress>
    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" padding={2}>
                <Typography variant="h5">Store Orders</Typography>
            </Stack>
            <Divider></Divider>
            {
                storeOrders.length 
                ? <OrdersDataGrid storeOrders={storeOrders} updateOrder={updateOrder} />
                : <Typography padding={2} variant="h6" textAlign={'center'}>You don't have any orders yet.</Typography>
            }
            
        </Container>
    )
}

export default StoreOrders
