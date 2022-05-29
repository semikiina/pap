import { Container, Divider, Typography, Stack, Button, CircularProgress, IconButton, Menu, MenuItem, Box, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Add, Delete, MoreVert} from '@mui/icons-material';
import {Column,DataGrid,FilterRow, Paging, Pager,Selection,SearchPanel, HeaderFilter,Item} from 'devextreme-react/data-grid';
import EditProduct from '../EditProduct';
import api from '../../../../Services/api';

const pageSizes = [5,10, 25, 50, 100];

const ProductDataGrid = ({products, update, setUpdate}) => {

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [productsToDelete, setProductsToDelete] = useState([])
    const [rowSelected, setRowSelected] = useState(false);

    const handleOpenMenu = (event) => {
		setAnchorElMenu(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorElMenu(null);
	};

    const RemoveProduct = (id)=>{
        api.delete('product/'+id)
        .then(data=>{
            setUpdate(update+1);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const RemoveManyProducts = ()=>{
        api.delete('product/deleteMany',{data:{d:productsToDelete} })
        .then(data=>{
            setUpdate(update+1);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const UpdateState =(id)=>{
        api.post('product/updateState/'+id)
        .then(data=>{
            setUpdate(update+1);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    const GroupButtons = (e) =>{
        return (<Button onClick={()=>{window.location.href="../editProduct/"+e.data._id;handleCloseMenu()}}> Edit </Button>)
    }
    

    const StateCell = (e) =>{
        return(<Chip variant="contained" color={e.data.active ? "success" : ""}  size="small" label={e.data.active ? "Active" : "Draft"} onClick={()=>UpdateState(e.data._id)}/>)
    }

    const onSelectionChanged = (e) =>{
        var deleteIDS = [];
        if(!e.selectedRowsData.length)
        setRowSelected(false)
        else if(e.selectedRowsData.length>=1){
            setRowSelected(true)
            e.selectedRowsData.map(item=>{
                deleteIDS.push(item._id)
            })
        }
        setProductsToDelete(deleteIDS)
    }


    if(!products) return null;
    return (
        <>
            
                <DataGrid dataSource={products} showBorders={true} remoteOperations={true} hoverStateEnabled={true} onSelectionChanged={onSelectionChanged}  width={'100%'}>
                    
                    <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                    <Selection mode="multiple" showCheckBoxesMode="always"/>
                    <HeaderFilter visible={true} allowSearch={true} />
                    <Column dataField="title" caption="Title" width={350} alignment={'center'}/>
                    <Column dataField="category"  width={200} alignment={'center'} />
                    <Column dataField="basePrice" format={{ style: "currency", currency: "EUR", useGrouping: true} } width={150} alignment={'center'}/>
                    <Column dataField="date_created" dataType="date" caption="Date Created" width={'auto'} alignment={'center'}/>
                    <Column dataField="active"  caption="State" width={150} cellRender={StateCell} alignment={'center'} />
                    <Column caption="Options"   width={50} cellRender={GroupButtons} alignment={'center'}/>
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={5} />
                </DataGrid>
                
            {
                rowSelected && <Button variant="outlined" color="error" onClick={RemoveManyProducts}>{productsToDelete.length>1 ? `Remove ${productsToDelete.length} products` : `Remove 1 product` }<Delete></Delete></Button>
            }
        </>
    )
}

export default ProductDataGrid
