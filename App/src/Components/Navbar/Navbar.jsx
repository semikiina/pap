import React, { useState } from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Stack, styled, Avatar, Tooltip, Box} from '@mui/material';
import {ShoppingCart, Favorite, Store} from '@mui/icons-material'
import ProfileMenu from './Navbar Items/ProfileMenu';
import StoreMenu from './Navbar Items/StoreMenu';
import CartMenu from './Navbar Items/CartMenu';

const settings =[
	{
		name: 'Profile',
		href: '../myprofile'
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

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = ({Cart, storeid,onRemoveFromCart}) => {

	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElStore, setAnchorElStore] = useState(null);
	const [anchorElCart, setAnchorElCart] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenStoreMenu = (event) => {
		setAnchorElStore(event.currentTarget);
	};

	const handleCloseStoreMenu = () => {
		setAnchorElStore(null);
	};
	const handleOpenCartMenu = (event) => {
		setAnchorElCart(event.currentTarget);
	};

	const handleCloseCartMenu = () => {
		setAnchorElCart(null);
	};

	return (
		<>
			<AppBar position='fixed' color='inherit' >
				<Toolbar  disableGutters>
					<Typography variant="h6" color="inherit"  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } , flexGrow: 1 }}>
						<IconButton href="/">
							TagMe!
						</IconButton>
					</Typography>
					<Stack direction="row" sx={{ flexGrow: 0, mr:2 }} spacing={2}>
						<IconButton href="/favorite" >
							<Favorite></Favorite>
						</IconButton>
						<IconButton onClick={handleOpenCartMenu} >
							<Badge badgeContent={Cart.items.length} color="secondary" >
								<ShoppingCart ></ShoppingCart>
							</Badge> 
						</IconButton>
						<CartMenu  handleCloseCartMenu={handleCloseCartMenu} anchorElCart={anchorElCart} cart={Cart} onRemoveFromCart={onRemoveFromCart}></CartMenu>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Store options">
								<IconButton onClick={handleOpenStoreMenu} >
									<Store ></Store>
								</IconButton>
							</Tooltip>
							<StoreMenu handleCloseStoreMenu={handleCloseStoreMenu} anchorElStore={anchorElStore} storeid={storeid}/>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Profile options">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<ProfileMenu handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser}/>
						</Box>
					</Stack>
				</Toolbar>
			</AppBar>
			<Offset></Offset>
		</>
	)
}

export default Navbar
