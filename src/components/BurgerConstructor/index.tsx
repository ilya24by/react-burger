import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { Ingredient } from "../BurgerIngredients/IngredientsListSection/types";
import { useState } from "react";
import OrderDetails from "../OrderDetails";

const BurgerConstructor = ({ ingredients }: { ingredients: Ingredient[] }) => {
    const [isShowOrderDetails, setIsShowOrderDetails] = useState(false);

    const handleCloseOrderDetails = () => {
        setIsShowOrderDetails(false);
    };

    const handleShowOrderDetails = () => {
        setIsShowOrderDetails(true);
    };

    return (
        <section className={styles.constructor_section}>
            <ConstructorList ingredients={ingredients} />
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