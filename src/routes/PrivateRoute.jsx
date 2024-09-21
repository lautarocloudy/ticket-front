import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { token } = useAuth();

    return token ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
