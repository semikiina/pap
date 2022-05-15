import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Typography, Box, Button, Alert, Collapse} from '@mui/material'
import { useForm, register } from "react-hook-form";


const LoginForm = ({login, errors}) => {

    const {  handleSubmit, register } = useForm();
    const onSubmit = data => {
        login(data)
    };

    return (
    <>
    <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" marginBottom={4} textAlign="center">Login</Typography>
            <Box marginBottom={2} >
                <TextField  label="Email" fullWidth {...register("email")}/>
            </Box>
            <Box marginBottom={2} >
                <TextField type="password"   label="Password" fullWidth {...register("password")}/>
            </Box>
            <Button color="secondary" fullWidth variant="outlined" type="submit">Login</Button>
           
        </form>
    </Container>
        
    </>
  )
}

export default LoginForm
