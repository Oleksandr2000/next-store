/* eslint-disable no-unused-vars */

import { ReactNode } from "react";

export interface IModalProps {
    open: boolean;
    children: ReactNode;
    setOpen: (value: boolean) => void;
    layoutClose?: boolean;
    closeButton?: boolean;
}
