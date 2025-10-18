import FeedStatus from "../../components/FeedStatus";
import FeedList from "../../components/FeedList";
import styles from './index.module.css';

const FeedPage = () => {
    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
            <div className={styles.feed_page_container}>
                <FeedList />
                <FeedStatus />
            </div>

        </div>
    );
};

export default FeedPage;