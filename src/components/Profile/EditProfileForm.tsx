import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import { updateProfileAsync } from "../../services/thunk/profile";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import useForm from "../../hooks/useForm";
import { EditProfileFormProps, EditProfileFormState } from "./types";

const EditProfileForm = ({ user }: EditProfileFormProps) => {
    const [isEditName, setIsEditName] = useState(false);
    const [form, handleChange, resetForm] = useForm<EditProfileFormState>({ name: user.name, email: user.email, password: '' });
    const dispatch = useAppDispatch();
    const { isUpdateProfileLoading, isUpdateProfileError, isUpdateProfileSuccess } = useAppSelector((state) => state.profile);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const isDirty = form.name !== user.name || form.email !== user.email || form.password !== '';

    const handleCancel = () => {
        resetForm();
    }

    const handleSubmit = () => {
        dispatch(updateProfileAsync({ name: form.name, email: form.email, password: form.password }));
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
                    onChange={handleChange}
                    value={form.name}
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
                    onChange={handleChange}
                    value={form.email}
                    name={'login'}
                    isIcon={true}
                    extraClass="mb-4"
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    value={form.password}
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