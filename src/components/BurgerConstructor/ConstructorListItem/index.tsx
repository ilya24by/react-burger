import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import { ConstructorListItemProps } from "./types";

const ConstructorListItem = ({ item, type }: ConstructorListItemProps) => {
    const { name, price, image } = item;
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