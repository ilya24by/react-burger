import { ReactNode } from 'react';

export type ModalProps = {
    title?: string;
    children: ReactNode;
    onClose: () => void;
}

export type ModalOverlayProps = {
    children: ReactNode;
    onClose: () => void;
}