import React, { useEffect, useRef, useState } from 'react'
import {Box, Button, Dialog, Typography, DialogActions, CircularProgress, DialogTitle, DialogContent, Stack, Divider, TextField, Grid, InputAdornment, Checkbox,Avatar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../Services/api';

const ProfileEdit = ({open, handleClose, user, setUser,  setAvatar}) => {

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

    const updateUser = ()=>{
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);
        formData.append("store_name", "Not Mikinhas Store")
        api.post("user/editUser/"+ user._id , formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(data=>{
            setUser(data.user)
            setAvatar(data.user.profile_pic)
            handleClose()
        })
        .catch(err=>{

        })
    }
    useEffect(()=>{
        setPreviewAvatar(user.profile_pic)
    },[user])


  return (
    <Dialog
    open={open}
    onClose={handleClose}
>
    
    <DialogTitle id="alert-dialog-title">
    <Stack direction="row" justifyContent="space-between" >
        <Typography variant="h6">{"Edit your profile"}</Typography>
        <CloseIcon onClick={handleClose}></CloseIcon>
    </Stack>
    </DialogTitle>
    <Divider></Divider>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" >
                    <Avatar onClick={onButtonClick} sx={{width:200, height:200}} src={previewAvatar} />
                </Stack>
                <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{display: 'none'}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="First name" variant="outlined" defaultValue={user.first_name} fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="Last name" variant="outlined" defaultValue={user.last_name} fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={user.email} fullWidth disabled/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="Username" variant="outlined" defaultValue={user.nickname} fullWidth InputProps={{
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}/>
            </Grid>
        </Grid>
        
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
        <Button onClick={updateUser} variant="contained" color="success" fullWidth>Save Changes</Button>
    </DialogActions>
</Dialog>
  )
}

export default ProfileEdit
