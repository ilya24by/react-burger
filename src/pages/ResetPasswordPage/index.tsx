import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import styles from '../../styles/common.module.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchResetCodeAsync } from "../../services/thunk/resetPassword";
import useForm from "../../hooks/useForm";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isResetCodeLoading, isResetCodeError, isSuccessRequestResetCode } = useAppSelector((state) => state.resetPassword);
    const [form, handleChange] = useForm<{ password: string, code: string }>({ password: '', code: '' });

    const handleSubmit = () => {
        dispatch(fetchResetCodeAsync({ password: form.password, token: form.code }));
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

    return (
        <div className={styles.login}>
            <h2>Восстановление пароля</h2>
            <div className={styles.login_form}>
                <PasswordInput
                    onChange={handleChange}
                    value={form.password}
                    name={'password'}
                    placeholder="Введите новый пароль"
                />
                <Input
                    onChange={handleChange}
                    value={form.code}
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