import IngredientsMenu from "./IngredientsMenu";
import IngredientsList from "./IngredientsList";
import styles from './index.module.css';
import { Ingredient } from "./IngredientsListSection/types";

const BurgerIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
    return (
        <section className={styles.ingredients_section}>
            <IngredientsMenu />
            <IngredientsList ingredients={ingredients} />
        </section>
    );
};

export default BurgerIngredients;