export const isDate = (func: unknown) => {
    return func === Date;
};

export const isNumber = (func: unknown) => {
    return func === Number;
};

export const isString = (func: unknown): boolean => {
    return func === String;
};

export const isBoolean = (func: unknown): boolean => {
    return typeof func === 'boolean';
};
