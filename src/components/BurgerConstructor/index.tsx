import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { useState, useMemo } from "react";
import OrderDetails from "../OrderDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addBuns, addIngredient } from "../../services/slices/burgerConstructorSlice";
import { increaseIngredientCounter, decreaseIngredientCounter } from "../../services/slices/ingredientsSlice";
import { useDrop } from "react-dnd";
import { Ingredient } from "../BurgerIngredients/IngredientsListSection/types";

const BurgerConstructor = () => {
    const { constructorIngredients } = useAppSelector((state) => state.burgerConstructor);
    const [isShowOrderDetails, setIsShowOrderDetails] = useState(false);
    const dispatch = useAppDispatch();
    const [, drop] = useDrop({
        accept: "ingredient",
        drop(ingredient: Ingredient) {
            if (constructorIngredients.length === 0 && ingredient.type !== 'bun') {
                alert('Сперва необходимо выбрать булки!');
                return;
            }

            if (ingredient.type === 'bun') {
                const bunId = constructorIngredients.find(item => item.type === 'bun')?._id
                if (bunId) {
                    dispatch(decreaseIngredientCounter({ ingredientId: bunId, count: 2 }));
                }
                dispatch(addBuns(ingredient));
                dispatch(increaseIngredientCounter({ ingredientId: ingredient?._id, count: 2 }));
            } else {
                dispatch(addIngredient(ingredient));
                dispatch(increaseIngredientCounter({ ingredientId: ingredient?._id }));
            }
        },
    });

    const price = useMemo(() => {
        return constructorIngredients.reduce((acc, ingredient) => {
            if (ingredient.type === 'bun') {
                return acc + ingredient.price;
            }

            return acc + ingredient.price;
        }, 0);
    }, [constructorIngredients]);

    const handleCloseOrderDetails = () => {
        setIsShowOrderDetails(false);
    };

    const handleShowOrderDetails = () => {
        setIsShowOrderDetails(true);
    };

    return (
        <section ref={el => { drop(el) }} className={styles.constructor_section}>
            <ConstructorList ingredients={constructorIngredients || []} />
            <div className={styles.order}>
                <Price price={price} size="large" />
                <Button htmlType="button" type="primary" size="medium" onClick={handleShowOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
            <OrderDetails isOpen={isShowOrderDetails} onClose={handleCloseOrderDetails} />
        </section>
    );
};

export default BurgerConstructor;