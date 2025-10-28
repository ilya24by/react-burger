import styles from './index.module.css';
import { ModalOverlayProps } from "../types";

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
    const handleOverlayClick = () => {
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick} data-testid="modal-overlay">
            {children}
        </div>
    );
};

export default ModalOverlay;