import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from './types';
import ModalOverlay from './ModalOverlay';
import styles from './index.module.css';

const modalRoot = document.createElement('div');
modalRoot.id = "react-modals";
document.body.appendChild(modalRoot);

const Modal = ({ title, children, onClose }: ModalProps) => {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handlePropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const modalContent = (
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal} onClick={handlePropagation} data-testid="order-details-modal">
                <div className={styles.header}>
                    {title && <h2 className="text text_type_main-large">{title}</h2>}
                    <div className={styles.closeButton} onClick={onClose} data-testid="modal-close-button">
                        <CloseIcon type="primary" />
                    </div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </ModalOverlay>
    );

    return createPortal(modalContent, modalRoot!);
};

export default Modal;