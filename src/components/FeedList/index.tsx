import FeedListItem from "./FeedListItem";
import styles from './index.module.css';

const FeedList = () => {
    return (
        <div className={styles.feed_list}>
            <FeedListItem key={1} />
            <FeedListItem key={2} />
            <FeedListItem key={3} />
        </div>
    );
};

export default FeedList;