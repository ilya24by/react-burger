import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import Loader from "../Loader";
import { setConstructorIngredients } from "../../services/slices/burgerConstructorSlice";

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const { ingredients, loading, error } = useAppSelector((state) => state.burgerIngredients);
    const { constructorIngredients } = useAppSelector((state) => state.burgerConstructor);
    const [isShowOrderDetails, setIsShowOrderDetails] = useState(false);

    useEffect(() => {
        dispatch(setConstructorIngredients(ingredients));
    }, [ingredients]);

    const handleCloseOrderDetails = () => {
        setIsShowOrderDetails(false);
    };

    const handleShowOrderDetails = () => {
        setIsShowOrderDetails(true);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>Не удалось загрузить конструктор бургера, произошла ошибка: {error}</div>
    }

    return (
        <section className={styles.constructor_section}>
            <ConstructorList ingredients={constructorIngredients || []} />
            <div className={styles.order}>
                <Price price={100} size="large" />
                <Button htmlType="button" type="primary" size="medium" onClick={handleShowOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
            <OrderDetails isOpen={isShowOrderDetails} onClose={handleCloseOrderDetails} />
        </section>
    );
};

export default BurgerConstructor;