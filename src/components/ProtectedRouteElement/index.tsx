import { useAppSelector } from '../../services/hooks';
import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({ element }: { element: any }) {
    const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

    return accessToken && refreshToken ? element : <Navigate to="/login" replace />
}


export default ProtectedRouteElement;