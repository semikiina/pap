import React from 'react'
import {Stack, Box, Button, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemIcon, IconButton, ButtonGroup, Typography, ListItemButton, Tooltip } from '@mui/material';
import {Delete} from '@mui/icons-material'

const CartItem = ({CartItem, onRemoveFromCart, onAddToCart, onRemoveQuantity}) => {

	const totQuantity = CartItem?.product_id?.variants?.prices?.filter((item)=>{ return item.skuid == CartItem.skuid})

	return (
		<>
		<Stack direction="row" alignItems={'center'}>
			<IconButton  onClick={()=>onRemoveFromCart(CartItem.product_id._id, CartItem.skuid)}>
				<Tooltip title="Remove">
					<Delete  edge="start" color="error" />
				</Tooltip>
			</IconButton>
			<ListItemButton alignItems="center" divider disabled={!CartItem.product_id.active} onClick={()=> window.location.href="../products/"+CartItem.product_id._id}>
		
				<ListItemAvatar>
					<Avatar variant="square" src={'http://localhost:8090/'+CartItem.product_id.images[0]}  sx={{ height: 80, width: 80, objectFit: 'cover'}}/>
				</ListItemAvatar>
				<ListItemText 
					primary={CartItem.product_id.title}
					secondary={
						<Stack spacing={1} component={"span"}>
							{CartItem.product_id.category}
							<Typography variant="caption">{CartItem.skuid?.replaceAll("?", ", ")}</Typography>
						</Stack>
					}
					sx={{width: 150, paddingLeft: 2}}
				/>
				<ButtonGroup  disableElevation >
					<Button variant="contained" color="info" disabled={CartItem.quantity>1 ? false : true } onClick={()=>onRemoveQuantity(CartItem.product_id._id, CartItem.skuid)}>-</Button>
					<Button disabled>{CartItem.quantity}</Button>
					<Button variant="contained" color="info" disabled={CartItem.quantity < totQuantity[0].availableQuantity ? false : true } onClick={()=>onAddToCart(CartItem.product_id._id, 1, CartItem.skuid)}>+</Button>
				</ButtonGroup>
				
				<ListItemText 
					sx={{ marginLeft: 5}}
					primary={CartItem.price.toFixed(2) + " €"}
					secondary={`+ ${CartItem.product_id.shipping.toFixed(2)} €`}
				/>
			</ListItemButton>
		</Stack>
		
		{
			!CartItem.product_id.active && <Typography variant="subtitle2" color="error" textAlign={'center'}>This product isn't available now.</Typography>
		}
		</>
	)
}

export default CartItem
