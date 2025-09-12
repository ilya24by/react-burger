import { useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { logoutAsync } from "../../services/thunk/auth";
import { useEffect } from "react";

const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { refreshToken, isLogoutLoading, isLogoutError, isLoggedIn } = useAppSelector((state) => state.auth);

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToHistory = () => {
        navigate('/profile/history');
    };

    const handleLogout = () => {
        if (refreshToken) {
            dispatch(logoutAsync(refreshToken));
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

    return (
        <div className={styles.profile_menu}>
            <p onClick={navigateToProfile} className={`text text_type_main-large  ${styles.profile_menu_item}`}>
                Профиль
            </p>
            <p onClick={navigateToHistory} className={`text text_type_main-large text_color_inactive ${styles.profile_menu_item}`}>
                История заказов
            </p>
            <p onClick={isLogoutLoading ? undefined : handleLogout} className={`text text_type_main-large text_color_inactive ${styles.profile_menu_item}`}>
                {isLogoutLoading ? 'Выходим...' : 'Выход'}
            </p>
        </div>
    );
};

export default ProfileMenu;