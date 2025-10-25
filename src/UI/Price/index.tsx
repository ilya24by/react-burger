import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';

const Price = ({ price, size = 'default', ...props }: { price: number | string, size?: 'default' | 'large' } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={styles.price} {...props}>
            {size === 'large' ?
                <p className="text text_type_main-large">{price}</p> :
                <p className="text text_type_digits-default">{price}</p>
            }
            <CurrencyIcon type="primary" />
        </div>
    );
};

export default Price;