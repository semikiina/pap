import React from 'react';
import {Avatar, Box, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material'
import ChartsArea from './DashboardItems/ChartsArea';

  
const Dashboard = () => {

    const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];

    return (
        <Container>
            <Typography variant="h5" padding={2}>Dashboard</Typography>
            <Divider></Divider>
            <Grid container spacing={3} marginBottom={3} marginTop={1} >
                <Grid item md={3} >
                    <Paper>
                        <Stack alignItems={'center'} padding={2}>
                            <Avatar>R</Avatar>
                            <Typography>100K</Typography>
                            <Typography>Weekly Sales</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper>
                        <Stack alignItems={'center'} padding={2}>
                            <Avatar>R</Avatar>
                            <Typography>100K</Typography>
                            <Typography>Weekly Sales</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper>
                        <Stack alignItems={'center'} padding={2}>
                            <Avatar>R</Avatar>
                            <Typography>100K</Typography>
                            <Typography>Weekly Sales</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item md={3} >
                    <Paper>
                        <Stack alignItems={'center'} padding={2}>
                            <Avatar>R</Avatar>
                            <Typography>100K</Typography>
                            <Typography>Weekly Sales</Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <ChartsArea></ChartsArea>
            </Grid>

        </Container>
        
  )
}

export default Dashboard
