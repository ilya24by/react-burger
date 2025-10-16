import styles from './index.module.css';
import IngredientIcon from '../../UI/IngredientIcon';
import Price from '../../UI/Price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedDetailsInfo = () => {
    const dateFromServer = '2022-10-10T17:33:32.877Z';
    return (
        <div className={styles.feed_number_page}>
            <p className={["text text_type_main-default mb-10", styles.feed_number_page_number].join(' ')}>#034533</p>
            <div className={styles.feed_number_page_status}>
                <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
                <p className="text text_type_main-default" style={{ color: 'var(--colors-interface-success)' }}>Выполнен</p>
            </div>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={[styles.feed_number_page_ingredient, "mb-10"].join(' ')}>
                <div className={styles.feed_number_page_ingredient_image}>
                    <IngredientIcon url={'https://code.s3.yandex.net/react/code/meat-01-mobile.png'} />
                    <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
                </div>
                <Price price={'2 x 20'} />
            </div>
            <div className={styles.feed_number_page_date}>
                <FormattedDate className={["text text_type_main-small", styles.feed_number_page_date_time].join(' ')} date={new Date(dateFromServer)} />
                <Price price={510} />
            </div>

        </div>
    );
};

export default FeedDetailsInfo;