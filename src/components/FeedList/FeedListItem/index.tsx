import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from '../../../UI/Price';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientIcon from '../../../UI/IngredientIcon';
import { OrdersFeed } from '../../../api/types';
import { ProfileOrder } from '../../../services/slices/profileOrdersSlice';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { getIngredientImageById, calculateOrderPrice } from '../../../utils/ingredients';
import { useEffect } from 'react';
import { getIngredientsAsync } from '../../../services/thunk/ingredients';

type FeedOrder = OrdersFeed['orders'][0];
type Order = FeedOrder | ProfileOrder;

interface FeedListItemProps {
    order: Order;
    isProfileOrder?: boolean;
}

const FeedListItem = ({ order, isProfileOrder }: FeedListItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { ingredients, loading } = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        if (ingredients.length === 0 && !loading) {
            dispatch(getIngredientsAsync());
        }
    }, [dispatch, ingredients.length, loading]);

    const handleClick = () => {
        const basePath = isProfileOrder ? '/profile/orders' : '/feed';
        navigate(`${basePath}/${order.number}`, { state: { backgroundLocation: location } });
    };
    const ingredientImages = order.ingredients.map(ingredientId =>
        getIngredientImageById(ingredients, ingredientId)
    ).filter(Boolean);

    const totalPrice = calculateOrderPrice(ingredients, order.ingredients);

    return (
        <div onClick={handleClick} className={styles.feed_list_item}>
            <div className={styles.feed_list_item_date}>
                <p>#{order.number}</p>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
            </div>
            <p className="text text_type_main-large">
                {order.name}
            </p>
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