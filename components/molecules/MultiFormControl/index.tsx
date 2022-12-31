/* eslint-disable no-unused-vars */

import React from "react";

import { MultiFormControlProps } from "./MultiFormControl.props";

import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

const MultiFormControl = ({ title, values, keys, setValues }: MultiFormControlProps) => {
    const addInfo = (info: any, setInfo: (value: any) => any) => {
        setInfo([...info, { id: Date.now() }]);
    };

    const removeInfo = (id: any, info: any, setInfo: (value: any) => any) => {
        setInfo(info.filter((item) => item.id !== id));
    };

    const changeInfo = (key: string, value: any, id: any, info: any, setInfo: (value: any) => any) => {
        setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
    };

    return (
        <>
            {values.map((i: any, index: number) => (
                <div className="mt-3 grid grid-cols-[3fr_1fr] gap-4" key={index}>
                    <div className="flex flex-row">
                        {keys.map((item: any, index: number) => (
                            <div key={index} className="mr-4 w-full">
                                <Input
                                    name={item}
                                    type="text"
                                    placeholder="Enter value"
                                    value={i[item]}
                                    onChange={(e) => changeInfo(item, e.target.value, i.id, values, setValues)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            className="w-full bg-red-900 py-1"
                            onClick={() => removeInfo(i.id, values, setValues)}
                        >
                            Видалити
                        </Button>
                    </div>
                </div>
            ))}
            <Button
                type="button"
                variant="black"
                className="my-5 bg-stone-700 py-2 px-9"
                onClick={() => addInfo(values, setValues)}
            >
                {title}
            </Button>
        </>
    );
};

export default MultiFormControl;
