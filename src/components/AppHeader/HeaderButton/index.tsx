import styles from './index.module.css';
import { HeaderButtonProps } from './types';

const HeaderButton = ({ icon, text, onClick }: HeaderButtonProps) => {
    return (
        <div className={`${styles.header_button} p-2`} onClick={onClick}>
            <div>{icon}</div>
            <p className='text text_type_main-default'>{text}</p>
        </div>
    );
};

export default HeaderButton;