import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Typography, Box, Button, Alert, Collapse, Stack, InputAdornment, Checkbox} from '@mui/material'
import { useForm } from "react-hook-form";
import { Check, CheckCircle, Visibility, VisibilityOff } from '@mui/icons-material';


const RegisterForm = ({registerUser, errors}) => {

    const [passError, setPassError] = useState(false);
    const {  handleSubmit, register } = useForm();
    const onSubmit = data => {
        if(data.password != data.rpassword) {
            setPassError(true);
            return;
        }
        else{
            setPassError(false);
            registerUser(data)
        }
        
    };


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" marginBottom={4} textAlign="center">Register</Typography>
                <Stack marginBottom={2} direction="row" spacing={1}>
                    <TextField  label="First Name" fullWidth {...register("first_name")}/>
                    <TextField  label="Last Name" fullWidth {...register("last_name")}/>
                </Stack>
                <Box marginBottom={2} >
                    <TextField  label="Nickname" helperText="Your nickname must be unic." fullWidth {...register("nickname")} InputProps={{startAdornment: <InputAdornment position="start">@</InputAdornment> }}/>
                </Box>
                <Box marginBottom={2} >
                    <TextField   label="Email" fullWidth {...register("email")}/>
                </Box>
                <Box marginBottom={2} >
                    <TextField type="password"  label="Password" fullWidth {...register("password")} />
                </Box>
                <Box marginBottom={2} >
                    <TextField  error={passError} {...register("rpassword")} helperText={passError && "Your passwords don't match"} onClick={ ()=> setPassError(false)} label="Repeat Password" fullWidth />
                </Box>
                <Button color="secondary" fullWidth variant="outlined" type="submit">Register</Button>
            
            </form>
        </Container>
            
    )
}

export default RegisterForm
