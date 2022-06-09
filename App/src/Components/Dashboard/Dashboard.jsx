import React, { useEffect, useState } from 'react';
import { Container, Divider, Grid, Typography} from '@mui/material'
import ChartsArea from './DashboardItems/ChartsArea';
import useAuth from "../Contexts/useAuth";
import TopLabels from './DashboardItems/TopLabels';
import api from '../../Services/api';
  
const Dashboard = () => {

    var myDate = new Date();
    const {storeA} = useAuth();

    const [salesCount, setSalesCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [ordersDate, setOrdersDate] = useState(myDate.setDate(myDate.getDate() -1));
    const [salesDate, setSalesDate] = useState( myDate.setDate(myDate.getDate() -1));

    useEffect(()=>{
        api.post('store/ordersLog', {date: ordersDate})
        .then(data=>{
            setOrdersCount(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[ordersDate])

    useEffect(()=>{
        api.post('store/salesLog', {date: salesDate})
        .then(data=>{
            setSalesCount(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[salesDate])

    return (
        <Container>
            <Typography variant="h5" padding={2}>Dashboard</Typography>
            <Divider></Divider>
            <Grid container spacing={3} marginBottom={3} marginTop={1}  >
                <TopLabels storeA={storeA} setOrdersDate={setOrdersDate} ordersCount={ordersCount} salesCount={salesCount} setSalesDate={setSalesDate} />
                <ChartsArea store={storeA}  ></ChartsArea>
            </Grid>
        </Container>
        
  )
}

export default Dashboard
