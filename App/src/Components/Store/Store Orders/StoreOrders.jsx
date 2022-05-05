import { Container, Divider, Typography, Stack, Chip, CircularProgress, IconButton, Menu, MenuItem, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, Delete, KeyboardArrowDown, MoreVert} from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item} from 'devextreme-react/data-grid';
import api from '../../../Services/api';

const pageSizes = [5,10, 25, 50, 100];

const StoreOrders = ({storeid}) => {

    const [storeOrders, setStoreOrders] = useState([]);

    useEffect(()=>{
        if(storeid)
        api.get('store/orders/'+storeid)
        .then(data=>{
            console.log(data.data.orders)
            setStoreOrders(data.data.orders)
        })
        .catch(err=>{
            console.log(err)
        })
    },[storeid])

    const stateCell = (val) =>{
        if(val.value="Payed") return ( <Chip variant="outlined" color="success" size="small" label={val.value}/>)
        else  return ( <Chip variant="outlined" color="error" size="small" label={val.value}/>)
    }

    const optionCell = (val) =>{
        return (
            <IconButton>
                <KeyboardArrowDown/>
            </IconButton>
        )
    }

    if(!storeid) return <CircularProgress></CircularProgress>
    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" padding={2}>
                <Typography variant="h5">Store Orders</Typography>
            </Stack>
            
            <Divider></Divider>
            <DataGrid dataSource={storeOrders} showBorders={true} remoteOperations={true} hoverStateEnabled={true}   width={'100%'}>
                <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                <Selection mode="multiple" showCheckBoxesMode="always"/>
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="name" caption="Name" width={'auto'} />
                <Column dataField="address" caption="Address"  width={'auto'} />
                <Column dataField="price" caption="Price" format={{style:'currency', currency: 'EUR', useGrouping: true, minimumSignificantDigits: 3 }} width={'auto'} alignment={'center'}/>
                <Column dataField="date_created" dataType="date" caption="Date" width={200} alignment={'center'}/>
                <Column dataField="state"  caption="Status" width={200} cellRender={stateCell} alignment={'center'}/>
                <Column caption="Options"   width={50} cellRender={optionCell} alignment={'center'} />
                <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
            </DataGrid>
        
        </Container>
    )
}

export default StoreOrders
