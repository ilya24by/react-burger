import { useParams } from "react-router-dom";
import IngredientDetailsInfo from "../../components/IngredientDetailsInfo";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useEffect } from "react";
import { getIngredientsAsync } from "../../services/thunk/ingredients";
import Loader from "../../components/Loader";
import styles from './index.module.css';
import commonStyles from '../../styles/common.module.css';

const IngredientDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { ingredients, loading, error } = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        dispatch(getIngredientsAsync());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className={commonStyles.error}>Не удалось загрузить ингредиенты, произошла ошибка: {error}</div>
    }

    const ingredientDetails = ingredients.find((ingredient) => ingredient._id === id);

    if (!ingredientDetails) return null;

    return (
        <div className={styles.ingredient_details_container}>
            <p className="text text_type_main-large">Детали ингредиента</p>
            <IngredientDetailsInfo ingredientDetails={ingredientDetails} />
        </div>
    );
};

export default IngredientDetails;