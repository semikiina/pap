import { CircularProgress, Container, Typography, Stack, Paper, Divider, Box, TextField, Grid, Button, Autocomplete, Avatar , ListItem, List, ListItemText} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileEdit from './Profile Edit/ProfileEdit';
import useAuth from '../Contexts/useAuth';
import api from '../../Services/api';
import NewAddress from './Profile Address/New Address/NewAddress';
import Addresses from './Profile Address/Addresses';

const Profile = ({setFav,fav}) => {

    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(false);
   
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const DeleteAddress = (id) => {
        console.log(id)
        api.delete('user/deleteAddress/'+id)
        .then( data =>{
            
            setFav(fav+1)
        })
        .catch( err=>{
            console.log(err)
        })
    }

    if(!user) return <CircularProgress/>
    return (
        <>
            <Container>
                <Grid container spacing={4}>
                    <Grid item sm={12} md={5} lg={3} >
                        <Paper >
                            <Stack justifyContent={'center'} alignItems={'center'} padding={2} spacing={2}>
                                <Typography >Welcome back, {user.first_name}</Typography>
                                <Avatar  alt={user.nickname} src={'http://localhost:8090/'+user.profile_pic} sx={{ width: 200, height: 200 }}></Avatar>
                                <Button  variant="outlined" color="secondary" onClick={handleOpen} >Edit Profile</Button>
                            </Stack>
                        </Paper>
                    </Grid>
                   
                    <Grid item sm={12} md={7} lg={9} >
                        <Paper>
                            <Typography padding={2} variant="h6">Your shipping informations</Typography>
                            <Divider></Divider>
                            
                            <Box paddingLeft={2} paddingTop={2}>
                                <Button onClick={()=>setAddress(true)} variant="outlined" >Add a shipping info</Button>
                            </Box>
                            {
                                user.addresses?.length 
                                ? <Addresses DeleteAddress={DeleteAddress}/>
                                :   <Stack padding={2} textAlign="center" marginBottom={3}>
                                        <Typography variant="subtitle1" >You don't have any addresses saved!</Typography>
                                        <Typography variant="caption" >Let's start by adding an address!</Typography>
                                    </Stack>
                            }
                            {
                                address && <NewAddress setFav={setFav} fav={fav} setAddress={setAddress} />
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <ProfileEdit open={open} handleClose={handleClose} setFav={setFav} fav={fav}/>
        </>
    )
}

export default Profile
