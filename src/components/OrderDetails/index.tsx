import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal";
import styles from './index.module.css';

const OrderDetails = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-default">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={["text text_type_main-default", styles.text_details].join(' ')}>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    );
};

export default OrderDetails;