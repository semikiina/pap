import React from 'react';
import { Container, Divider, Grid, Typography} from '@mui/material'
import ChartsArea from './DashboardItems/ChartsArea';
import useAuth from "../Contexts/useAuth";
import TopLabels from './DashboardItems/TopLabels';
  
const Dashboard = () => {

    const {storeA} = useAuth();

    return (
        <Container>
            <Typography variant="h5" padding={2}>Dashboard</Typography>
            <Divider></Divider>
            <Grid container spacing={3} marginBottom={3} marginTop={1} >
                <TopLabels storeA={storeA} />
                <ChartsArea store={storeA}></ChartsArea>
            </Grid>
        </Container>
        
  )
}

export default Dashboard
