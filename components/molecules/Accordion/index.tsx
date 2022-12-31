import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { IAccordionProps } from "./Accordion.props";

const Accordion = ({ children, title, isIcon = true, addIcon }: IAccordionProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="-gray-300 w-full cursor-pointer overflow-hidden border-b">
            <div className="flex  flex-row items-center justify-between py-3">
                <div className="flex items-center text-xl font-bold text-black" onClick={() => setIsOpen(!isOpen)}>
                    {addIcon && <Image src={addIcon} alt={title} width={20} height={20} className="mr-2" />}
                    {title}
                </div>
                {isIcon && (
                    <div className="text-3xl text-gray-300" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "-" : "+"}
                    </div>
                )}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="accordion"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full pb-3"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
