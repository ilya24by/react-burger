import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

function ProtectedRouteElement({ element, isAccessDeniedAfterAuth }: { element: any, isAccessDeniedAfterAuth?: boolean }) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    if (isAccessDeniedAfterAuth) {
        return isLoggedIn ? <Navigate to="/" replace /> : element;
    }

    return isLoggedIn ? element : <Navigate to="/login" replace />
}


export default ProtectedRouteElement;