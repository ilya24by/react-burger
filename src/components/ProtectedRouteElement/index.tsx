import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import Loader from '../Loader';

function ProtectedRouteElement({ element, isAccessDeniedAfterAuth }: { element: React.JSX.Element, isAccessDeniedAfterAuth?: boolean }) {
    const { isLoggedIn, isInitLoading } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    if (isInitLoading) {
        return <Loader />;
    }

    if (isAccessDeniedAfterAuth) {
        return isLoggedIn ? <Navigate to={from} replace /> : element;
    }

    return isLoggedIn ? element : <Navigate to="/login" replace state={{ from: location }} />;
}


export default ProtectedRouteElement;