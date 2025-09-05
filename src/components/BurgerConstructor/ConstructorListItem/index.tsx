import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { ConstructorListItemProps } from "./types";
import { useAppDispatch } from "../../../services/hooks";
import { removeIngredient } from "../../../services/slices/burgerConstructorSlice";
import { decreaseIngredientCounter } from "../../../services/slices/ingredientsSlice";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const ITEM_TYPE = 'constructor-item';

const ConstructorListItem = ({ item, position, index, onMove }: ConstructorListItemProps) => {
    const dispatch = useAppDispatch();
    const { name, price, image, type } = item;
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: type !== 'bun',
    }), [index, type]);

    const [, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        hover: (dragItem: { index: number }) => {
            if (!ref.current) return;
            const dragIndex = dragItem.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            if (position === 'top' || position === 'bottom') return;
            onMove(dragIndex, hoverIndex);
            dragItem.index = hoverIndex;
        }
    }), [index, onMove, position]);

    drag(drop(ref));

    const handleRemoveIngredient = () => {
        dispatch(removeIngredient(index));
        dispatch(decreaseIngredientCounter({ ingredientId: item._id }));
    }

    return (
        <div ref={ref} className={styles.constructor_list_item} style={{ opacity: isDragging ? 0.5 : 1 }}>
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