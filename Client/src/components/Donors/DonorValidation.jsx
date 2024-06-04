
export const checkValidation = (donorDetails, setCommentArea) => {
    const requiredFields = ["f_name", "l_name", "address"];
    for (const field of requiredFields) {
        if (!donorDetails[field]) {
            setCommentArea("נא מלא את כל שדות החובה המסומנים ב - *");
            return false;
        }
    }
    if (donorDetails["email"] && !isValidEmail(donorDetails["email"])) {
        setCommentArea("כתובת המייל אינה תקינה.");
        return false;
    }
    if (donorDetails["phone"] && !isValidNumber(donorDetails["phone"])) {
        setCommentArea("מספר הטלפון אינו תקין.");
        return false;
    }
    return true;
}


const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

const isValidNumber = (inputString) => {
    const regex = /^[-0-9]+$/;
    return regex.test(inputString);
};