import React from 'react'
import {Stack, Typography, Box, Button, CircularProgress, Skeleton } from '@mui/material';

const CartItem = ({CartItem, onRemoveFromCart}) => {
	return (
			<Stack direction="row" marginBottom={3} border={'1px solid grey'}>
				<img src={'http://localhost:8090/'+CartItem.product_id.images[0]} height={150}/>
				<Box padding={1} alignItems={'flex-end'}>
					<Typography variant="h5" >{CartItem.product_id.title}</Typography>
					<Box >
						<Typography   variant="h6">{CartItem.product_id.price} €</Typography>
						<Typography   variant="h6"> Qtt. {CartItem.quantity}</Typography>
					</Box>
					<Button variant="outlined" color="error" onClick={()=> {onRemoveFromCart(CartItem.product_id._id)}}>Remove</Button>
				</Box>
			</Stack>
	)
}

export default CartItem
