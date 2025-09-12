import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from '../../styles/common.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchResetCodeAsync } from "../../services/thunk/resetPassword";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { isResetCodeLoading, isResetCodeError, isSuccessRequestResetCode } = useAppSelector((state) => state.resetPassword);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        dispatch(fetchResetCodeAsync({ password, token: code }));
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (isSuccessRequestResetCode) {
            navigateToLogin()
        }
    }, [isSuccessRequestResetCode]);

    useEffect(() => {
        if (isResetCodeError) {
            alert('Произошла ошибка');
        }
    }, [isResetCodeError]);

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
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    placeholder="Введите новый пароль"
                />
                <Input
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    name={'code'}
                    placeholder="Введите код из письма"
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                />
                <Button
                    disabled={isResetCodeLoading}
                    onClick={handleSubmit}
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                    {isResetCodeLoading ? 'Созраняем...' : 'Сохранить'}
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

export default ResetPasswordPage;