import { Container, Divider, Typography, Stack, Button, CircularProgress, IconButton, Menu, MenuItem, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, Delete, MoreVert} from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item} from 'devextreme-react/data-grid';
import api from '../../../Services/api';

const pageSizes = [5,10, 25, 50, 100];

const StoreOrders = ({storeid}) => {

    const [storeOrders, setStoreOrders] = useState([]);

    useEffect(()=>{
        if(storeid)
        api.get('store/orders/'+storeid)
        .then(data=>{
            setStoreOrders(data.data.orders)
        })
        .catch(err=>{
            console.log(err)
        })
    },[storeid])

    const NameCell = (e) =>{
        return (
            e.data.first_name + " " + e.data.last_name
        )
    }
    const AddressCell = (e) =>{
        console.log(e.data)
        return (
            e.data.address_1 + ", " + e.data.zip_code + ", " + e.data.country
        )
    }
    const PriceCell = (e) =>{

        var totalPrice = 0;
        e.data.cart.items.map((prod) =>{
            totalPrice += prod.product_id.price * prod.quantity
        })
        return (
            totalPrice+' €'
        )
    }


    if(!storeid) return <CircularProgress></CircularProgress>
    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" padding={2}>
                <Typography variant="h5">Store Orders</Typography>
            </Stack>
            
            <Divider></Divider>
            <Box marginY={1} >
                <DataGrid dataSource={storeOrders} showBorders={true} remoteOperations={true} hoverStateEnabled={true} >
                    
                    <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                    <Selection mode="multiple" showCheckBoxesMode="always"/>
                    <HeaderFilter visible={true} allowSearch={true} />
                    <Column caption="Name" width={200} cellRender={NameCell}/>
                    <Column  caption="Address"  cellRender={AddressCell} width={500} />
                    <Column caption="Price" format="currency"  cellRender={PriceCell}width={150} />
                    
                    <Column dataField="date_created" dataType="date" caption="Date Created" width={'auto'}/>
                    <Column dataField="active"  caption="State" width={150} />
                    <Column caption="Options"   width={'auto'} />
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={5} />
                </DataGrid>
            
            </Box>
        </Container>
    )
}

export default StoreOrders
