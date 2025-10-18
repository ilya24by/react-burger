import styles from './index.module.css';
import IngredientIcon from '../../UI/IngredientIcon';
import Price from '../../UI/Price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { getIngredientById, calculateOrderPrice } from '../../utils/ingredients';
import { OrdersFeed, OrderStatus } from '../../api/types';

type Order = OrdersFeed['orders'][0];

interface FeedDetailsInfoProps {
    order: Order;
}

const FeedDetailsInfo = ({ order }: FeedDetailsInfoProps) => {
    const { ingredients } = useSelector((state: RootState) => state.burgerIngredients);

    const ingredientCounts = order.ingredients.reduce((acc, ingredientId) => {
        acc[ingredientId] = (acc[ingredientId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const uniqueIngredients = Object.keys(ingredientCounts).map(ingredientId => {
        const ingredient = getIngredientById(ingredients, ingredientId);
        return {
            ingredient,
            count: ingredientCounts[ingredientId]
        };
    }).filter(item => item.ingredient);

    const totalPrice = calculateOrderPrice(ingredients, order.ingredients);

    const getStatusInfo = (status: OrderStatus) => {
        switch (status) {
            case 'done':
                return { text: 'Выполнен', color: 'var(--colors-interface-success)' };
            case 'pending':
                return { text: 'Готовится', color: 'var(--colors-interface-accent)' };
            case 'created':
                return { text: 'Создан', color: 'var(--colors-interface-accent)' };
        }
    };

    const statusInfo = getStatusInfo(order.status);

    return (
        <div className={styles.feed_number_page}>
            <p className={["text text_type_main-default mb-10", styles.feed_number_page_number].join(' ')}>
                #{order.number}
            </p>
            <div className={styles.feed_number_page_status}>
                <p className="text text_type_main-medium mb-3">{order.name}</p>
                <p className="text text_type_main-default" style={{ color: statusInfo.color }}>
                    {statusInfo.text}
                </p>
            </div>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styles.ingredients_list}>
                {uniqueIngredients.map(({ ingredient, count }, index) => (
                    <div key={index} className={[styles.feed_number_page_ingredient, "mb-10"].join(' ')}>
                        <div className={styles.feed_number_page_ingredient_image}>
                            <IngredientIcon url={ingredient!.image} />
                            <p className="text text_type_main-default ml-4">{ingredient!.name}</p>
                        </div>
                        <Price price={`${count} x ${ingredient!.price}`} />
                    </div>
                ))}
            </div>
            <div className={styles.feed_number_page_date}>
                <FormattedDate className={["text text_type_main-small", styles.feed_number_page_date_time].join(' ')} date={new Date(order.createdAt)} />
                <Price price={totalPrice} />
            </div>
        </div>
    );
};

export default FeedDetailsInfo;