import React from 'react'
import { MenuItem, Menu, Typography} from '@mui/material';




const NavbarMenu = ({handleCloseStoreMenu, anchorElStore, storeid}) => {

    const settings =[
        {
            name: 'Store',
            href: '../store/'+storeid
        },
        {
            name: 'Your Products',
            href: '../storeProducts'
        },
        {
            name: 'Dashboard',
            href: '../dashboard'
        },
        {
            name: 'Orders',
            href: '../storeOrders'
        },
        
    ];

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
                    horizontal: 'right',
                }}
                open={Boolean(anchorElStore)}
                onClose={handleCloseStoreMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.href} onClick={()=>{window.location.href=setting.href; handleCloseStoreMenu()}}>
                    <Typography textAlign="center" >{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default NavbarMenu
