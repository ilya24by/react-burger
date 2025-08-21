import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import Loader from "../Loader";
import { setConstructorIngredients, addIngredient } from "../../services/slices/burgerConstructorSlice";
import { increaseIngredientCounter } from "../../services/slices/ingredientsSlice";
import { useDrop } from "react-dnd";
import { Ingredient } from "../BurgerIngredients/IngredientsListSection/types";

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const [, drop] = useDrop({
        accept: "ingredient",
        drop(ingredient: Ingredient) {
            dispatch(addIngredient(ingredient));
            dispatch(increaseIngredientCounter({ ingredientId: ingredient?._id }));
        },
    });

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
        <section ref={el => { drop(el) }} className={styles.constructor_section}>
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