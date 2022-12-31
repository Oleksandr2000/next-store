export const toCamelCase = (str1: string, str2: string) => str1 + str2[0].toUpperCase() + str2.substring(1);

export const useFillForm = (data: any, form: any) => {
    if (typeof data === "undefined") {
        return;
    }
    Object.keys(data).map((item: any) => {
        if (Object.keys(form.values).includes(item)) {
            if (typeof data[item] === "string" || "boolean" || "number") {
                form.setFieldValue(item, data[item]);
            }
        }
        if (typeof data[item] === "object") {
            Object.keys(data[item]).map((field: any) => {
                if (Object.keys(form.values).includes(toCamelCase(item, field))) {
                    form.setFieldValue(toCamelCase(item, field), data[item][field]);
                }
            });
        }
    });
};
