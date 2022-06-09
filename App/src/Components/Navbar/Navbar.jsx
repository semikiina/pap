import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, IconButton, Badge, Button, Menu, Typography, Stack, styled, Avatar, Tooltip, Box} from '@mui/material';
import {ShoppingCart, Favorite, Store, NotificationAdd, Notifications} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from './Navbar Items/ProfileMenu';
import CartMenu from './Navbar Items/CartMenu';
import useAuth from '../Contexts/useAuth';
import NotificationMenu from './Navbar Items/NotificationMenu';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	icons: {
	  color: '#283618',
	},
	appTitle:{
		color:"#fff",
		textShadow:"3px 3px 5px #fefae0"
	}
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = ({onRemoveFromCart, handleDrawerOpen, openDrawer, notCount , nots, handleClearNotifications, onAddToCart, onRemoveQuantity, userRole}) => {

	const classes = useStyles();


	const {user} = useAuth();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElStore, setAnchorElStore] = useState(null);
	const [anchorElCart, setAnchorElCart] = useState(null);
	const [anchorElNotification, setAnchorElNotification] = useState(null);

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


	const handleOpenNotificationMenu = (event) => {
		setAnchorElNotification(event.currentTarget);
	};

	const handleCloseNotificationMenu = () => {
		handleClearNotifications();
		setAnchorElNotification(null);
	};

	return (
		<>
			<AppBar position='fixed' color='primary' >
				<Toolbar  disableGutters>
					{user.store?.length 
						? <IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ ml: 2, ...(openDrawer && { display: 'none' }) }}
						>
							<MenuIcon className={classes.icons} />
						</IconButton>
						: null
					}
					{
						(user._id && !user.store?.length) && <Button sx={{ ml: 2}} variant="outlined" href="./newStore">new Store</Button>
					}

					<Typography variant="h6" color="inherit"  sx={{ ml: 2 , flexGrow: 1 }}>
						<IconButton href="../" disableRipple > 
							<Typography variant="h5" className={classes.appTitle} >TagMe! </Typography>
						</IconButton>
					</Typography>
					<Stack direction="row" spacing={2} sx={{mr:2}}>
						{
							user._id ?
							<>
							{
								userRole<3 &&
								<IconButton onClick={handleOpenNotificationMenu} >
									<Badge badgeContent={notCount} color="warning" >
										<Notifications shadow={1} className={classes.icons}/>
									</Badge> 
								</IconButton>
							}
								
								<NotificationMenu handleCloseNotificationMenu={handleCloseNotificationMenu} anchorElNotification={anchorElNotification} nots={nots} />
								<IconButton onClick={handleOpenCartMenu} >
									<Badge badgeContent={user.cart.items.length} color="secondary" >
										<ShoppingCart className={classes.icons}></ShoppingCart>
									</Badge> 
								</IconButton>
								<CartMenu  handleCloseCartMenu={handleCloseCartMenu} anchorElCart={anchorElCart} cart={user.cart} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} onRemoveQuantity={onRemoveQuantity} ></CartMenu>
								<Box >
									<Tooltip title="Profile options">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt={user.nickname} src={user.profile_pic && `http://localhost:8090/${user.profile_pic}`} />
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
