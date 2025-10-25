import { useMemo, useRef } from "react";
import { filterIngredientsByType } from "../../../utils/api";
import IngredientsListSection from "../IngredientsListSection";
import styles from './index.module.css';
import { BurgerIngredientsProps } from "../types";

const IngredientsList = ({ ingredients }: BurgerIngredientsProps) => {
    const ingrediendsSections = useMemo(() => filterIngredientsByType(ingredients), [ingredients]);
    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={rootRef} className={styles.ingredients_list} data-testid="ingredients-list">
            {ingrediendsSections.map(ingredientsSection => {
                return (
                    <IngredientsListSection
                        key={ingredientsSection.title}
                        ingredients={ingredientsSection.items}
                        title={ingredientsSection.title}
                        rootRef={rootRef}
                    />
                );
            })}
        </div>
    );
};

export default IngredientsList;