import { Chip,IconButton} from '@mui/material'
import React, { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item, List, ListItem, ListItemButton ,ListItemText , Avatar, ListItemAvatar} from 'devextreme-react/data-grid';
import OrderDetails from './OrderDetails';
import OrderStateUpdate from './OrderStateUpdate';



const pageSizes = [5,10, 25, 50, 100];


const OrdersDataGrid = ({updateOrder, storeOrders}) => {

    const [currentOrder, setCurrentOrder] = useState('');
    const [currentOrderDetails, setCurrentOrderDetails] = useState('');

    const handleOrderState = (order, status) => {

        if(status.toLowerCase() == "payed"){
            setCurrentOrder(order.orderid)
        }
    }
    


    const stateCell = (val) =>{
        var chipColor = "primary";
        if(val.value.toString().toLowerCase() =="payed") chipColor="warning";
        else if(val.value.toString().toLowerCase() =="fulfilled") chipColor="primary";
        else chipColor="error";
        const order = val.row.data;
          
        return (
            <>
                <Chip variant="contained" color={chipColor} size="small" label={val.value} onClick={()=>handleOrderState(val.row.data, val.value)} clickable ={val.value.toString().toLowerCase() =="payed" ? true : false} /> 
                <OrderStateUpdate currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}  cart={order.items} orderid={order.orderid} shippingInformation={order} updateOrder={updateOrder} />
            </>
        )
    }

    const optionCell = (e) =>{
        return (
            <>
                <IconButton  onClick={()=>setCurrentOrderDetails(e.row.data.orderid)} >
                    <KeyboardArrowDown />
                </IconButton>
                <OrderDetails currentOrderDetails={currentOrderDetails} setCurrentOrderDetails={setCurrentOrderDetails}  cart={e.row.data.items} orderid={e.row.data.orderid} shippingInformation={e.row.data} />
            </>
        )
    }

    return (
        <>
            <DataGrid dataSource={storeOrders} showBorders={true} remoteOperations={true} hoverStateEnabled={true}  width={'100%'} >
                <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                <Selection mode="multiple" showCheckBoxesMode="always"/>
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="name" caption="Name" width={200} alignment={'center'}/>
                <Column dataField="address" caption="Address"  width={450} alignment={'center'} />
                <Column dataField="price" caption="Price" format={{style:'currency', currency: 'EUR', useGrouping: true, minimumSignificantDigits: 3 }} width={'auto'} alignment={'center'}/>
                <Column dataField="date_created" dataType="date" caption="Date" width={100} alignment={'center'}/>
                <Column dataField="status"  caption="Status" width={"auto"} cellRender={stateCell} alignment={'center'}/>
                <Column caption="Details"   width={60} cellRender={optionCell} alignment={'center'} />
                <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
            </DataGrid>
        </>
    )
}

export default OrdersDataGrid
