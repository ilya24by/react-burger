import styles from './index.module.css';
import FeedDetailsInfo from "../../components/FeedDetailsInfo";

const FeedNumberPage = () => {
    return (
        <div className={styles.feed_number_page_container}>
            <FeedDetailsInfo />
        </div>
    );
};

export default FeedNumberPage;