import { useMemo } from "react";
import { filterIngredientsByType } from "../../../utils/data";
import IngredientsListSection from "../IngredientsListSection";
import styles from './index.module.css';
import { Ingredient } from "../IngredientsListSection/types";

const IngredientsList = ({ ingredients }: { ingredients: Ingredient[] }) => {
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