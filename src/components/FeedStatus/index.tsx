import { useAppSelector } from '../../services/hooks';
import styles from './index.module.css';

const FeedStatus = () => {
    const { orders, total, totalToday } = useAppSelector((state) => state.feed);

    const doneOrders = orders.filter(order => order.status === 'done');
    const inProgressOrders = orders.filter(order => order.status === 'pending' || order.status === 'created');

    const splitIntoColumns = (orders: typeof doneOrders) => {
        const columns = [];
        for (let i = 0; i < orders.length; i += 10) {
            columns.push(orders.slice(i, i + 10));
        }
        return columns;
    };

    const doneColumns = splitIntoColumns(doneOrders);
    const inProgressColumns = splitIntoColumns(inProgressOrders);

    return (
        <div className={styles.feed_status}>
            <div className={styles.feed_status_container}>
                <div className={styles.feed_status_done}>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <div className={styles.columns_container}>
                        {doneColumns.map((column, columnIndex) => (
                            <div key={columnIndex} className={styles.order_column}>
                                {column.map((order) => (
                                    <p key={order._id} className={["text text_type_main-medium", styles.done_item].join(' ')}>
                                        {order.number}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.feed_status_in_progress}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <div className={styles.columns_container}>
                        {inProgressColumns.map((column, columnIndex) => (
                            <div key={columnIndex} className={styles.order_column}>
                                {column.map((order) => (
                                    <p key={order._id} className="text text_type_main-medium">
                                        {order.number}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.feed_status_all_time}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={["text text_type_digits-large", styles.numbers].join(' ')}>{total}</p>
            </div>
            <div className={styles.feed_status_today}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={["text text_type_digits-large", styles.numbers].join(' ')}>{totalToday}</p>
            </div>
        </div>
    );
};

export default FeedStatus;