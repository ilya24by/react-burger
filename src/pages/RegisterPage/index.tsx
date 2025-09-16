import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { registerAsync } from "../../services/thunk/auth";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isRegisterLoading, isRegisterError } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const handleSubmit = () => {
        dispatch(registerAsync({ email, password, name }));
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className={styles.login}>
            <h2>Регистрация</h2>
            <div className={styles.login_form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    size={'default'}
                    extraClass="mb-2"
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                />
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
                    {isRegisterLoading ? 'Зарегистрируемся…' : 'Зарегистрироваться'}
                </Button>
                {isRegisterError && (
                    <p className={`${styles.error_text} text text_type_main-default`}>
                        Произошла ошибка при регистрации
                    </p>
                )}
            </div>
            <div className={styles.login_footer}>
                <div className={styles.login_footer_item}>
                    <p className="text text_type_main-default">Уже зарегистрированы?</p>
                    <Button onClick={navigateToLogin} htmlType="button" type="secondary" size="medium" style={{ padding: 0, marginLeft: 8 }}>Войти</Button>
                </div>
            </div>
        </div >
    );
};

export default RegisterPage;