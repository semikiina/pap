import React, { useContext, useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import api from '../../Services/api';
import {useLocation, useNavigate} from 'react-router-dom';
import { Container, Grid, Stack } from '@mui/material';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [error, setError] = useState(false);



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
            setError(true);
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
            window.location.href='./'
        }
        catch(err){
            console.log(err)
            setError(true);
        }
        
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={6}><LoginForm login={Login} errors={error}/></Grid>
                <Grid item xs={12} md={6}><RegisterForm registerUser={Register} errors={error}/></Grid>
            </Grid>
        </Container>
    )
}

export default Login
