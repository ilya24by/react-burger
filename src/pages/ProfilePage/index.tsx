import styles from './index.module.css';

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
        return (
            <div className={styles.profile_page_container_loader}>
                <Loader />
            </div>
        );
    }

    if (isError || !user) {
        return <p className={`${styles.profile_page_container_error} text text_type_main-large`}>Не удалось загрузить профиль, произошла ошибка</p>
    }

    return (
        <div className={styles.profile_page_container}>
            <EditProfileForm user={user} />
        </div>

    );
};

export default ProfilePage;