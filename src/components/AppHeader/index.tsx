import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './index.module.css';
import HeaderButton from './HeaderButton';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left_buttons}>
                <HeaderButton icon={<BurgerIcon type="primary" />} text="Конструктор" onClick={() => { }} />
                <HeaderButton icon={<ListIcon type="primary" />} text="Лента заказов" onClick={() => { }} />
            </div>
            <Logo />
            <HeaderButton icon={<ProfileIcon type="primary" />} text="Личный кабинет" onClick={() => { }} />
        </header>
    );
};

export default AppHeader;