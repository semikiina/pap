import React from 'react'
import { Container, TextField, Typography, Box, Button, Collapse, Alert} from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).required();


const LoginForm = ({login, setErrorsLogin, errorsLogin }) => {

    const {  handleSubmit, register, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        login(data)
    };

    return (
    <>
    <Container>
        <Collapse in={errorsLogin}>
            {
                errorsLogin && <Alert onClose={() => {
                    setErrorsLogin(false);
                }} severity="error">Your Password and Email don't match!</Alert>
            }
        </Collapse>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" marginBottom={4} textAlign="center">Login</Typography>
            <Box marginBottom={2} >
                <TextField  label="Email" fullWidth {...register("email")}    />
                <Typography variant="caption" color="error">{errors.email?.message}</Typography>
            </Box>
            <Box marginBottom={2} >
                <TextField type="password"   label="Password" fullWidth {...register("password")}/>
                <Typography variant="caption" color="error">{errors.password?.message}</Typography>
            </Box>
            <Button color="secondary" fullWidth variant="outlined" type="submit">Login</Button>
           
        </form>
    </Container>
        
    </>
  )
}

export default LoginForm
