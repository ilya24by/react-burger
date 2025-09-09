import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log(email, password);
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className={styles.login}>
            <h2>Вход</h2>
            <div className={styles.login_form}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    placeholder="E-mail"
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    placeholder="Пароль"
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
                    <p className="text text_type_main-default">Вы — новый пользователь?</p>
                    <Button onClick={navigateToRegister} htmlType="button" type="secondary" size="medium" style={{ padding: 0, marginLeft: 8 }}>Зарегистрироваться</Button>
                </div>
                <div className={styles.login_footer_item}>
                    <p className="text text_type_main-default">Забыли пароль?</p>
                    <Button onClick={navigateToForgotPassword} htmlType="button" type="secondary" size="medium" style={{ padding: 0, marginLeft: 8 }}>Восстановить пароль</Button>
                </div>

            </div>

        </div >
    );
};

export default LoginPage;