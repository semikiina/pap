import { Chip,IconButton} from '@mui/material'
import React, { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item, TreeList} from 'devextreme-react/data-grid';
import OrderDetails from './OrderDetails';

const pageSizes = [5,10, 25, 50, 100];


const OrdersDataGrid = ({updateOrder, storeOrders}) => {

    const [currentOrder, setCurrentOrder] = useState('');

    
    const stateCell = (val) =>{
        var chipColor = "primary";
        if(val.value.toString().toLowerCase() =="payed") chipColor="success";
        else if(val.value.toString().toLowerCase() =="fulfilled") chipColor="primary";
        else chipColor="error";
          
        return ( <Chip variant="outlined" color={chipColor} size="small" label={val.value}/>)
    }

    const optionCell = (e) =>{
        return (
            <>
                <IconButton  onClick={()=>setCurrentOrder(e.row.data.orderid)}>
                    <KeyboardArrowDown />
                </IconButton>
                <OrderDetails currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}  cart={e.row.data.items} orderid={e.row.data.orderid} shippingInformation={e.row.data} updateOrder={updateOrder} />
            </>
        )
    }

    return (
        <>
            <DataGrid dataSource={storeOrders} showBorders={true} remoteOperations={true} hoverStateEnabled={true}  width={'100%'} >
                <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                <Selection mode="multiple" showCheckBoxesMode="always"/>
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="name" caption="Name" width={'auto'} alignment={'center'}/>
                <Column dataField="address" caption="Address"  width={'auto'} alignment={'center'} />
                <Column dataField="price" caption="Price" format={{style:'currency', currency: 'EUR', useGrouping: true, minimumSignificantDigits: 3 }} width={'auto'} alignment={'center'}/>
                <Column dataField="date_created" dataType="date" caption="Date" width={200} alignment={'center'}/>
                <Column dataField="status"  caption="Status" width={200} cellRender={stateCell} alignment={'center'}/>
                <Column caption="Options"   width={50} cellRender={optionCell} alignment={'center'} />
                <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
            </DataGrid>
        </>
    )
}

export default OrdersDataGrid
