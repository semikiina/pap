import React, { useEffect, useState } from 'react'
import {CircularProgress, Button, Dialog, DialogActions, DialogContent, Typography,DialogTitle, Rating, TextField, Stack, Box, CardMedia, ListItemText} from '@mui/material'
import api from '../../../Services/api'
import { useForm } from "react-hook-form";
import { DropzoneArea } from 'material-ui-dropzone';

const OrderReview = ({product,open,handleClose,userId, productPrice}) => {

    const [rateValue, setRateValue] = useState(1);
    const [revLen, setRevLen] = useState(0);
    const {  handleSubmit, register , setValue} = useForm();

    const AddReview = (data)=>{
        var formData = new FormData();

        for (var x = 0; x < data.images.length; x++) {
            formData.append("image", data.images[x]);
        }
       
        formData.append("product_id", product._id)
        formData.append("description", data.description)
        formData.append("review", rateValue)
       
        api.post('review',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(data=>{
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
                                product.images && <CardMedia   component="img" sx={{ width: 100, height: 100, paddingRight:2, objectFit: 'cover' }} image={"http://localhost:8090/" + product.images[0]} />
                            }
                            <Box >
                                <ListItemText 
                                    primary={product.title}
                                    secondary={product.category}
                                />
                                <Stack direction="row" justifyContent={'space-between'}>
                                    <Typography>{productPrice} €</Typography>
                                </Stack>
                                
                            </Box>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={'row'} spacing={1}>
                                <Rating
                                    value={rateValue}
                                    onChange={(event, newValue) => {
                                        setRateValue(newValue);

                                    }}
                                /> 
                                <Typography>{rateValue}/5</Typography>
                            </Stack>
                            <Typography>Tell us about the product</Typography>    
                            <textarea style={{height:100, resize: 'none', fontFamily: 'Poppins', padding:15 }} {...register('description')}></textarea> 
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Drag and drop an image here or click here."}
                                onChange={(files) => {setValue('images', files)}}
                                filesLimit={6}
                            />
                        </Stack>
                       
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" variant="outlined" >Cancel</Button>
                    <Button type="submit" autoFocus variant="outlined">Upload Review</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default OrderReview
