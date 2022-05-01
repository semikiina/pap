import React, { useContext, useState } from 'react'   
import LoginForm from './LoginRegisterForms/LoginForm'
import RegisterForm from './LoginRegisterForms/RegisterForm'
import api from '../../Services/api';
import {useLocation, useNavigate} from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';

const Login = () => {
    const {setAuth} = useAuth();

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
            setAuth({email:Login.data.email,nickname:Login.data.nickname,token:Login.data.token})
            navigate(from, {replace: true })
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
