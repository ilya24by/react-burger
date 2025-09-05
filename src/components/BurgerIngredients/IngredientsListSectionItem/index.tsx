import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from "../../../UI/Price";
import { IngredientListSectionItemProps } from "./types";
import IngredientDetails from "../../IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { closeIngredientDetailsModal, showIngredientDetailsModal } from "../../../services/slices/ingredientDetailsModalSlice";
import { useDrag } from "react-dnd";
import Modal from "../../Modal";

const IngredientsListSectionItem = ({ ingredient }: IngredientListSectionItemProps) => {
    const ingredientsCounters = useAppSelector((state) => state.burgerIngredients.ingredientsCounters);
    const counter = ingredientsCounters[ingredient._id] || 0;

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });

    const { isShowIngredientDetails } = useAppSelector((state) => state.ingredientDetails);
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
            <div ref={el => { dragRef(el) }} className={styles.ingredients_list_section_item} onClick={handleShowIngredientDetails} style={{ cursor: 'pointer' }}>
                {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
                <img src={image} alt={name} />
                <p className="text text_type_main-default mb-2 text-center">{name}</p>
                <Price price={price} />
            </div>
            {
                isShowIngredientDetails && (
                    <Modal title="Детали ингредиента" onClose={handleCloseIngredientDetails}>
                        <IngredientDetails />
                    </Modal>
                )
            }
        </>

    );
};

export default IngredientsListSectionItem;