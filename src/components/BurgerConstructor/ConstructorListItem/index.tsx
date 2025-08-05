import { Ingredient } from "../../BurgerIngredients/IngredientsListSection/types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';

const ConstructorListItem = ({ item, type }: { item: Ingredient, type: 'top' | 'bottom' | undefined }) => {
    const { name, price, image } = item;
    console.log(name, price, image, type);
    return (
        <div className={styles.constructor_list_item}>
            {!type ? <DragIcon type="primary" /> : <div style={{ width: 24 }} />}
            <ConstructorElement
                type={type}
                isLocked={true}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>

    );
};

export default ConstructorListItem;