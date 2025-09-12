import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from '../../styles/common.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log(email);
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

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
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    Войти
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