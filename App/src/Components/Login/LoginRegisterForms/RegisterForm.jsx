import React, { useState } from 'react'
import { Container, TextField, Typography, Box, Button, Stack, InputAdornment } from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import api from '../../../Services/api';

const schema = yup.object({
    first_name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(20),
    last_name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(20),
    nickname: yup.string().min(8).max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  }).required();



const RegisterForm = ({registerUser}) => {

    const {  handleSubmit, register, formState:{ errors } } =  useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {

        api.get(`user/verifyParams/${data.nickname}/${data.email}`)
        .then(response=>{
            if (response.statusCode == 400) console.log('err')
            else {
                registerUser(data)
            }
        })
        .catch(err=> console.log(err))

        
        
    };




    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" marginBottom={4} textAlign="center">Register</Typography>
                <Stack marginBottom={2} direction="row" spacing={1}>
                    <Box fullWidth>
                        <TextField  label="First Name" fullWidth {...register("first_name")}/>
                        <Typography variant="caption" color="error">{errors.first_name?.message}</Typography>
                    </Box>
                    <Box fullWidth>
                        <TextField  label="Last Name" fullWidth {...register("last_name")}/>
                        <Typography variant="caption" color="error">{errors.last_name?.message}</Typography>
                    </Box>
                </Stack>
                <Box marginBottom={2} >
                    <TextField label="Nickname" fullWidth {...register("nickname")} InputProps={{startAdornment: <InputAdornment position="start">@</InputAdornment> }}/>
                    <Typography variant="caption" color="error">{errors.nickname?.message}</Typography>
                </Box>
                <Box marginBottom={2} >
                    <TextField label="Email" fullWidth {...register("email")}/>
                    <Typography variant="caption" color="error">{errors.email?.message}</Typography>
                </Box>
                <Box marginBottom={2} >
                    <TextField type="password"  label="Password" fullWidth {...register("password")}   />
                    <Typography variant="caption" color="error">{errors.password?.message}</Typography>
                </Box>
                <Box marginBottom={2} >
                    <TextField type="password" {...register("passwordConfirmation")}  label="Confirm Password" fullWidth />
                    <Typography variant="caption" color="error">{errors.passwordConfirmation?.message}</Typography>
                </Box>
                <Button color="secondary" fullWidth variant="outlined" type="submit">Register</Button>
            
            </form>
        </Container>
            
    )
}

export default RegisterForm
