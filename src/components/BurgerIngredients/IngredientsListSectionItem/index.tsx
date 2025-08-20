import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from "../../../UI/Price";
import { IngredientListSectionItemProps } from "./types";
import IngredientDetails from "../../IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { closeIngredientDetailsModal, showIngredientDetailsModal } from "../../../services/slices/ingredientDetailsModalSlice";

const IngredientsListSectionItem = ({ ingredient }: IngredientListSectionItemProps) => {
    const { isShowIngredientDetails } = useAppSelector((state) => state.ingredientDetailsModal);
    const { name, price, image } = ingredient;
    const dispatch = useAppDispatch();

    const handleShowIngredientDetails = () => {
        dispatch(showIngredientDetailsModal(ingredient));
    };

    const handleCloseIngredientDetails = () => {
        dispatch(closeIngredientDetailsModal());
    };

    return (
        <>
            <div className={styles.ingredients_list_section_item} onClick={handleShowIngredientDetails} style={{ cursor: 'pointer' }}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={image} alt={name} />
                <p className="text text_type_main-default mb-2 text-center">{name}</p>
                <Price price={price} />
            </div>
            <IngredientDetails isOpen={isShowIngredientDetails} onClose={handleCloseIngredientDetails} />
        </>

    );
};

export default IngredientsListSectionItem;