import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import { updateProfileAsync } from "../../services/thunk/profile";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

const EditProfileForm = ({ user }: { user: { name: string, email: string } }) => {
    const [isEditName, setIsEditName] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { isUpdateProfileLoading, isUpdateProfileError, isUpdateProfileSuccess } = useAppSelector((state) => state.profile);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const isDirty = name !== user.name || email !== user.email || password !== '';

    const handleCancel = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword('');
    }

    const handleSubmit = () => {
        dispatch(updateProfileAsync({ name, email, password }));
    }

    useEffect(() => {
        if (isEditName && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [isEditName]);

    useEffect(() => {
        if (isUpdateProfileError) {
            alert('Произошла ошибка');
        }
    }, [isUpdateProfileError]);

    useEffect(() => {
        if (isUpdateProfileSuccess) {
            alert('Профиль успешно обновлен');
        }
    }, [isUpdateProfileSuccess]);

    return (
        <div>
            <div>
                <Input
                    ref={nameInputRef}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    type="text"
                    icon="EditIcon"
                    extraClass="mb-4"
                    disabled={!isEditName}
                    onIconClick={() => { setIsEditName(true) }}
                    onBlur={() => { setIsEditName(false) }}
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                />
                <EmailInput
                    placeholder={'Логин'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'login'}
                    isIcon={true}
                    extraClass="mb-4"
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    icon="EditIcon"
                    extraClass="mb-4"
                />
            </div>
            <div className={styles.edit_form_buttons}>
                <Button
                    disabled={!isDirty}
                    onClick={handleCancel}
                    htmlType="submit"
                    type="secondary"
                    size="medium"
                >
                    Отмена
                </Button>
                <Button
                    disabled={!isDirty}
                    onClick={handleSubmit}
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    {isUpdateProfileLoading ? 'Обновляем...' : 'Сохранить'}
                </Button>
            </div>
        </div>
    );
};

export default EditProfileForm;