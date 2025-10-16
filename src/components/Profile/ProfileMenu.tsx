import { useLocation, useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { logoutAsync } from "../../services/thunk/auth";
import { resetStore } from "../../services/store";
import { useEffect } from "react";

const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshToken, isLogoutLoading, isLogoutError, isLoggedIn } = useAppSelector((state) => state.auth);

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToOrders = () => {
        navigate('/profile/orders');
    };

    const handleLogout = () => {
        if (refreshToken) {
            dispatch(logoutAsync(refreshToken));
            dispatch(resetStore());
        }
    }

    useEffect(() => {
        if (!isLoggedIn && !isLogoutLoading) {
            navigate('/login');
        }
    }, [isLoggedIn, isLogoutLoading, navigate]);

    useEffect(() => {
        if (isLogoutError) {
            alert('Произошла ошибка при выходе');
        }
    }, [isLogoutError]);

    const inferredActiveTab: 'profile' | 'orders' = location.pathname.includes('/profile/orders') ? 'orders' : 'profile';

    return (
        <div className={styles.profile_menu}>
            <p onClick={navigateToProfile} className={`text text_type_main-large ${styles.profile_menu_item} ${inferredActiveTab === 'profile' ? '' : 'text_color_inactive'}`}>
                Профиль
            </p>
            <p onClick={navigateToOrders} className={`text text_type_main-large ${styles.profile_menu_item} ${inferredActiveTab === 'orders' ? '' : 'text_color_inactive'}`}>
                История заказов
            </p>
            <p onClick={isLogoutLoading ? undefined : handleLogout} className={`text text_type_main-large text_color_inactive ${styles.profile_menu_item}`}>
                {isLogoutLoading ? 'Выходим...' : 'Выход'}
            </p>
        </div>
    );
};

export default ProfileMenu;