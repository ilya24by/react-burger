import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from "../../../UI/Price";
import { IngredientListSectionItemProps } from "./types";

const IngredientsListSectionItem = ({ ingredient }: IngredientListSectionItemProps) => {
    const { name, price, image } = ingredient;

    return (
        <div className={styles.ingredients_list_section_item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={image} alt={name} />
            <p className="text text_type_main-default mb-2">{name}</p>
            <Price price={price} />
        </div>
    );
};

export default IngredientsListSectionItem;