import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { resetPasswordAsync } from "../../services/thunk/resetPassword";
import useForm from "../../hooks/useForm";
import { ForgotPasswordForm } from "./types";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isResetPasswordLoading, isResetPasswordError, isSuccessRequestResetPassword } = useAppSelector((state) => state.resetPassword);
    const [form, handleChange] = useForm<ForgotPasswordForm>({ email: '' });

    const handleSubmit = () => {
        dispatch(resetPasswordAsync({ email: form.email }));
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (isResetPasswordError) {
            alert('Произошла ошибка');
        }
    }, [isResetPasswordError]);

    useEffect(() => {
        if (isSuccessRequestResetPassword) {
            navigate('/reset-password');
        }
    }, [isSuccessRequestResetPassword]);

    return (
        <div className={styles.login}>
            <h2>Восстановление пароля</h2>
            <div className={styles.login_form}>
                <EmailInput
                    onChange={handleChange}
                    value={form.email}
                    name={'email'}
                    placeholder="Укажите e-mail"
                    extraClass="mb-2"
                />
                <Button
                    onClick={handleSubmit}
                    disabled={isResetPasswordLoading}
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    {isResetPasswordLoading ? 'Отправляем код...' : 'Восстановить'}
                </Button>
            </div>
            <div className={styles.login_footer}>
                <div className={styles.login_footer_item}>
                    <p className="text text_type_main-default">Вспомнили пароль?</p>
                    <Button onClick={navigateToLogin} htmlType="button" type="secondary" size="medium" style={{ padding: 0, marginLeft: 8 }}>Войти</Button>
                </div>
            </div>
        </div >
    );
};

export default ForgotPasswordPage;