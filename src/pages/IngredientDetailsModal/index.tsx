import { useNavigate, useParams } from "react-router-dom";
import IngredientDetailsInfo from "../../components/IngredientDetailsInfo";
import Modal from "../../components/Modal";
import { useAppSelector } from "../../services/hooks";

const IngredientDetailsModal = () => {
    const { id } = useParams();

    const { ingredients } = useAppSelector((state) => state.burgerIngredients);

    const ingredientDetails = ingredients.find((ingredient) => ingredient._id === id);

    const navigate = useNavigate()

    const handleCloseIngredientDetails = () => {
        navigate(-1)
    }

    if (!ingredientDetails) return null;

    return (
        <div>
            <Modal title="Детали ингредиента" onClose={handleCloseIngredientDetails}>
                <IngredientDetailsInfo ingredientDetails={ingredientDetails} />
            </Modal>
        </div>
    );
};

export default IngredientDetailsModal;