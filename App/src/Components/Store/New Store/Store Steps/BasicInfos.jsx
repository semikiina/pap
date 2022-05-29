import { Typography, TextField, Button, Stack, Box} from '@mui/material'
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from '../../../../Services/api';

const schema = yup.object({
    store_email: yup.string().email().required('Store email is a required field'),
    store_name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid store name').max(40).required('Store name is a required field'),
  }).required();

const BasicInfos = ({handleNext, newStore, setNewStore}) => {

    const {  handleSubmit, register, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [emailExists, setEmailExists] = useState(false)

    const onSubmit = data => {

        setEmailExists(false)
        api.get('store/verifyStoreEmail/'+data.store_email)
        .then(response =>{
            setNewStore({...newStore, store_name: data.store_name , store_email : data.store_email})
            handleNext()
        })
        .catch( err=> {
            setEmailExists(true)
        })

       
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Typography textAlign={'center'} variant="h6">Let's start with some basic informations</Typography>
                <Box>
                    <TextField label="Store Name" fullWidth {...register('store_name')} defaultValue={newStore.store_name} onBlur={ (e) => setNewStore({...newStore, store_name: e.target.value })} ></TextField>
                    <Typography variant="caption" color="error">{errors.store_name?.message}</Typography>
                </Box>
                <Box>
                    <TextField label="Store Email" fullWidth  {...register('store_email')} defaultValue={newStore.store_email} onBlur={ (e) => setNewStore({...newStore, store_email: e.target.value })}></TextField>
                    <Typography variant="caption" color="error"  >{errors.store_email?.message}</Typography>
                    <Typography variant="caption" color="error"  >{emailExists && "This email already exists."}</Typography>
                </Box>
                <Button variant="contained" type="submit" fullWidth> next</Button>
            </Stack>
        </form>   
    )
}

export default BasicInfos
