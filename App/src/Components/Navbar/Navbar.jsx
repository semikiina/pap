import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Icon, styled, CircularProgress} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material'


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = ({Cart}) => {
	return (
		<>
			<AppBar position='fixed' color='inherit'>
				<Toolbar>
					<Typography variant="h6" color="inherit">
						<IconButton href="/">
							TagMe!
						</IconButton>
					</Typography>
					<div />
					<div>
						<IconButton href="/cart">
							<Badge badgeContent={Cart.items.length} color="secondary">
								<ShoppingCart ></ShoppingCart>
							</Badge> 
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Offset></Offset>
		</>
	)
}

export default Navbar
