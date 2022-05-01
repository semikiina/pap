import  useAuth  from './useAuth';
import {useLocation, Navigate, Outlet} from 'react-router-dom';

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    console.log(auth?.token)

    return(
        auth?.token
        ? <Outlet/>
        : <Navigate to="./login" state={{ from : location}} replace />
    );
}

export default RequireAuth;