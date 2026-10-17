import { useAuthStore } from '../../stores/useAuthStore';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const {accessToken, user} = useAuthStore();

    if(!accessToken || !user){
        return <Navigate to="/signin" replace />
    }
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute