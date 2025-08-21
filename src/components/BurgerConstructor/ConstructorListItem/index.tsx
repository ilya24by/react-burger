import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { ConstructorListItemProps } from "./types";
import { useAppDispatch } from "../../../services/hooks";
import { removeIngredient } from "../../../services/slices/burgerConstructorSlice";
import { decreaseIngredientCounter } from "../../../services/slices/ingredientsSlice";

const ConstructorListItem = ({ item, position }: ConstructorListItemProps) => {
    const dispatch = useAppDispatch();
    const { name, price, image, type } = item;

    const handleRemoveIngredient = () => {
        dispatch(removeIngredient(item));
        dispatch(decreaseIngredientCounter({ ingredientId: item._id }));
    }

    return (
        <div className={styles.constructor_list_item}>
            {!position ? <DragIcon type="primary" /> : <div style={{ width: 24 }} />}
            <ConstructorElement
                type={position}
                isLocked={type === 'bun'}
                text={name}
                price={price}
                thumbnail={image}
                handleClose={handleRemoveIngredient}
            />
        </div>

    );
};

export default ConstructorListItem;