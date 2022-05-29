import React, { useEffect, useRef, useState } from 'react'
import { Button, Paper, Typography, Container, CircularProgress, DialogTitle, DialogContent, Stack, Divider, TextField, Grid, FormControlLabel, Checkbox,Avatar, IconButton, Box, Collapse, Alert} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import api from '../../../Services/api';
import useAuth from '../../Contexts/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    store_name: yup.string().min(8, 'Store Name must be at least 8 characters ').required( ' Store Name is a required field'),
  }).required();


const StoreSettings = ({update, setUpdate}) => {

    const {storeA} = useAuth();

    const [defStore, setDefStore] = useState({
        store_email : "",
        store_name : "",
        store_image: ""
    });

    const [open, setOpen] = useState(false)

    const {  handleSubmit, register, formState:{errors}, setValue } = useForm({
        resolver : yupResolver(schema)
    });


    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    const handleChange = event => {

        var file = event.target.files[0];
        var url =  URL.createObjectURL(file);
        setDefStore({...defStore, store_image : url})
    }

    const onSubmit = data => {
        if(data.store_name != storeA.store_name || data.store_image != defStore.store_image)
        {
            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("image", imagefile.files[0]);
            formData.append("store_name",data.store_name);
            api.post("store/editStore", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
            })
            .then(data=>{
                setOpen(true)
                setUpdate(update+1)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    };

    useEffect(()=>{
        if(storeA){
            setDefStore({...defStore, store_image : "https://tagmeapi.herokuapp.com/"+storeA.store_image , store_name : storeA.store_name, store_email: storeA.store_email})
            setValue('store_name', storeA.store_name)
        }
        
    },[storeA.store_email])

    return (
        <Container>
            <Box marginBottom={3}>
                <Paper >
                    <Typography padding={2} variant="h6">Store Settings</Typography>
                    <Divider/>
                    <Collapse in={open}>
                        <Alert severity='success' action={<IconButton onClick={()=> setOpen(false)}><CloseIcon/></IconButton>} >Your store was updated sucessfully.</Alert>
                    </Collapse>
                    <Box padding={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2} justifyContent="center" alignItems={'center'}>
                                <IconButton>
                                    <Avatar onClick={onButtonClick} sx={{width:200, height:200}} src={defStore.store_image} variant="square"/>
                                </IconButton>
                                <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{display: 'none'}}/>
                                <TextField label="Store email"{...register('store_email')}  variant="outlined" value={defStore.store_email} fullWidth disabled/>
                                <TextField label="Store Name" {...register('store_name')}  variant="outlined" value={defStore.store_name} onChange={(e) => setDefStore({...defStore , store_name : e.target.value})}  fullWidth />
                                <Typography variant="caption" color="error">{errors.store_name?.message}</Typography>
                                <Button variant="contained" color="success" fullWidth type="submit">Save Changes</Button>
                            </Stack>
                        </form>
                    </Box>
                </Paper>  
            </Box>  
        </Container>
    )
}

export default StoreSettings
