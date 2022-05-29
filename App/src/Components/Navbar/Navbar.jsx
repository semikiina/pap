import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, IconButton, Badge, Button, Menu, Typography, Stack, styled, Avatar, Tooltip, Box} from '@mui/material';
import {ShoppingCart, Favorite, Store} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from './Navbar Items/ProfileMenu';
import CartMenu from './Navbar Items/CartMenu';
import useAuth from '../Contexts/useAuth';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = ({onRemoveFromCart, handleDrawerOpen, openDrawer}) => {

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
					{user.store && <IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ ml: 2, ...(openDrawer && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>}
					<Typography variant="h6" color="inherit"  sx={{ ml: 2 , flexGrow: 1 }}>
						<IconButton href="../" disableRipple>
							TagMe!
						</IconButton>
					</Typography>
					<Stack direction="row" spacing={2} sx={{mr:2}}>
						{
							user._id ?
							<>
								<IconButton onClick={handleOpenCartMenu} >
									<Badge badgeContent={user.cart.items.length} color="secondary" >
										<ShoppingCart ></ShoppingCart>
									</Badge> 
								</IconButton>
								<CartMenu  handleCloseCartMenu={handleCloseCartMenu} anchorElCart={anchorElCart} cart={user.cart} onRemoveFromCart={onRemoveFromCart}></CartMenu>
								<Box >
									<Tooltip title="Profile options">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt={user.nickname} src={user.profile_pic && `https://tagmeapi.herokuapp.com/${user.profile_pic}`} />
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
