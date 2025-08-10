import data from '../../../utils/data'
import { Ingredient } from '../../BurgerIngredients/IngredientsListSection/types';
import ConstructorListItem from "../ConstructorListItem";
import styles from './index.module.css';

const ConstructorList = ({ ingredients }: { ingredients: Ingredient[] }) => {
    return (
        <div className={styles.constructor_list}>
            {
                ingredients.map((item, index) => (
                    <ConstructorListItem key={item.name} type={!index ? 'top' : index === ingredients.length - 1 ? 'bottom' : undefined} item={item} />
                ))
            }
        </div>
    );
};

export default ConstructorList;