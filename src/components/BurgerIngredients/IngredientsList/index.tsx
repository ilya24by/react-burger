import { useMemo } from "react";
import { filterIngredientsByType } from "../../../utils/data";
import IngredientsListSection from "../IngredientsListSection";
import styles from './index.module.css';
import { BurgerIngredientsProps } from "../types";

const IngredientsList = ({ ingredients }: BurgerIngredientsProps) => {
    const ingrediendsSections = useMemo(() => filterIngredientsByType(ingredients), [ingredients]);

    return (
        <div className={styles.ingredients_list}>
            {ingrediendsSections.map(ingredientsSection => {
                return <IngredientsListSection ingredients={ingredientsSection.items} title={ingredientsSection.title} />
            })}
        </div>
    );
};

export default IngredientsList;