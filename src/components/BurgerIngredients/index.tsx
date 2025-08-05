import IngredientsMenu from "./IngredientsMenu";
import IngredientsList from "./IngredientsList";
import styles from './index.module.css';

const BurgerIngredients = () => {
    return (
        <section className={styles.ingredients_section}>
            <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
            <IngredientsMenu />
            <IngredientsList />
        </section>
    );
};

export default BurgerIngredients;