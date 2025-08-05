import IngredientsMenu from "./IngredientsMenu";
import IngredientsList from "./IngredientsList";
import styles from './index.module.css';

const BurgerIngredients = () => {
    return (
        <section className={styles.ingredients_section}>
            <IngredientsMenu />
            <IngredientsList />
        </section>
    );
};

export default BurgerIngredients;