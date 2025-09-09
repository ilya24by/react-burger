import styles from './index.module.css';

import ProfileMenu from '../../components/Profile/ProfileMenu';
import EditProfileForm from '../../components/Profile/EditProfileForm';

const ProfilePage = () => {
    return (
        <div className={styles.profile_page_container}>
            <div className={styles.profile_page}>
                <ProfileMenu />
                <EditProfileForm />
            </div>
            <p className="text text_type_main-default text_color_inactive mt-10">
                В этом разделе вы можете<br />
                изменить свои персональные данные
            </p>
        </div>

    );
};

export default ProfilePage;