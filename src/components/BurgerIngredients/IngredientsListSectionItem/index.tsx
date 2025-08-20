import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from "../../../UI/Price";
import { IngredientListSectionItemProps } from "./types";
import { useState } from "react";
import IngredientDetails from "../../IngredientDetails";
import { useAppDispatch } from "../../../services/hooks";

const IngredientsListSectionItem = ({ ingredient }: IngredientListSectionItemProps) => {
    const [isShowIngredientDetails, setIsShowIngredientDetails] = useState(false);
    const { name, price, image, _id } = ingredient;
    const dispatch = useAppDispatch();

    const handleShowIngredientDetails = () => {
        setIsShowIngredientDetails(true);
    };

    const handleCloseIngredientDetails = () => {
        setIsShowIngredientDetails(false);
    };

    return (
        <>
            <div className={styles.ingredients_list_section_item} onClick={handleShowIngredientDetails} style={{ cursor: 'pointer' }}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={image} alt={name} />
                <p className="text text_type_main-default mb-2 text-center">{name}</p>
                <Price price={price} />
            </div>
            <IngredientDetails isOpen={isShowIngredientDetails} ingredient={ingredient} onClose={handleCloseIngredientDetails} />
        </>

    );
};

export default IngredientsListSectionItem;