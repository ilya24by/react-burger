import Modal from "../Modal";
import styles from './index.module.css';
import { IngredientDetailsProps } from "./types";

const IngredientDetails = ({ isOpen, ingredient, onClose }: IngredientDetailsProps) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } = ingredient;
    return (
        <Modal title="Детали ингредиента" isOpen={isOpen} onClose={onClose}>
            <img src={image_large} alt={name} />
            <h2 className="text text_type_main-medium mb-4">{name}</h2>
            <div className={styles.ingredient_details_content}>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Калории,ккал<br />{calories}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Белки,г<br />{proteins}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Жиры,г<br />{fat}</p>
                <p className={["text text_type_main-default text-center", styles.text_details].join(' ')}>Углеводы,г<br />{carbohydrates}</p>
            </div>
        </Modal>
    );
};

export default IngredientDetails;