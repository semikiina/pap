import  useAuth  from './useAuth';
import {useLocation, Navigate, Outlet} from 'react-router-dom';

const RequireAuth = () => {
    const {user} = useAuth();
    const location = useLocation();

    return(
        localStorage.getItem('UAuthorization')
        ? <Outlet/>
        : <Navigate to="./login" state={{ from : location}} replace />
    );
}

export default RequireAuth;