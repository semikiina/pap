import { Container, Divider, Typography, Stack, Button, CircularProgress, IconButton, Menu, MenuItem, Box } from '@mui/material'
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
        return (
            <>
                <IconButton onClick={handleOpenMenu}>
                    <MoreVert/>
                </IconButton>
                <Menu 
                sx={{ mt: '45px' , boxShadow: 'none' }}
                id="menu-appbar"
                anchorEl={anchorElMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElMenu)}
                onClose={handleCloseMenu}>
                    <MenuItem onClick={()=>{window.location.href="../editProduct/"+e.data._id;handleCloseMenu()}}><Typography textAlign="center" >Edit</Typography></MenuItem>
                    <MenuItem onClick={()=>{RemoveProduct(e.data._id); handleCloseMenu()}}><Typography textAlign="center" >Remove</Typography></MenuItem>
                </Menu>
            </>
        )
    }
    

    const StateCell = (e) =>{
        if(e.data.active)
        return(
            <Button variant="contained" color="success" size="small" onClick={()=>UpdateState(e.data._id)}> Active</Button>
        )
        else
        return(
            <Button variant="contained" color="error" size="small"  onClick={()=>UpdateState(e.data._id)}> Disabled</Button>
        )
    }

    const onSelectionChanged = (e) =>{
        var deleteIDS = [];
        if(!e.selectedRowsData.length || e.selectedRowsData.length==1)
        setRowSelected(false)
        else if(e.selectedRowsData.length>1){
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
             <Box marginY={1} >
                <DataGrid dataSource={products} showBorders={true} remoteOperations={true} hoverStateEnabled={true} onSelectionChanged={onSelectionChanged}>
                    
                    <SearchPanel visible={true} highlightCaseSensitive={true}  width={250}/>
                    <Selection mode="multiple" showCheckBoxesMode="always"/>
                    <HeaderFilter visible={true} allowSearch={true} />
                    <Column dataField="title" caption="Title" width={'auto'} />
                    <Column dataField="price" format="currency" width={150} />
                    <Column dataField="category"  width={200} />
                    <Column dataField="stock"   width={'auto'}/>
                    <Column dataField="date_created" dataType="date" caption="Date Created" width={'auto'}/>
                    <Column dataField="active"  caption="State" width={150} cellRender={StateCell} />
                    <Column caption="Options"   width={'auto'} cellRender={GroupButtons}/>
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={5} />
                </DataGrid>
                
            </Box>
            {
                rowSelected && <Button variant="outlined" color="error" onClick={RemoveManyProducts}>Remove All<Delete></Delete></Button>
            }
        </>
    )
}

export default ProductDataGrid
