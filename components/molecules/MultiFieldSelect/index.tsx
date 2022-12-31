import { IMultiFieldSelectProps } from "./MultiFieldSelect.props";

import Button from "../../atoms/Button";
import FieldSelect from "../FieldSelect";

const MultiFieldSelect = ({
    disabledSelect = false,
    keys,
    placeholder,
    title,
    values,
    onChange,
    options,
}: IMultiFieldSelectProps) => {
    const addField = () => {
        onChange([...values, { id: Date.now() }]);
    };

    const removeField = (id: any) => {
        onChange(values.filter((item: any) => item.id !== id));
    };

    return (
        <>
            {values.map((item: any) => (
                <div key={item.id} className="mt-3 grid grid-cols-[3fr_1fr] gap-4">
                    <div>
                        <FieldSelect
                            currentOption={{ label: item[keys[0]], value: item[keys[1]] }}
                            currentValue={values.filter((value: any) => item.id === value.id)[0][keys[1]]}
                            placeholder={placeholder}
                            id={item.id}
                            options={options}
                            selectId={item.name}
                            handleChange={onChange}
                            values={values}
                            keys={keys}
                            disabledSelect={disabledSelect}
                        />
                    </div>
                    <div>
                        <Button type="button" className="w-full bg-red-900 py-1" onClick={() => removeField(item.id)}>
                            Видалити
                        </Button>
                    </div>
                </div>
            ))}
            <Button type="button" variant="black" className="my-5 bg-stone-700 py-2 px-9" onClick={addField}>
                {title}
            </Button>
        </>
    );
};

export default MultiFieldSelect;
