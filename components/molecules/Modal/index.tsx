/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import cn from "classnames";
import React from "react";

import { IModalProps } from "./Modal.props";

const Modal = ({ children, open, layoutClose = true, setOpen, closeButton = false }: IModalProps) => {
    const onClickLayoutClose = () => {
        if (layoutClose) {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }

        if (!open) {
            document.body.style.overflow = "";
        }
    }, [open]);

    return (
        <div
            className={cn(
                "fixed top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80 opacity-0 transition-all duration-500",
                {
                    "z-50 opacity-100": open,
                },
            )}
            onClick={onClickLayoutClose}
        >
            <div
                className={cn("relative scale-50 transition-all duration-500", {
                    "scale-100 transition-all duration-500": open,
                })}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                {closeButton && (
                    <div
                        className="absolute -top-2 -right-6 cursor-pointer text-xl font-bold text-red-900"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </div>
                )}
            </div>
        </div>
    );
};
export default Modal;
