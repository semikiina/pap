import { Stack, Box, TextField, Grid, Button, Autocomplete, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {countries} from '../../../../Services/countrys';
import api from '../../../../Services/api';
import useAuth from '../../../Contexts/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
        first_name : yup.string().required(),
        last_name :yup.string().required(),
        email : yup.string().email().required(),
        phone_code :yup.string().required('phone code is a required field'),
        phone : yup.string().required(),
        address_1 : yup.string().required(),
        zip_code : yup.string().required('zip code is a required field'),
        province :yup.string().required(),
        city : yup.string().required(),
        country : yup.string().required(),
  }).required();



const NewAddress = ({setAddress, setFav, fav}) => {


    const {user} = useAuth();
    const [ userA, setUserA] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_code: user.phone_code,
        phone: user.phone
    })

    const {  handleSubmit, register, formState : {errors} } = useForm({
        resolver : yupResolver(schema)
    });

    const AddAddress = (data) => {
        console.log(data)
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
                        <TextField  label="First Name" defaultValue={userA.first_name} onChange={(e) => setUserA({...userA, first_name: e.target.value})} {...register("first_name")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.first_name?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Last Name" defaultValue={userA.last_name} onChange={(e) => setUserA({...userA, last_name: e.target.value})} {...register("last_name")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.last_name?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Email" defaultValue={userA.email} onChange={(e) => setUserA({...userA, email: e.target.value})} {...register("email")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.email?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} marginBottom={3}>
                        <Autocomplete
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => '+'+ option.phone}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={Math.random()}>
                                    +{option.phone}
                                </Box>
                            )}
                            
                            renderInput={(params) => (
                                <TextField
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
                        <Typography variant="caption" color="error">{errors.phone_code?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} marginBottom={3}>
                        <TextField  label="Phone" {...register("phone")} defaultValue={userA.phone} onChange={(e) => setUserA({...userA, phone: e.target.value})} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.phone?.message}</Typography>
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
                        <Typography variant="caption" color="error">{errors.country?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="City" {...register("city")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.city?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Zip Code" {...register("zip_code")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.zip_code?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Province" {...register("province")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.province?.message}</Typography>
                    </Grid>
                    <Grid item xs={12}  marginBottom={3}>
                        <TextField  label="Address 1" {...register("address_1")} fullWidth ></TextField>
                        <Typography variant="caption" color="error">{errors.address_1?.message}</Typography>
                    </Grid>
                    <Grid item xs={12} marginBottom={3}>
                        <TextField fullWidth label="Address 2" {...register("address_2")}  ></TextField>
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
