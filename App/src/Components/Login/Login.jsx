import React, { useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import api from '../../Services/api';
import {useLocation, useNavigate} from 'react-router-dom';
import { Container, Grid, Collapse, Alert, Button } from '@mui/material';
import SucessAccount from './Components/SucessAccount';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [errors, setErrors] = useState(false);
    const [open, setOpen] = useState(true);

    const [openSucessAccount, setOpenSucessAccount] = React.useState(false);

    const Login = async (user)=>{
        try{
            const Login = await api.post('user/login',{
                email: user.email,
                password: user.password,
            })
            localStorage.setItem('UAuthorization',Login.data.token)
            //navigate(from, {replace: true })
            window.location.href=from
        }
        catch(err){
            console.log(err)
            setErrors(true);
        }
        
    }

    const Register = async (user)=>{
        try{
            const Register = await api.post('user',{
                first_name: user.first_name,
                last_name: user.last_name,
                nickname : user.nickname,
                email: user.email,
                password: user.password,
            })
            setOpenSucessAccount(true);
        }
        catch(err){
            console.log(err)
            setErrors(true);
        }
        
    }

    return (
        <>
            <Container>
                <Collapse in={open}>
                    {
                        errors && <Alert onClose={() => {
                            setOpen(false);
                        }} severity="error">An error occured, please try again later!</Alert>
                    }
                </Collapse>
                <Grid container>
                    <Grid item xs={12} md={6}><LoginForm login={Login} errors={errors}/></Grid>
                    <Grid item xs={12} md={6}><RegisterForm registerUser={Register} errors={errors}/></Grid>
                </Grid>
            </Container>
            <SucessAccount open={openSucessAccount} />
        </>
    )
}

export default Login
