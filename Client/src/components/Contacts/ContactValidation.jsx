import { isValidEmail, isValidNumber, isValidString } from '../Tools/Validation'

export const checkValidation = (contactDetails, error, helperText) => {
    let isValid = true;
    const requiredFields = ["name", "phone"];

    const checkRequieredFields = () => {
        for (const field of requiredFields) {
            if (!contactDetails[field]) {
                error(prevError => ({ ...prevError, [field]: true }));
                helperText(prevHelperText => ({ ...prevHelperText, [field]: "זהו שדה חובה." }));
                isValid = false;
            }
        }
        if (!isValid) return false;
        checkValues();
    }

    const checkValues = () => {
        Object.keys(contactDetails).forEach(key => {
            switch (key) {
                case "name":
                    checkValidate(key, isValidString, "מלא אותיות בלבד.");
                    break;
                case "email":
                    checkValidate(key, isValidEmail, "כתובת המייל אינה תקינה.");
                    break;
                case "phone":
                    checkValidate(key, isValidNumber, "מספר הטלפון אינו תקין.");
                    break;
                default: break;
            }
        });
    }

    const checkValidate = (key, validateFunc, message) => {
        const value = contactDetails[key] ?? ''; 
        if (value.trim() !== '' && !validateFunc(value)) {
            error(prevError => ({ ...prevError, [key]: true }));
            helperText(prevHelperText => ({ ...prevHelperText, [key]: message }));
            isValid = false;
        }
    }

    checkRequieredFields();
    return isValid;
}
