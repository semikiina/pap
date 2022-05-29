import React, { useEffect, useState } from 'react'
import { MenuItem, Menu, Typography, ListItemIcon, Divider, Avatar} from '@mui/material';
import { Inventory, LocalShipping, Store, Sync } from '@mui/icons-material';
import api from '../../../Services/api';



const NavbarMenu = ({handleCloseStoreMenu, anchorElStore, storeid}) => {

    const [store, setStore] = useState({});

    useEffect(()=>{
        api.get('store/'+storeid)
        .then(data=>{
            setStore({
                store_name: data.data.store_name,
                store_image :  data.data.store_image
            })
        })
        .catch(err => {
            console.log(err)
        })

    },[])

    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElStore}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorElStore)}
                onClose={handleCloseStoreMenu}
            >
                <MenuItem onClick={handleCloseStoreMenu}>
                    <ListItemIcon>
                        <Avatar src={'https://tagmeapi.herokuapp.com/'+store?.store_image} sx={{width: 30, height: 30}}/>
                    </ListItemIcon>
                    <Typography Store textAlign="center" >{store.store_name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseStoreMenu}>
                    <ListItemIcon>
                        <Store fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" onClick={()=>{window.location.href='../profile'}}>Store</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseStoreMenu}>
                    <ListItemIcon>
                        <Inventory fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" onClick={()=>{window.location.href='../account'}}>Products</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseStoreMenu}>
                    <ListItemIcon>
                        <LocalShipping fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" onClick={()=>{window.location.href='../orders'}}>Store Orders</Typography>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleCloseStoreMenu}>
                    <ListItemIcon>
                        <Sync fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" onClick={()=>{window.location.href='../orders'}}>Change Store</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default NavbarMenu
