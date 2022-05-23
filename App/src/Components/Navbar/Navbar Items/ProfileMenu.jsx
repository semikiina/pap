import React from 'react'
import { MenuItem, Menu, Typography, ListItemIcon, Button} from '@mui/material';
import useAuth from '../../Contexts/useAuth';
import {Person, ManageAccounts, LocalShipping, Logout, Favorite} from '@mui/icons-material';

const NavbarMenu = ({handleCloseUserMenu, anchorElUser}) => {

    const {user} = useAuth()
    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem >
                    <Typography textAlign="center" >Welcome, <b>@{user.nickname}</b></Typography>
                </MenuItem>
                <MenuItem onClick={()=>{window.location.href='../profile'}}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" >Profile</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{window.location.href='../favorite'}}>
                    <ListItemIcon>
                        <Favorite fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" >Favorites</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{window.location.href='../orders'}}>
                    <ListItemIcon>
                        <LocalShipping fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center" >Orders</Typography>
                </MenuItem>
                <MenuItem >
                    <Button color="error" variant="contained" onClick={()=>{localStorage.clear() ;window.location.href='../'}} startIcon={<Logout size="small"/>} fullWidth>Logout</Button>
                </MenuItem>
            </Menu>
        </>
    )
}

export default NavbarMenu
