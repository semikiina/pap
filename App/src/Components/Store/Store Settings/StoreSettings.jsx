import React, { useEffect, useRef, useState } from 'react'
import { Button, Paper, Typography, Container, Stack, Divider, TextField,  FormControlLabel, Avatar, IconButton, Box, Collapse, Alert, Switch, ListItemText, List, ListItem, ListItemButton, ListItemAvatar, Tooltip, Select, MenuItem} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import api from '../../../Services/api';
import useAuth from '../../Contexts/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AddCircleOutline, Close, Edit, PersonRemoveOutlined } from '@mui/icons-material';
import SearchUsers from './Components/SearchUsers';
import Swal from 'sweetalert2'

const schema = yup.object({
    store_name: yup.string().min(8, 'Store Name must be at least 8 characters ').required( ' Store Name is a required field'),
  }).required();


const StoreSettings = ({update, setUpdate}) => {

    const {storeA, user} = useAuth();

    const [defStore, setDefStore] = useState({
        store_email : "",
        store_name : "",
        store_image: "",
        active : false,
    });

    const [open, setOpen] = useState(false)
    

    const {  handleSubmit, register, formState:{errors}, setValue , watch} = useForm({
        resolver : yupResolver(schema)
    });

    const [sUser, setSUser] = useState(false)

    const handleClickOpenSUser = () => {
        setSUser(true);
    };

    const handleCloseSUser = () => {
        setSUser(false);
    };


    var Active = watch('active');

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
            formData.append("active",data.active);
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

    const [emails, setEmails] = useState([]);
    const [userRole, setUserRole] = useState();

    useEffect(()=>{
        if(storeA){
            setDefStore({...defStore, store_image : "http://localhost:8090/"+storeA.store_image , store_name : storeA.store_name, store_email: storeA.store_email, active : storeA.active})
            setValue('store_name', storeA.store_name)
            setValue("active", storeA.active) 

            var collabEmails = [];
            storeA.collaborators?.forEach((collab) =>collabEmails.push(collab.user_id.email) )
            setEmails(collabEmails)
            setUserRole(storeA.collaborators?.find((collab)=> collab.user_id._id == user._id)?.role)
        }
        
    },[storeA.store_email])

    const removeCollaborator = (id) => {
        Swal.fire({
            title: 'Wait!',
            text: 'Do you really want to remove a collaborator?',
            icon: 'warning',
            confirmButtonText: 'Confirm'
          })
        .then(result => {
            if (result.isConfirmed) {
                api.delete('store/removeCollaborator/'+id)
                .then(data => {
                    setUpdate(update+1)
                })
                .catch( err => {
                    console.log(err)
                })
            }
        })
        .catch( err => {
            console.log(err)
        })

        
    }

    const editCollaborator = (role, id) => {
        api.post('store/editCollaborator/'+id, {role : role})
            .then(data => {
                setUpdate(update+1)
            })
            .catch( err => {
                console.log(err)
            })
    }

    const removeStore = (storeid) => {
        
        api.delete('user/removeStore/'+storeid)
            .then(data => {
                window.localStorage.removeItem('SAuthorization');
                window.location.href="../";
            })
            .catch( err => {
                console.log(err)
            })
    }

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
                                <IconButton  onClick={onButtonClick} disableRipple>
                                    <Avatar sx={{width:200, height:200}} src={defStore.store_image} variant="square"/>
                                </IconButton>
                            </Stack>
                            <Stack spacing={2}>
                                <input type='file' id='file' ref={inputFile} onChange={handleChange} style={{display: 'none'}}/>
                                <TextField label="Store email"{...register('store_email')}  variant="outlined" value={defStore.store_email} fullWidth disabled/> 
                                <TextField label="Store Name" {...register('store_name')}  variant="outlined" value={defStore.store_name} onChange={(e) => setDefStore({...defStore , store_name : e.target.value})}  fullWidth />
                                <Typography variant="caption" color="error">{errors.store_name?.message}</Typography>
                                <FormControlLabel control={<Switch {...register('active')} checked={defStore.active} onChange={(e) => {setDefStore({...defStore , active : e.target.checked}); setValue("active", e.target.checked) }} />} label={Active ? <ListItemText primary="Public Store" secondary={`Your store will appear to everyone, including to featured pages.`} />: <ListItemText primary="Private Store" secondary={`Your store won't appear to the community.`} />} />
                                <Button variant="contained" color="success" fullWidth type="submit">Save Changes</Button>
                           
                            </Stack>
                            
                        </form>
                    </Box>
                </Paper>  
            </Box> 
            <Box marginBottom={3}>
                <Paper >
                    <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                        <Typography padding={2} variant="h6">Store Collaborators</Typography>
                        {
                            userRole < 3 &&
                            <IconButton size="large" onClick={handleClickOpenSUser}>
                                <Tooltip title="Invite">
                                    <AddCircleOutline size="large" />
                                </Tooltip>
                            </IconButton>
                        }
                    </Stack>
                    <Divider/>
                    <Box padding={4}>
                        <List>
                           {
                                storeA.collaborators?.map((colab) => {
                                    if(colab.user_id?._id == userRole) console.log('its me')
                                   if(colab.active)
                                   return(
                                    <ListItem
                                        key={colab.user_id._id}
                                        secondaryAction={
                                            colab.user_id._id == user._id 
                                            ?   <Typography>(You)</Typography>
                                            :   <Stack direction="row" spacing={1}>
                                                {
                                                    userRole < colab.role &&
                                                    <>
                                                        <Select defaultValue={colab.role} onChange={(e) => editCollaborator(e.target.value, colab.user_id._id)} >
                                                            <MenuItem value={2}>Administrator</MenuItem>
                                                            <MenuItem value={3}>Editor</MenuItem>
                                                        </Select>
                                                        <IconButton onClick={() => removeCollaborator(colab.user_id._id)} >
                                                            <Tooltip title="Remove" >
                                                                <PersonRemoveOutlined color="error" />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </>
                                                }
                                                   
                                                </Stack>

                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar  src={`http://localhost:8090/${colab.user_id.profile_pic}`} />
                                        </ListItemAvatar>
                                            <ListItemText  primary={`${colab.user_id.first_name} ${colab.user_id.last_name} (${colab.role_label})`} secondary={colab.user_id.email} />
                                        </ListItemButton>
                                    </ListItem>
                                   )
                               })
                           }
                        </List>
                    </Box>
                    {
                        userRole > 1 &&
                        <Box padding={3}>
                            <Button color="error" fullWidth variant="contained" onClick={()=> removeStore(storeA._id)} >Logout</Button>
                        </Box>
                    }
                   
                </Paper>  
            </Box>  
            <SearchUsers handleClose={handleCloseSUser} open={sUser} emails={emails} />
        </Container>
    )
}

export default StoreSettings
