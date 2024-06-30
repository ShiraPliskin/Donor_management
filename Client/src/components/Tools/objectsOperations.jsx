import _ from 'lodash';

export const filterEmptyValues = (obj) => {
    return Object.keys(obj)
        .filter(key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '')
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
};

export const isEmptyObject = (obj) => {
    for (let key in obj) {
        if (obj[key] !== "") {
            return false; 
        }
    }
    return true; 
};

export const trimObjectStrings = (obj) => {
    return _.mapValues(obj, value => _.isString(value) ? value.trim() : value);
};
