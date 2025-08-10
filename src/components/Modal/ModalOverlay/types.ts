import { ReactNode } from "react";

export type ModalOverlayProps = {
    children: ReactNode;
    onClose: () => void;
}