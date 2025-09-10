import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/data';

function ProtectedRouteElement({ element }: { element: any }) {
    const [isTokenLife, setIsTokenLife] = useState(false);

    const init = async () => {
        const token = getCookie('token');
        if (token) {
            setIsTokenLife(true);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return isTokenLife ? element : <Navigate to="/login" replace />
}


export default ProtectedRouteElement;