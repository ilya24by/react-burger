import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from '../../../UI/Price';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientIcon from '../../../UI/IngredientIcon';

const urls = [
    'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
]

const FeedListItem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = '034534';
    const dateFromServer = '2025-10-02T17:33:32.877Z'

    return (
        <div onClick={() => navigate(`/feed/${orderId}`, { state: { backgroundLocation: location } })} className={styles.feed_list_item}>
            <div className={styles.feed_list_item_date} onClick={() => navigate(`/feed/${orderId}`, { state: { backgroundLocation: location } })}>
                <p>#034534</p>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(dateFromServer)} />
            </div>
            <p className="text text_type_main-large">Interstellar бургер</p>
            <div className={styles.feed_list_item_price}>
                <div className={styles.ingredient_icons}>
                    {urls.map((url, index) => (
                        <IngredientIcon key={index} url={url} index={index} />
                    ))}
                </div>
                <Price price={1230} />
            </div>
        </div>
    );
};

export default FeedListItem;