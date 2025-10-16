import styles from './index.module.css';
import FeedList from '../../components/FeedList';

const ProfileOrdersPage = () => {
    return (
        <div className={styles.profile_page_feed_list}>
            <FeedList />
        </div>
    );
};

export default ProfileOrdersPage;