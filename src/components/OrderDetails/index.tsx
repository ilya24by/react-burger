import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal";
import styles from './index.module.css';
import doneImage from '../../images/done.png';

const OrderDetails = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.order_details_content}>
                <p className={["text text_type_digits-large mb-8", styles.order_details_numbers].join(' ')}>034536</p>
                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                <img src={doneImage} alt="check-mark" />
                <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
                <p className={["text text_type_main-default mt-2", styles.text_details].join(' ')}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
};

export default OrderDetails;