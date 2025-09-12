import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from '../../styles/common.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { resetPasswordAsync } from "../../services/thunk/resetPassword";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const { isResetPasswordLoading, isResetPasswordError, isSuccessRequestResetPassword } = useAppSelector((state) => state.resetPassword);
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        dispatch(resetPasswordAsync({ email }));
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

    if (isLoggedIn) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return (
        <div className={styles.login}>
            <h2>Восстановление пароля</h2>
            <div className={styles.login_form}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
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