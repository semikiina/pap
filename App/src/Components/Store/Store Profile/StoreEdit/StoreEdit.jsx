import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Typography, DialogActions, CircularProgress, DialogTitle, DialogContent, Stack, Divider, TextField, Grid, FormControlLabel, Checkbox,Avatar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../../Services/api';
import { useForm } from "react-hook-form";



const StoreEdit = ({open, handleClose, store, setStore,  setAvatar,setStoreName}) => {

    const {  handleSubmit, register } = useForm();
    const [previewAvatar, setPreviewAvatar] = useState();
    const inputFile = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
    };

    const handleChange = event => {

        var file = event.target.files[0];
        var url =  URL.createObjectURL(file);
        setPreviewAvatar(url)
    }

    const onSubmit = data => {
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
            console.log(data.data)
            setAvatar(data.data.store.store_image)
            setStoreName(data.data.store.store_name)
            handleClose()
        })
        .catch(err=>{
            console.log(err)
        })
    };


    useEffect(()=>{
        setPreviewAvatar("https://tagmeapi.herokuapp.com/"+store.store_image)
        
    },[store])
   
    if (!store) return <CircularProgress/>;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            
            <DialogTitle id="alert-dialog-title">
            <Stack direction="row" justifyContent="space-between" >
                <Typography variant="h6">{"Edit your store"}</Typography>
                <CloseIcon onClick={handleClose}></CloseIcon>
            </Stack>
            </DialogTitle>
            <Divider></Divider>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center" >
                                <Avatar onClick={onButtonClick} sx={{width:200, height:200}} src={previewAvatar} variant="square"/>
                            </Stack>
                            <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{display: 'none'}}/>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic" label="Store name" variant="outlined" defaultValue={store.store_name} {...register('store_name')} fullWidth/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Active" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Store emal" variant="outlined" defaultValue={store.store_email} fullWidth disabled/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                    <Button variant="contained" color="success" fullWidth type="submit">Save Changes</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default StoreEdit
