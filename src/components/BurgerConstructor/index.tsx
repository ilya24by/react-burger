import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { useMemo, useEffect } from "react";
import OrderDetails from "../OrderDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addBuns, addIngredient } from "../../services/slices/burgerConstructorSlice";
import { increaseIngredientCounter, decreaseIngredientCounter } from "../../services/slices/ingredientsSlice";
import { useDrop } from "react-dnd";
import { Ingredient } from "../BurgerIngredients/types";
import { getOrderDetails } from "../../services/thunk/orders";
import { hideOrderDetailsModal } from "../../services/slices/orderSlice";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { constructorIngredients } = useAppSelector((state) => state.burgerConstructor);
    const { isLoading, error, isShowOrderDetailsModal } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();
    const [{ isOver }, drop] = useDrop({
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
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const price = useMemo(() => {
        return constructorIngredients.reduce((acc, ingredient) => {
            if (ingredient.type === 'bun') {
                return acc + ingredient.price;
            }

            return acc + ingredient.price;
        }, 0);
    }, [constructorIngredients]);

    useEffect(() => {
        if (error) {
            alert('Произошла ошибка при оформлении заказа');
        }
    }, [error]);

    const handleOrderDetails = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (constructorIngredients.length === 0) {
            alert('Сперва необходимо выбрать ингредиенты!');
            return;
        }

        dispatch(getOrderDetails(constructorIngredients.map(ingredient => ingredient._id)));
    }

    return (
        <section ref={el => { drop(el) }} className={styles.constructor_section} style={{ opacity: isOver ? 0.5 : 1 }}>
            <ConstructorList ingredients={constructorIngredients || []} />
            <div className={styles.order}>
                <Price price={price} size="large" />
                <Button htmlType="button" type="primary" size="medium" onClick={handleOrderDetails}>
                    {isLoading ? 'Загрузка...' : 'Оформить заказ'}
                </Button>
            </div>
            {
                isShowOrderDetailsModal && (
                    <Modal onClose={() => dispatch(hideOrderDetailsModal())}>
                        <OrderDetails />
                    </Modal>
                )
            }
        </section>
    );
};

export default BurgerConstructor;