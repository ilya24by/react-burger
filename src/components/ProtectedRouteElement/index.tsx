import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

function ProtectedRouteElement({ element }: { element: any }) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? element : <Navigate to="/login" replace />
}


export default ProtectedRouteElement;