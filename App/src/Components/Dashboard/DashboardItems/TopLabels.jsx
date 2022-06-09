import React, { useState } from 'react'
import {AttachMoney, CalendarMonth,  LocalShipping, Visibility} from '@mui/icons-material';
import { Grid, IconButton, Menu, MenuItem, Paper, Stack, Typography} from '@mui/material'

const times =['', 'Weekly' , 'Monthly' , 'All time', 'Daily']

const TopLabels = ({storeA, setOrdersDate, ordersCount, salesCount, setSalesDate}) => {

    const [orderTime, setOrderTime] = useState(4);
    const [anchorElOrders, setAnchorElOrders] = useState(null);
    const openOrdersMenu = Boolean(anchorElOrders);

    const handleClickOrders = (event) => {
        setAnchorElOrders(event.currentTarget);
    };
    const handleCloseOrders = (option) => {

        var myDate = new Date();

        if(option == 4) myDate = myDate.setDate(myDate.getDate() -1);
        if(option == 1) myDate = myDate.setDate(myDate.getDate() -7)
        if(option == 2) myDate = myDate.setMonth(myDate.getMonth() -1)
        if(option == 3) myDate = 0;

        if(option>0) {
            setOrdersDate(myDate); 
            setOrderTime(option)
        }
        
        setAnchorElOrders(null);
    };

    const [saleTime, setSaleTime] = useState(4);
    const [anchorElSale, setAnchorElSale] = useState(null);
    const openSaleMenu = Boolean(anchorElSale);

    const handleClickSale = (event) => {
        setAnchorElSale(event.currentTarget);
    };
    const handleCloseSale = (option) => {

        var myDate = new Date();

        if(option == 4) myDate = myDate.setDate(myDate.getDate() -1);
        if(option == 1) myDate = myDate.setDate(myDate.getDate() -7)
        if(option == 2) myDate = myDate.setMonth(myDate.getMonth() -1)
        if(option == 3) myDate = 0;

        if(option>0) {
            setSalesDate(myDate); 
            setSaleTime(option)
        }
        
        setAnchorElSale(null);
    };

    return (
        <>
            <Grid item sm={12} md={4} >
                <Paper>
                    <Stack alignItems={'center'} padding={3}>
                        <Visibility sx={{width:50, height: 50}}/>
                        <Typography paddingTop={1}>{storeA.views}</Typography>
                        <Typography> Store Views </Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item sm={12} md={4} >
                
                <Paper>
                    <IconButton   onClick={handleClickSale}>
                        <CalendarMonth/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElSale}
                        open={openSaleMenu}
                        onClose={handleCloseSale}
                    >
                        <MenuItem onClick={()=> handleCloseSale(4)}>Today</MenuItem>
                        <MenuItem onClick={()=> handleCloseSale(1)}>This week</MenuItem>
                        <MenuItem onClick={()=> handleCloseSale(2)}>This month</MenuItem>
                        <MenuItem onClick={()=> handleCloseSale(3)}>All time</MenuItem>
                    </Menu>
                    <Stack alignItems={'center'} paddingBottom={2}>
                        <AttachMoney  sx={{width:50, height: 50}}/>
                        <Typography>{`${salesCount.toFixed(2)}€`}</Typography>
                        <Typography>{`${times[saleTime]} Sales`}</Typography>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item sm={12} md={4} >
                <Paper>
                    <IconButton   onClick={handleClickOrders}>
                        <CalendarMonth/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElOrders}
                        open={openOrdersMenu}
                        onClose={handleCloseOrders}
                    >
                        <MenuItem onClick={()=> handleCloseOrders(4)}>Today</MenuItem>
                        <MenuItem onClick={()=> handleCloseOrders(1)}>This week</MenuItem>
                        <MenuItem onClick={()=> handleCloseOrders(2)}>This month</MenuItem>
                        <MenuItem onClick={()=> handleCloseOrders(3)}>All time</MenuItem>
                    </Menu>
                    <Stack alignItems={'center'} paddingBottom={2}>
                        <LocalShipping sx={{width:50, height: 50}}/>
                        <Typography>{ordersCount}</Typography>
                        <Typography>{`${times[orderTime]} Orders`}</Typography>
                    </Stack>
                </Paper>
            </Grid>
        </>
    )
}

export default TopLabels
