import IngredientsMenu from "./IngredientsMenu";
import IngredientsList from "./IngredientsList";
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getIngredientsAsync } from "../../services/thunk/ingredients";
import { useEffect } from "react";
import Loader from "../Loader";

const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const { ingredients, loading, error } = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        dispatch(getIngredientsAsync());
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>Не удалось загрузить ингредиенты, произошла ошибка: {error}</div>
    }

    return (
        <section className={styles.ingredients_section}>
            <IngredientsMenu />
            <IngredientsList ingredients={ingredients} />
        </section>
    );
};

export default BurgerIngredients;