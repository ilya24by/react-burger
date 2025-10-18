import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';

const Price = ({ price, size = 'default' }: { price: number | string, size?: 'default' | 'large' }) => {
    return (
        <div className={styles.price}>
            {size === 'large' ?
                <p className="text text_type_main-large">{price}</p> :
                <p className="text text_type_digits-default">{price}</p>
            }
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default Price;