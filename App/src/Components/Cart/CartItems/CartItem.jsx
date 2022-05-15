import React from 'react'
import {Stack, Typography, Box, Button, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemIcon, IconButton, ButtonGroup } from '@mui/material';
import {AddBox, Delete, Favorite, IndeterminateCheckBox, PlusOne} from '@mui/icons-material'

const CartItem = ({CartItem, onRemoveFromCart, onAddToCart, onRemoveQuantity}) => {
	return (
		<ListItem alignItems="center" divider  >
			<ListItemIcon onClick={()=>onRemoveFromCart(CartItem.product_id._id)}>
				<IconButton>
					<Delete  edge="start" color="error" />
				</IconButton>
			</ListItemIcon>
			<ListItemAvatar>
				<Avatar variant="square" src={'http://localhost:8090/'+CartItem.product_id.images[0]}  sx={{ height: 80, width: 80, objectFit: 'cover'}}/>
			</ListItemAvatar>
			<ListItemText 
				primary={CartItem.product_id.title}
				secondary={CartItem.product_id.category}
				sx={{width: 150, paddingLeft: 2}}
			/>
			<ButtonGroup  disableElevation >
				<Button variant="contained" color="info" disabled={CartItem.quantity>1 ? false : true } onClick={()=>onRemoveQuantity(CartItem.product_id._id)}>-</Button>
				<Button disabled>{CartItem.quantity}</Button>
				<Button variant="contained" color="info" onClick={()=>onAddToCart(CartItem.product_id._id)}>+</Button>
			</ButtonGroup>
			
			<ListItemText 
				sx={{ marginLeft: 5}}
				primary={CartItem.product_id.price + " €"}
			/>
	
		</ListItem>
	)
}

export default CartItem
