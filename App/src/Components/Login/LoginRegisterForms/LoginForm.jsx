import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Typography, Box, Button, Alert, Collapse} from '@mui/material'
import { useForm, register } from "react-hook-form";


const LoginForm = ({login, errors}) => {

    const [open, setOpen] = useState(true);
    const {  handleSubmit, register } = useForm();
    const onSubmit = data => {
        login(data)
    };

    return (
    <>
    <Container>
        <Collapse in={open}>
            {
                errors && <Alert onClose={() => {
                    setOpen(false);
                  }} severity="error">This is a success alert — check it out!</Alert>
            }
        </Collapse>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3" marginBottom={4} textAlign="center">Login</Typography>
            <Box marginBottom={2} >
                <TextField helperText="Please enter your email" id="demo-helper-text-misaligned" label="Email" fullWidth {...register("email")}/>
            </Box>
            <Box marginBottom={2} >
                <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" label="Password" fullWidth {...register("password")}/>
            </Box>
            <Button color="secondary" fullWidth variant="outlined" type="submit">Login</Button>
           
        </form>
    </Container>
        
    </>
  )
}

export default LoginForm
