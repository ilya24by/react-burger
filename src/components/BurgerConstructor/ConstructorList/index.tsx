import ConstructorListItem from "../ConstructorListItem";
import styles from './index.module.css';
import { BurgerConstructorProps } from '../types';

const defineType = (index: number, length: number) => {
    if (index === 0) return 'top';
    if (index === length - 1) return 'bottom';
    return undefined;
}

const ConstructorList = ({ ingredients }: BurgerConstructorProps) => {
    return (
        <div className={styles.constructor_list}>
            {
                ingredients.map((item, index) => (
                    <ConstructorListItem key={item.name} type={defineType(index, ingredients.length)} item={item} />
                ))
            }
        </div>
    );
};

export default ConstructorList;