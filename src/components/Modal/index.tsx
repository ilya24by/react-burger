import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from './types';
import ModalOverlay from './ModalOverlay';
import styles from './index.module.css';

const modalRoot = document.createElement('div');
modalRoot.id = "react-modals";
document.body.appendChild(modalRoot);

const Modal = ({ title, children, isOpen }: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false)
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const onClose = () => {
        setIsModalOpen(false);
    };

    const handlePropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isModalOpen) {
        return null;
    }

    const modalContent = (
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal} onClick={handlePropagation}>
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    <div className={styles.closeButton} onClick={onClose}>
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