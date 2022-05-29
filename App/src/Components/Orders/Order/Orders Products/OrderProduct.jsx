import React from 'react'
import { Container, Typography, Divider, Grid, Paper, Box, Stack, CardMedia, Button, CircularProgress } from '@mui/material'
import OrderReview from '../../Order Review/OrderReview';

const OrderProduct = ({item, quantity, userId}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    if(!item) return <CircularProgress></CircularProgress>
    return (
        <>
            <Divider></Divider>
            <Box padding={2} fullWidth>
                <Stack direction="row" marginBottom={2}>
                    {
                        item.images && <CardMedia   component="img" sx={{ width: 100, height: 100, paddingX: 2, objectFit: 'cover' }} image={"https://tagmeapi.herokuapp.com/" + item.images[0]} />
                    }
                    <Box >
                        <Typography >{item.title}</Typography>
                        <Typography variant="caption" color="inherit">{item.category}</Typography>
                        <Stack direction="row" justifyContent={'space-between'}>
                            <Typography>{item.price} €</Typography>
                            <Typography>Qtt.{quantity}</Typography>
                        </Stack>
                        
                    </Box>
                </Stack>
                <Button color="secondary"  fullWidth  onClick={handleClickOpen}>Review</Button>
            </Box>
            <OrderReview open={open} handleClose={handleClose} product={item} userId={userId}></OrderReview>
        </>
    )
}

export default OrderProduct
