import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../../services/thunk/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import useForm from "../../hooks/useForm";

const LoginPage = () => {
    const { isLoginLoading, isLoginError } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form, handleChange] = useForm<{ email: string, password: string }>({ email: '', password: '' });

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = () => {
        dispatch(loginAsync({ email: form.email, password: form.password }));
    };

    return (
        <div className={styles.login}>
            <h2>Вход</h2>
            <EmailInput
                onChange={handleChange}
                value={form.email}
                name={'email'}
                placeholder="E-mail"
                extraClass="mb-2"
            />
            <PasswordInput
                onChange={handleChange}
                value={form.password}
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