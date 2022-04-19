import React, { useContext, useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import AuthContext from '../Context/AuthProvider'
import api from '../../Services/api';
import { Alert } from '@mui/material';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    const GetUser = (user)=>{
        setUser(user)
    }

    const Login = async (user)=>{
        try{
            const Login = await api.post('user/login',{
                email: user.email,
                password: user.password,
            })
            setUser(Login.data)
        }
        catch(err){
            console.log(err)
            setError(true);
        }
        
    }

    return (
        <>
            
            <LoginForm login={Login} errors={error}/>
            <RegisterForm register={GetUser} errors={error}/>
        </>
    )
}

export default Login
