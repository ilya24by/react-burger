import { ReactNode } from 'react';

export type ModalProps = {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}
