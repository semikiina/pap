import React, {useState} from 'react'
import { Grid , TextField, Box, Autocomplete, Button} from '@mui/material';
import {countries} from '../../../../Services/countrys';
import useAuth from '../../../Contexts/useAuth';

const NewAddress = ({handleSubmit,onSubmit,register}) => {
    
    const {user} = useAuth();
    const [ userA, setUserA] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_code: user.phone_code,
        phone: user.phone
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="NewAddressForm" >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="First Name" {...register("first_name")} defaultValue={userA.first_name} onChange={(e) => setUserA({...userA, first_name: e.target.value})} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Last Name" {...register("last_name")} defaultValue={userA.last_name} onChange={(e) => setUserA({...userA, last_name: e.target.value})} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} marginBottom={3}>
                        <TextField  label="Email" {...register("email")} defaultValue={userA.email} onChange={(e) => setUserA({...userA, email: e.target.value})} fullWidth required></TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} marginBottom={3}>
                    <Autocomplete
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) =>  "+"+option.phone}
                            renderOption={(props, option, index) => (
                                <Box component="li" {...props} key={Math.random()}>
                                    +{option.phone}
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
                        <Button variant='contained' color='secondary' fullWidth type="submit">Continue</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default NewAddress
