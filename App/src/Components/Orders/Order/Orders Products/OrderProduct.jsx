import React from 'react'
import { Container, Typography, Divider, Grid, Paper, Box, Stack, CardMedia, Button, CircularProgress, ListItemText, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import OrderReview from '../../Order Review/OrderReview';

const OrderProduct = ({item, status, userId, order}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    if(!order) return <CircularProgress></CircularProgress>
    return (
        <>
            
            <Box padding={2} fullWidth>
                <Stack direction="row" spacing={2} alignItems={'center'}>
                    <ListItemAvatar >
                        <Avatar src={"http://localhost:8090/" + order.product_id?.images[0]} sx={{ width: 80, height: 80}} variant="square"/>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={order.product_id?.title}
                        secondary={`${order.price} €`}
                    />
                    <Typography>Qtt.{order.quantity}</Typography>
                </Stack>
            </Box>
            <Stack alignItems={'center'}>
                {
                    status?.toLowerCase() == "completed" 
                    ? <Button color="secondary"  fullWidth  onClick={handleClickOpen}>Review</Button>
                    : <Typography variant="caption" textAlign={'center'}> After recieve your product you can review them.</Typography>
                }
            </Stack>
            
            <OrderReview open={open} handleClose={handleClose} product={order.product_id} productPrice={order.price} userId={userId}></OrderReview>
        </>
    )
}

export default OrderProduct
