import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { ConstructorListItemProps } from "./types";

const ConstructorListItem = ({ item, position }: ConstructorListItemProps) => {
    const { name, price, image, type } = item;

    return (
        <div className={styles.constructor_list_item}>
            {!position ? <DragIcon type="primary" /> : <div style={{ width: 24 }} />}
            <ConstructorElement
                type={position}
                isLocked={type === 'bun'}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>

    );
};

export default ConstructorListItem;