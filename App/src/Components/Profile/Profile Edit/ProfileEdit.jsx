import React, { useEffect, useRef, useState } from 'react'
import {Box, Button, Dialog, Typography, DialogActions, CircularProgress, DialogTitle, DialogContent, Stack, Divider, TextField, Grid, InputAdornment, Checkbox,Avatar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../Services/api';
import { useForm } from 'react-hook-form';
import useAuth from '../../Contexts/useAuth';

const ProfileEdit = ({open, handleClose, setFav, fav}) => {

    const {  handleSubmit, register } = useForm();
    const [previewAvatar, setPreviewAvatar] = useState();
    const [ok, setOk] = useState(true);

    const{user, setUser} = useAuth(); 

    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    const handleChange = event => {
        var file = event.target.files[0];
        var url =  URL.createObjectURL(file);
        setPreviewAvatar(url)
    }

    const updateUser = data =>{
        setOk(true)
        if(data.nickname != user.nickname)
        api.get("user/verifyNickname/"+data.nickname ,)
        .then(data=>{
            setOk(false);
        })
        .catch(err=>{
            console.log(err)
        })

        if(ok){
            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("image", imagefile.files[0]);
            formData.append("first_name", data.first_name)
            formData.append("last_name", data.last_name)
            formData.append("nickname", data.nickname)
            api.post("user/editProfile" , formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            .then(data=>{
                setFav(fav+1)
                handleClose()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }


    useEffect(()=>{
        setPreviewAvatar("http://localhost:8090/"+user.profile_pic)
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
    <form onSubmit={handleSubmit(updateUser)}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center" >
                        <Avatar onClick={onButtonClick} sx={{width:200, height:200}} src={previewAvatar} />
                    </Stack>
                    <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{display: 'none'}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField {...register('first_name')} label="First name" variant="outlined" defaultValue={user.first_name} fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <TextField {...register('last_name')} label="Last name" variant="outlined" defaultValue={user.last_name} fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <TextField  label="Email" variant="outlined" defaultValue={user.email} fullWidth disabled/>
                </Grid>
                <Grid item xs={6}>
                    <TextField {...register('nickname')} label="Username" variant="outlined" defaultValue={user.nickname} fullWidth InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    }}/>
                    <Typography variant="caption" color="error">{!setOk && 'This nickname is anavailable'}</Typography>
                </Grid>
            </Grid>
        </DialogContent>
    
    <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
        <Button type="submit" variant="contained" color="success" fullWidth>Save Changes</Button>
    </DialogActions>
    </form>
</Dialog>
  )
}

export default ProfileEdit
