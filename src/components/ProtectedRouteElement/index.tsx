import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

function ProtectedRouteElement({ element, isAccessDeniedAfterAuth }: { element: any, isAccessDeniedAfterAuth?: boolean }) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    if (isAccessDeniedAfterAuth) {
        return isLoggedIn ? <Navigate to={from} replace /> : element;
    }

    return isLoggedIn ? element : <Navigate to="/login" replace state={{ from: location }} />;
}


export default ProtectedRouteElement;