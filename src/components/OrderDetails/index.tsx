import styles from './index.module.css';
import doneImage from '../../images/done.png';
import { useAppSelector } from "../../services/hooks";

const OrderDetails = () => {
    const { order } = useAppSelector((state) => state.order);

    return (
        <div className={styles.order_details_content}>
            <p className={["text text_type_digits-large mb-8", styles.order_details_numbers].join(' ')} data-testid="order-number">{order?.order?.number.toString()}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={doneImage} alt="check-mark" data-testid="done-image" />
            <p className="text text_type_main-default mt-15" data-testid="order-status">Ваш заказ начали готовить</p>
            <p className={["text text_type_main-default mt-2", styles.text_details].join(' ')}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;