import React, { useState } from 'react'
import {CircularProgress, Button, Dialog, DialogActions, DialogContent, Typography,DialogTitle, Rating, TextField, Stack, Box, CardMedia} from '@mui/material'
import api from '../../../Services/api'
import { useForm } from "react-hook-form";

const OrderReview = ({product,open,handleClose,userId}) => {

    const [rateValue, setRateValue] = useState(0);
    const {  handleSubmit, register } = useForm();

    const AddReview = (data)=>{
        api.post('review',{
            user_id: userId,
            product_id:  product._id,
            description: data.description,
            review : rateValue
        })
        .then(({data})=>{
            window.location.href="./products/"+product._id
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        > 
            <form onSubmit={handleSubmit(AddReview)}>
                <DialogTitle >
                {"Share your opinion with us!"}
                </DialogTitle>
                <DialogContent sx={{width:500}}>
                
                        <Stack direction="row" marginBottom={2} >
                            {
                                product.images && <CardMedia   component="img" sx={{ width: 100, height: 100, paddingRight:2, objectFit: 'cover' }} image={"https://tagmeapi.herokuapp.com/" + product.images[0]} />
                            }
                            <Box >
                                <Typography >{product.title}</Typography>
                                <Typography variant="caption" color="inherit">{product.category}</Typography>
                                <Stack direction="row" justifyContent={'space-between'}>
                                    <Typography>{product.price} €</Typography>
                                </Stack>
                                
                            </Box>
                        </Stack>
                        <Stack spacing={3}>
                            <textarea style={{height:200, resize: 'none', fontFamily: 'Poppins', padding:15 }} {...register('description')}></textarea>
                            <Rating
                                value={rateValue}
                                onChange={(event, newValue) => {
                                    setRateValue(newValue);
                                }}
                            />
                        </Stack>
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" autoFocus>Upload Review</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default OrderReview
