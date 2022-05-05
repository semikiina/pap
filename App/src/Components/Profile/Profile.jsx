import { CircularProgress, Container, Typography, Stack, Paper, Divider, Box, TextField, Grid, Button, Autocomplete, Avatar , ListItem, List, ListItemText} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileEdit from './Profile Edit/ProfileEdit';
import useAuth from '../Contexts/useAuth';
import { useForm } from "react-hook-form";
import {countries} from '../../Services/countrys';
import api from '../../Services/api';
import { Delete, Favorite, Star, StarBorder } from '@mui/icons-material';

const Profile = ({setFav,fav}) => {

    const {  handleSubmit, register } = useForm();
    const {user,setUser} = useAuth();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(false);
    const [country, setCountry] = useState('');
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddAddress = (data) => {
        api.post('user/addAddress',{
            country : country,
            state : data.state,
            zip_code : data.zip_code,
            province : data.province,
            address_1 : data.address_1,
            address_2 : data.address_2
        })
        .then( data =>{
            setAddress(false)
            setFav(fav+1)
        })
        .catch( err=>{
            console.log(err)
        })
    }

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


    const MyAddresses = () =>{
        return (
            <Grid container spacing={4} padding={2}>
               { user.addresses.map((item)=>{
                  return <Grid item sm={6}>
                        <Paper>
                            <Stack spacing={2} padding={2}>
                            <List>
                                <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
                                    {
                                        item.favorite ? <Star color="warning"/> : <StarBorder color="warning"/>
                                    }
                                    <Delete color="error" onClick={()=> DeleteAddress(item._id)}/>
                                </Stack>
                                <ListItem>
                                    <ListItemText primary="Country" secondary={item.country}></ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Zip Code" secondary={item.zip_code+', '+ item.province}></ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Address 1" secondary={item.address_1}></ListItemText>
                                </ListItem>
                                {item.address_2 &&
                                    <ListItem>
                                        <ListItemText primary="Address 2" secondary={item.address_2}></ListItemText>
                                    </ListItem>
                                }
                            </List>
                            </Stack>
                        </Paper>
                   </Grid>
                })}
            </Grid>
        )
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
                                ? <MyAddresses/>
                                :   <Stack padding={2} textAlign="center" marginBottom={3}>
                                        <Typography variant="subtitle1" >You don't have any addresses saved!</Typography>
                                        <Typography variant="caption" >Let's start by adding an address!</Typography>
                                    </Stack>
                            }
                            {
                                address && 
                                
                                <Box padding={2}>
                                    <form onSubmit={handleSubmit(AddAddress)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} marginBottom={3}>
                                            <Autocomplete
                                                freeSolo
                                                disableClearable
                                                options={countries.map((option) => option.label)}
                                                onChange={(event, newValue) => {
                                                    setCountry(newValue);
                                                }}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Country"
                                                    InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                    }}
                                                />
                                                )}
                                            />
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
                                        <TextField  label="Address 1" {...register("address_1")} fullWidth required></TextField>
                                        </Grid>
                                        <Grid item xs={12} marginBottom={2}>
                                        <TextField  label="Address 2" {...register("address_2")} fullWidth ></TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={12} marginBottom={3}>
                                            <Stack direction="row" spacing={3}>
                                                <Button onClick={()=>setAddress(false)} fullWidth color="error" variant="contained">Cancel</Button>
                                                <Button type="submit"  fullWidth color="success" variant="contained" >Save</Button>
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
