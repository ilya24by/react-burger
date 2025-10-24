import styles from './index.module.css';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
    return (
        <div className={styles.profile_layout_container}>
            <ProfileMenu />
            <Outlet />
        </div>
    );
};

export default ProfileLayout;


