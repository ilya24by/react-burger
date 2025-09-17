import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './index.module.css';
import HeaderButton from './HeaderButton';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();

    const navigateToConstructor = () => {
        navigate('/');
    };

    const navigateToOrders = () => {
        navigate('/orders');
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };

    return (
        <header className={styles.header}>
            <div className={styles.left_buttons}>
                <HeaderButton icon={<BurgerIcon type="primary" />} text="Конструктор" onClick={navigateToConstructor} />
                <HeaderButton icon={<ListIcon type="primary" />} text="Лента заказов" onClick={navigateToOrders} />
            </div>
            <Logo />
            <HeaderButton icon={<ProfileIcon type="primary" />} text="Личный кабинет" onClick={navigateToProfile} />
        </header>
    );
};

export default AppHeader;