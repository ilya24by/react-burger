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

{/* <p className="text text_type_main-default text_color_inactive mt-10">
В этом разделе вы можете<br />
изменить свои персональные данные
</p> */}

export default ProfileLayout;


