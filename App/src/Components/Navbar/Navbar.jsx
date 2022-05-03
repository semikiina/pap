import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, IconButton, Badge, Button, Menu, Typography, Stack, styled, Avatar, Tooltip, Box} from '@mui/material';
import {ShoppingCart, Favorite, Store} from '@mui/icons-material'
import ProfileMenu from './Navbar Items/ProfileMenu';
import StoreMenu from './Navbar Items/StoreMenu';
import CartMenu from './Navbar Items/CartMenu';
import useAuth from '../Contexts/useAuth';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = ({onRemoveFromCart}) => {

	const {user} = useAuth();
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
						{
							user._id ?
							<>
								<IconButton href="/favorite" >
									<Favorite></Favorite>
								</IconButton>
								<IconButton onClick={handleOpenCartMenu} >
									<Badge badgeContent={user.cart.items.length} color="secondary" >
										<ShoppingCart ></ShoppingCart>
									</Badge> 
								</IconButton>
								<CartMenu  handleCloseCartMenu={handleCloseCartMenu} anchorElCart={anchorElCart} cart={user.cart} onRemoveFromCart={onRemoveFromCart}></CartMenu>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Store options">
										<IconButton onClick={handleOpenStoreMenu} >
											<Store ></Store>
										</IconButton>
									</Tooltip>
									<StoreMenu handleCloseStoreMenu={handleCloseStoreMenu} anchorElStore={anchorElStore} storeid={user.store[0]._id}/>
								</Box>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Profile options">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt={user.nickname} src={'http://localhost:8090/'+user.profile_pic} />
										</IconButton>
									</Tooltip>
									<ProfileMenu handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser}/>
								</Box>
							</>
							: <Button onClick={()=>{window.location.href="../login"}} variant="outlined" color="secondary">Login</Button>
						}
						
					</Stack>
				</Toolbar>
			</AppBar>
			<Offset></Offset>
		</>
	)
}

export default Navbar
