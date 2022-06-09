import React, { useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import api from '../../Services/api';
import {useLocation, useNavigate} from 'react-router-dom';
import { Container, Grid, Collapse, Alert, Button } from '@mui/material';
import SucessAccount from './Components/SucessAccount';


const Login = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [errorsLogin, setErrorsLogin] = useState(false);
    const [errorsRegister, setErrorsRegister] = useState(false);
    const [open, setOpen] = useState(true);

    const [openSucessAccount, setOpenSucessAccount] = React.useState(false);

    const Login = async (user)=>{
        try{
            const Login = await api.post('user/login',{
                email: user.email,
                password: user.password,
            })
            console.log(Login)
            localStorage.setItem('UAuthorization',Login.data.token)
            // //navigate(from, {replace: true })
             window.location.href=from
        }
        catch(err){
            console.log(err)
            setErrorsLogin(true);
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
            setErrorsRegister(true);
        }
        
    }

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12} md={6}><LoginForm login={Login} setErrorsLogin={setErrorsLogin} errorsLogin={errorsLogin} /></Grid>
                    <Grid item xs={12} md={6}><RegisterForm registerUser={Register}  setErrorsRegister={setErrorsRegister} errorsRegister={errorsRegister}  /></Grid>
                </Grid>
            </Container>
            <SucessAccount open={openSucessAccount} />
        </>
    )
}

export default Login
