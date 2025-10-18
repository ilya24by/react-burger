import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from '../../../UI/Price';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientIcon from '../../../UI/IngredientIcon';
import { OrdersFeed } from '../../../api/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { getIngredientImageById, calculateOrderPrice } from '../../../utils/ingredients';

type Order = OrdersFeed['orders'][0];

interface FeedListItemProps {
    order: Order;
}

const FeedListItem = ({ order }: FeedListItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredients } = useSelector((state: RootState) => state.burgerIngredients);

    const handleClick = () => {
        navigate(`/feed/${order.number}`, { state: { backgroundLocation: location } });
    };

    // Get ingredient images and calculate total price
    const ingredientImages = order.ingredients.map(ingredientId =>
        getIngredientImageById(ingredients, ingredientId)
    ).filter(Boolean); // Filter out empty strings

    const totalPrice = calculateOrderPrice(ingredients, order.ingredients);

    return (
        <div onClick={handleClick} className={styles.feed_list_item}>
            <div className={styles.feed_list_item_date}>
                <p>#{order.number}</p>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
            </div>
            <p className="text text_type_main-large">{order.name}</p>
            <div className={styles.feed_list_item_price}>
                <div className={styles.ingredient_icons}>
                    {ingredientImages.slice(0, 6).map((imageUrl, index) => (
                        <IngredientIcon key={index} url={imageUrl} index={index} />
                    ))}
                    {ingredientImages.length > 6 && (
                        <div className={styles.more_ingredients}>
                            +{ingredientImages.length - 6}
                        </div>
                    )}
                </div>
                <Price price={totalPrice} />
            </div>
        </div>
    );
};

export default FeedListItem;