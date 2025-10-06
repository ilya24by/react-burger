import FeedListItem from "./FeedListItem";
import styles from './index.module.css';

const FeedList = () => {
    return (
        <div className={styles.feed_list}>
            <FeedListItem />
            <FeedListItem />
            <FeedListItem />
        </div>
    );
};

export default FeedList;