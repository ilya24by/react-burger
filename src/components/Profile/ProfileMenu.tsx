import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { useAppDispatch } from "../../services/hooks";
import { logoutAsync } from "../../services/thunk/auth";
import { deleteCookie } from "../../utils/data";

const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToHistory = () => {
        navigate('/profile/history');
    };

    const navigateToLogout = () => {
        dispatch(logoutAsync())
        localStorage.removeItem('refreshToken');
        deleteCookie('token');
        navigate('/login');
    };

    return (
        <div className={styles.profile_menu}>
            <p onClick={navigateToProfile} className={`text text_type_main-large  ${styles.profile_menu_item}`}>
                Профиль
            </p>
            <p onClick={navigateToHistory} className={`text text_type_main-large text_color_inactive ${styles.profile_menu_item}`}>
                История заказов
            </p>
            <p onClick={navigateToLogout} className={`text text_type_main-large text_color_inactive ${styles.profile_menu_item}`}>
                Выход
            </p>
        </div>
    );
};

export default ProfileMenu;