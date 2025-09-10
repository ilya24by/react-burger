import styles from './index.module.css';

import ProfileMenu from '../../components/Profile/ProfileMenu';
import EditProfileForm from '../../components/Profile/EditProfileForm';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getProfileAsync } from '../../services/thunk/profile';
import { useEffect } from 'react';
import Loader from '../../components/Loader';

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const { user, isLoading, isError } = useAppSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfileAsync());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !user) {
        return <p className={`${styles.profile_page_container_error} text text_type_main-large`}>Не удалось загрузить профиль, произошла ошибка</p>
    }

    return (
        <div className={styles.profile_page_container}>
            <div className={styles.profile_page}>
                <ProfileMenu />
                <EditProfileForm user={user} />
            </div>
            <p className="text text_type_main-default text_color_inactive mt-10">
                В этом разделе вы можете<br />
                изменить свои персональные данные
            </p>
        </div>

    );
};

export default ProfilePage;