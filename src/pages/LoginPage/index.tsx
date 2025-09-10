import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../../services/thunk/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setCookie } from "../../utils/data";

const LoginPage = () => {
    const { isLoginLoading, isLoginError, user, accessToken, refreshToken } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = () => {
        dispatch(loginAsync({ email, password }));
    };

    useEffect(() => {
        if (user && refreshToken && accessToken) {
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            setCookie('token', accessToken, { expires: 500 });
            navigate('/profile');
        }
    }, [user, refreshToken, accessToken]);

    return (
        <div className={styles.login}>
            <h2>Вход</h2>
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
                disabled={isLoginLoading}
                htmlType="submit"
                type="primary"
                size="medium"
            >
                {isLoginLoading ? 'Входим…' : 'Войти'}
            </Button>
            {isLoginError && (
                <p className={`${styles.error_text} text text_type_main-default`}>
                    Неверный email или пароль
                </p>
            )}
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