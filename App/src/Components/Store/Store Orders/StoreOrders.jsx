import { Container, Divider, Typography, Stack, Chip, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, List, DialogActions, Button, Avatar, Box, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, Delete, KeyboardArrowDown, MoreVert} from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item} from 'devextreme-react/data-grid';
import api from '../../../Services/api';

const pageSizes = [5,10, 25, 50, 100];

const StoreOrders = ({storeid}) => {

    const [storeOrders, setStoreOrders] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


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

    const stateCell = (val) =>{
        console.log(val.value)
        var chipColor = "primary";
        if(val.value =="payed") chipColor="success";
        else if(val.value =="Fulfilled") chipColor="primary";
        else chipColor="error";
          
        return ( <Chip variant="outlined" color={chipColor} size="small" label={val.value}/>)
    }

    const optionCell = (e) =>{
        return (
            <>
            <IconButton  onClick={handleClickOpen}>
                <KeyboardArrowDown />
            </IconButton>
            <DialogNew cart={e.row.data.cart} orderid={e.row.data._id} shippingInformation={e.row.data}/>
            </>
        )
    }

    
    const updateOrder = (ordid) =>{
        api.post('store/updateOrderState/'+ ordid,{state : 'Fulfilled'})
        .then(data =>{
            console.log(data)
            window.location.reload();
        })
        .catch( err =>{
            console.log(err)
        })
    }


    const DialogNew = ({cart, orderid, shippingInformation}) => {
        console.log(shippingInformation)
        return   <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                <Stack>
                    <Typography variant="title">Order Summary</Typography>
                    <Typography variant="caption">{orderid}</Typography>
                </Stack>
               
            </DialogTitle>
            <Divider></Divider>
            <DialogContent>

                <Typography variant="subtitle2">Shipping Information</Typography>
                <Typography>{shippingInformation.name}</Typography>
                <Typography>{shippingInformation.address}</Typography>
                <Typography>{shippingInformation.price}</Typography>


                <Typography variant="subtitle2">Items</Typography>
                <List>
                    {
                       cart?.items.map( item => {
                           return <ListItem>
                               <ListItemAvatar >
                                    <Avatar variant="square" src={"http://localhost:8090/"+item?.product_id.images[0]}></Avatar>
                               </ListItemAvatar>
                               <ListItemText primary={item.product_id.title} secondary={"Qtt."+ item.quantity}></ListItemText>
                           </ListItem>
                       }) 
                    }
                </List>
                

                <Box  textAlign={'center'}>
                    <Typography variant="caption">After you click <b>'ORDER FULFILLED'</b> , the order state will be updated.</Typography>
                </Box>
                </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="error" >Cancel</Button>
            <Button onClick={() =>{updateOrder(orderid); handleClose()}} color="success">Order Fulfilled</Button>
            </DialogActions>
        </Dialog>
    }


    if(!storeid) return <CircularProgress></CircularProgress>
    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" padding={2}>
                <Typography variant="h5">Store Orders</Typography>
            </Stack>
            
            <Divider></Divider>
            <DataGrid dataSource={storeOrders} showBorders={true} remoteOperations={true} hoverStateEnabled={true}  width={'100%'} >
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
