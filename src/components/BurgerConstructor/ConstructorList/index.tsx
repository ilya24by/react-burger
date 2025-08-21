import ConstructorListItem from "../ConstructorListItem";
import styles from './index.module.css';
import { BurgerConstructorProps } from '../types';
import { useAppDispatch } from "../../../services/hooks";
import { reorderIngredients } from "../../../services/slices/burgerConstructorSlice";

const defineType = (index: number, length: number) => {
    if (index === 0) return 'top';
    if (index === length - 1) return 'bottom';
    return undefined;
}

const ConstructorList = ({ ingredients }: BurgerConstructorProps) => {
    const dispatch = useAppDispatch();

    const handleMove = (fromIndex: number, toIndex: number) => {
        dispatch(reorderIngredients({ fromIndex, toIndex }));
    };

    return (
        <div className={styles.constructor_list}>
            {
                ingredients.map((item, index) => (
                    <ConstructorListItem key={item._id + index} index={index} onMove={handleMove} position={defineType(index, ingredients.length)} item={item} />
                ))
            }
        </div>
    );
};

export default ConstructorList;