import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './index.module.css';
import Price from "../../../UI/Price";
import { IngredientListSectionItemProps } from "./types";
import { useAppSelector } from "../../../services/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const IngredientsListSectionItem = ({ ingredient }: IngredientListSectionItemProps) => {
    const location = useLocation();
    const ingredientsCounters = useAppSelector((state) => state.burgerIngredients.ingredientsCounters);
    const counter = ingredientsCounters[ingredient._id] || 0;
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });

    const { name, price, image } = ingredient;

    return (
        <div ref={el => { dragRef(el) }} className={styles.ingredients_list_section_item} style={{ cursor: 'pointer' }}>
            <Link to={`/ingredients/${ingredient._id}`} state={{ backgroundLocation: location }} style={{ textDecoration: 'none', color: 'inherit' }}>
                {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
                <img src={image} alt={name} />
                <p className="text text_type_main-default mb-2 text-center">{name}</p>
                <Price price={price} />
            </Link>
        </div>

    );
};

export default IngredientsListSectionItem;