import styles from './index.module.css';
import ProfileOrdersList from '../../components/ProfileOrdersList';

const ProfileOrdersPage = () => {
    return (
        <div className={styles.profile_page_feed_list}>
            <ProfileOrdersList />
        </div>
    );
};

export default ProfileOrdersPage;