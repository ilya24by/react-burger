import ConstructorList from "./ConstructorList";
import Price from "../../UI/Price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { Ingredient } from "../BurgerIngredients/IngredientsListSection/types";

const BurgerConstructor = ({ ingredients }: { ingredients: Ingredient[] }) => {
    return (
        <section className={styles.constructor_section}>
            <ConstructorList ingredients={ingredients} />
            <div className={styles.order}>
                <Price price={100} size="large" />
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;