import { Stack, Box, TextField, Grid, Button, Autocomplete} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {countries} from '../../../../Services/countrys';
import api from '../../../../Services/api';
import useAuth from '../../../Contexts/useAuth';

const NewAddress = ({setAddress, setFav, fav}) => {


    const {user} = useAuth();
    const [ userA, setUserA] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_code: user.phone_code,
        phone: user.phone
    })
    const {  handleSubmit, register } = useForm();

    const AddAddress = (data) => {
        api.post('user/addAddress',{
            first_name : data.first_name,
            last_name : data.last_name,
            email : data.email,
            phone_code : data.phone_code,
            phone : data.phone,
            address_1 : data.address_1,
            address_2 : data.address_2,
            zip_code : data.zip_code,
            province : data.province,
            city : data.city,
            country : data.country,
            
        })
        .then( data =>{
            setAddress(false)
            setFav(fav+1)
        })
        .catch( err=>{
            console.log(err)
        })
    }

    if(!user) return null;
    return (
        <Box padding={2}>
            <form onSubmit={handleSubmit(AddAddress)}> 
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="First Name" defaultValue={userA.first_name} onChange={(e) => setUserA({...userA, first_name: e.target.value})} {...register("first_name")} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Last Name" defaultValue={userA.last_name} onChange={(e) => setUserA({...userA, last_name: e.target.value})} {...register("last_name")} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Email" defaultValue={userA.email} onChange={(e) => setUserA({...userA, email: e.target.value})} {...register("email")} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} marginBottom={3}>
                    <Autocomplete
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => '+'+ option.phone}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    ({option.code}) +{option.phone}
                                </Box>
                            )}
                            
                            renderInput={(params) => (
                                <TextField
                                required
                                {...params}
                                {...register("phone_code")}
                                label="Phone Code"
                                defaultValue={userA.phone_code} 
                                onChange={(e) => setUserA({...userA, phone_code: e.target.value})}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                />
                            )}
                            />
                    </Grid>
                    <Grid item xs={12} sm={3} marginBottom={3}>
                        <TextField  label="Phone" {...register("phone")} defaultValue={userA.phone} onChange={(e) => setUserA({...userA, phone: e.target.value})} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <Autocomplete
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                />
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                required
                                {...params}
                                {...register("country")}
                                label="Country"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                />
                            )}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="City" {...register("city")} fullWidth required></TextField>
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
                    <Grid item xs={12} marginBottom={3}>
                        <TextField  label="Address 2" {...register("address_2")} fullWidth ></TextField>
                    </Grid>
                    <Grid item xs={12} marginBottom={3}>
                        <Stack direction="row" spacing={1}>
                            <Button fullWidth variant="contained" color="error" onClick={()=> setAddress(false)}>Cancel</Button>
                            <Button type="submit" fullWidth variant="contained" color="success">Save shipping info</Button>
                        </Stack>
                        
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default NewAddress
