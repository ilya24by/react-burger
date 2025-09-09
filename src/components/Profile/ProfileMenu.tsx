import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css';

const ProfileMenu = () => {
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToHistory = () => {
        navigate('/profile/history');
    };

    const navigateToLogout = () => {
        navigate('/logout');
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