import { CircularProgress, Container, Typography, Stack, Paper, Divider, Box, TextField, Grid, Button, InputLabel, Input, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileEdit from './Profile Edit/ProfileEdit';
import useAuth from '../Contexts/useAuth';
import { useForm } from "react-hook-form";

const Profile = ({setFav,fav}) => {

    const {  handleSubmit, register } = useForm();
    const {user,setUser} = useAuth();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [value, setValue] = useState('1');
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                            <Typography padding={2} variant="h6">Your addresses</Typography>
                            <Divider></Divider>
                            
                            <Box paddingLeft={2} paddingTop={2}>
                                <Button onClick={()=>setAddress(true)} variant="outlined" >Add a address</Button>
                            </Box>
                            {
                                user.adresses 
                                ? <Typography>Very Nice</Typography>
                                :   <Stack padding={2} textAlign="center" marginBottom={3}>
                                        <Typography variant="subtitle1" >You don't have any addresses saved!</Typography>
                                        <Typography variant="caption" >Let's start by adding an address!</Typography>
                                    </Stack>
                            }
                            {
                                address && 
                                
                                <Box padding={2}>
                                    <form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} marginBottom={3}>
                                        <TextField  label="Country" {...register("country")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6} marginBottom={3}>
                                        <TextField  label="State" {...register("state")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6} marginBottom={3}>
                                        <TextField  label="Zip Code" {...register("zip_code")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6} marginBottom={3}>
                                        <TextField  label="Province" {...register("province")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12}  marginBottom={3}>
                                        <TextField  label="Adress 1" {...register("address_1")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12} marginBottom={2}>
                                        <TextField  label="Adress 2" {...register("address_2")} fullWidth ></TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={12} marginBottom={3}>
                                            <Stack direction="row" spacing={3}>
                                                <Button onClick={()=>setAddress(false)} fullWidth color="error" variant="contained">Cancel</Button>
                                                <Button type="submit" fullWidth color="success" variant="contained" >Save</Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    </form>
                                    
                                </Box>
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
