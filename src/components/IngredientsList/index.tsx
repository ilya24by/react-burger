import { useMemo } from "react";
import data, { filterIngredientsByType } from "../../utils/data";
import IngredientsListSection from "../IngredientsListSection";
import styles from './index.module.css';

const IngredientsList = () => {
    const ingrediendsSections = useMemo(() => filterIngredientsByType(data), [data]);

    return (
        <div className={styles.ingredients_list}>
            {ingrediendsSections.map(ingredientsSection => {
                return <IngredientsListSection ingredients={ingredientsSection.items} title={ingredientsSection.title} />
            })}
        </div>
    );
};

export default IngredientsList;