
export const filterEmptyValues = (obj) => {
    return Object.keys(obj)
        .filter(key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '')
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
};

const isValidUsername = (inputString) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(inputString);
  };

  const isValidPassword = (inputString) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&^#*]{8,}$/;
    return regex.test(inputString);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidString = (inputString) => {
    const regex = /^[A-Za-z\u0590-\u05FF\s]+$/;
    return regex.test(inputString);
  };

  const isValidNumber = (inputString) => {
    const regex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/;
    return regex.test(inputString);
  };

 export {
    isValidUsername,
    isValidPassword,
    isValidEmail,
    isValidString,
    isValidNumber
 }