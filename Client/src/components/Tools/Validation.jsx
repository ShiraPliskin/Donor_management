
export const checkValidation = (objectDetails, error, helperText, requiredFields) => {
  let isValid = true;

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

  const checkRequieredFields = () => {
    for (const field of requiredFields) {
      if (objectDetails[field].trim() === '') {
        error(prevError => ({ ...prevError, [field]: true }));
        helperText(prevHelperText => ({ ...prevHelperText, [field]: "זהו שדה חובה." }));
        isValid = false;
      }
    }
    if (!isValid) return false;
    checkValues();
  }

  const checkValues = () => {
    Object.keys(objectDetails).forEach(key => {
      switch (key) {
        case "f_name":
        case "l_name":
        case "name":
        case "spouse_name":
          checkValidate(key, isValidString, "מלא אותיות בלבד.");
          break;
        case "email":
          checkValidate(key, isValidEmail, "כתובת המייל אינה תקינה.");
          break;
        case "phone":
          checkValidate(key, isValidNumber, "מספר הטלפון אינו תקין.");
          break;
        case "password":
          checkValidate(key, isValidPassword, "הסיסמא צריכה להכיל לפחות 8 תווים כולל אותיות וספרות.");
          break;
        default: break;
      }
    });
  }

  const checkValidate = (key, validateFunc, message) => {
    const value = objectDetails[key] ?? '';
    if (value.trim() !== '' && !validateFunc(value)) {
      error(prevError => ({ ...prevError, [key]: true }));
      helperText(prevHelperText => ({ ...prevHelperText, [key]: message }));
      isValid = false;
    }
  }

  checkRequieredFields();
  return isValid;
}
