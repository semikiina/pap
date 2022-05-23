import React from 'react'
import {AttachMoney, LocalShipping, Visibility} from '@mui/icons-material';
import { Grid, Paper, Stack, Typography} from '@mui/material'


const TopLabels = ({storeA}) => {
    return (
        <>
            <Grid item md={4} >
                <Paper>
                    <Stack alignItems={'center'} padding={2}>
                        <Visibility sx={{width:50, height: 50}}/>
                        <Typography>{storeA.views}</Typography>
                        <Typography> Store Views </Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item md={4} >
                <Paper>
                    <Stack alignItems={'center'} padding={2}>
                        <AttachMoney  sx={{width:50, height: 50}}/>
                        <Typography>23.45€</Typography>
                        <Typography>Weekly Sales</Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item md={4} >
                <Paper>
                    <Stack alignItems={'center'} padding={2}>
                        <LocalShipping sx={{width:50, height: 50}}/>
                        <Typography>2</Typography>
                        <Typography>Weekly Orders</Typography>
                    </Stack>
                </Paper>
            </Grid>
        </>
    )
}

export default TopLabels
