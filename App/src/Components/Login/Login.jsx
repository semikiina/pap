import React, { useContext, useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import api from '../../Services/api';
import {useLocation, useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
            localStorage.setItem('UAuthorization',Login.data.token)
            //navigate(from, {replace: true })
            window.location.href=from
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
