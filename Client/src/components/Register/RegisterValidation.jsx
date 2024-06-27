import { isValidEmail, isValidString , isValidPassword} from '../Tools/Validation'

export const checkValidation = (donorDetails, error, helperText) => {
    let isValid = true;
    const requiredFields = ["name", "email"];

    const checkRequieredFields = () => {
        for (const field of requiredFields) {
            if (!donorDetails[field]) {
                error(prevError => ({ ...prevError, [field]: true }));
                helperText(prevHelperText => ({ ...prevHelperText, [field]: "זהו שדה חובה." }));
                isValid = false;
            }
        }
        if (!isValid) return false;
        checkValues();
    }

    const checkValues = () => {
        Object.keys(donorDetails).forEach(key => {
            switch (key) {
                case "name":
                    checkValidate(key, isValidString, "מלא אותיות בלבד.");
                    break;
                case "email":
                    checkValidate(key, isValidEmail, "כתובת המייל אינה תקינה.");
                    break;
                case "password":
                    checkValidate(key, isValidPassword, "הסיסמא צריכה להכיל לפחות 8 תווים כולל אותיות וספרות.");
                    break;
                default: break;
            }
        });
    }

    const checkValidate = (key, validateFunc, message) => {
        const value = donorDetails[key] ?? ''; 
        if (value.trim() !== '' && !validateFunc(value)) {
            error(prevError => ({ ...prevError, [key]: true }));
            helperText(prevHelperText => ({ ...prevHelperText, [key]: message }));
            isValid = false;
        }
    }

    checkRequieredFields();
    return isValid;
}
