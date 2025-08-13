import IngredientsMenu from "./IngredientsMenu";
import IngredientsList from "./IngredientsList";
import styles from './index.module.css';
import { BurgerIngredientsProps } from './types';

const BurgerIngredients = ({ ingredients }: BurgerIngredientsProps) => {
    return (
        <section className={styles.ingredients_section}>
            <IngredientsMenu />
            <IngredientsList ingredients={ingredients} />
        </section>
    );
};

export default BurgerIngredients;