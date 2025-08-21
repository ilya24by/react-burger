import Modal from "../Modal";
import styles from './index.module.css';
import { IngredientDetailsProps } from "./types";
import { useAppSelector } from "../../services/hooks";

const IngredientDetails = () => {
    const { ingredientDetails } = useAppSelector((state) => state.ingredientDetails);

    if (!ingredientDetails) return null;

    const { name, image_large, calories, proteins, fat, carbohydrates } = ingredientDetails;
    return (
        <div>
            <img src={image_large} alt={name} />
            <h2 className="text text_type_main-medium mb-4">{name}</h2>
            <div className={styles.ingredient_details_content}>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Калории,ккал<br />{calories}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Белки,г<br />{proteins}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Жиры,г<br />{fat}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Углеводы,г<br />{carbohydrates}</p>
            </div>
        </div>
    );
};

export default IngredientDetails;