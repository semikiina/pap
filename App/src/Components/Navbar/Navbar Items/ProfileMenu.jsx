import React from 'react'
import { MenuItem, Menu, Typography} from '@mui/material';


const settings =[
	{
		name: 'Profile',
		href: '../profile'
	},
	{
		name: 'Account',
		href: '../account'
	},
	{
		name: 'Dashboard',
		href: '../dashboard'
	},
	{
		name: 'Logout',
		href: '../'
	},
	
];

const NavbarMenu = ({handleCloseUserMenu, anchorElUser}) => {

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
                {settings.map((setting) => (
                    <MenuItem key={setting.href} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>{window.location.href=setting.href}}>{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default NavbarMenu
