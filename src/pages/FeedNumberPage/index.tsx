import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import styles from './index.module.css';
import FeedDetailsInfo from "../../components/FeedDetailsInfo";
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';

const FeedNumberPage = () => {
    const { number } = useParams<{ number: string }>();
    const { orders, isConnected } = useSelector((state: RootState) => state.feed);

    if (!isConnected) {
        return <Loader />;
    }

    const order = orders.find(order => order.number.toString() === number);

    if (!order) {
        return (
            <div className={styles.feed_number_page_container}>
                <div className={commonStyles.error}>
                    Заказ #{number} не найден
                </div>
            </div>
        );
    }

    return (
        <div className={styles.feed_number_page_container}>
            <FeedDetailsInfo order={order} />
        </div>
    );
};

export default FeedNumberPage;