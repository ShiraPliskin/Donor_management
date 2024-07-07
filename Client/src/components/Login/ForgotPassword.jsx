import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { Box } from "@mui/material";
import { getRequest, postRequest } from "../Tools/APIRequests";
import { config } from "../config.jsx";

const ForgotPassword = () => {
    const [comment, setComment] = useState("");
    const [userDetails, setUserDetails] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [PW, setPW] = useState({ password: "", verifyPW: "" });
    const [otp, setOtp] = useState("");
    const [realOtp, setRealOtp] = useState("");
    const [registerStep, setRegisterStep] = useState(1);
    const [isPwVerified, setIsPwVerified] = useState(false);
    const [title, seTtitle] = useState("אימות משתמש");

    const navigate = useNavigate();

    const getUserByEmail = async (email) => {
        await getRequest("users", `?filter=email=${email}`, setUserDetails, setComment, "שכחתי סיסמה");
    }

    const emailPostRequest = async () => {
        const emailObject = { email: userEmail };
        try {
            const response = await fetch(`http://${config.SERVERPORT}/register/forgotPassword/${userDetails[0].id}`, {
                headers: { 'Content-Type': 'application/json', 'Origin': `http://${config.SERVERPORT}` },
                method: 'POST',
                body: JSON.stringify(emailObject),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            setRealOtp(data.otp);
            setComment("נא הזן את הסיסמה הזמנית שנשלחה למייל שלך.")
            setRegisterStep(2);
            return true;

        } catch (error) {
            setComment("שגיאת שרת");
            return false;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        setUserEmail(email);
        await getUserByEmail(email);

    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&^#*]{8,}$/;
        const isValid = regex.test(PW.verifyPW);
        if (!isValid) setComment("הסיסמא צריכה להכיל לפחות 8 תווים כולל אותיות וספרות.")
        else handlePutRequest();
    }

    const handleOtpBtn = (event) => {
        event.preventDefault();
        if (otp !== realOtp) {
            setComment("הסיסמה הזמנית שגויה.")
        } else {
            setComment("")
            setRegisterStep(3);
        }
    }

    const handlePutRequest = async () => {
        const updateObject = { otp: otp, password: PW.password };
        try {
            const response = await fetch(`http://${config.SERVERPORT}/register/forgotPassword/${userDetails[0].id}`, {
                headers: { 'Content-Type': 'application/json', 'Origin': `http://${config.SERVERPORT}` },
                method: 'PUT',
                body: JSON.stringify(updateObject),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("currentUser", JSON.stringify(userDetails[0]));
            navigate(`/users/${userDetails[0].id}/home`, { replace: true });
            return true;

        } catch (error) {
            setComment("שגיאת שרת");
            return false;
        }
    };

    useEffect(() => {
        setIsPwVerified(PW.password !== "" && PW.password === PW.verifyPW);
    }, [PW.password, PW.verifyPW]);

    useEffect(() => {
        if (registerStep !== 1) {
            if (registerStep === 2) seTtitle("אימות סיסמה זמנית");
            else seTtitle("בחר סיסמה חדשה");
        }
    }, [registerStep]);

    useEffect(() => {
        if (userDetails[0]) {
            setComment("כעת נשלח לך מייל עם סיסמה זמנית, נא הכנס אותה כאן");
            emailPostRequest();
        }
    }, [userDetails]);

    return (<>
        <h2>צילו של היכל - ניהול תורמים</h2>
        <div className={style.wrapper}>
            <h1>{title}</h1>
            {registerStep === 1 && (
                <form onSubmit={handleFormSubmit} className={style.inputBox}>
                    <input name="email" type="text" placeholder="כתובת מייל" required />
                    <button type="submit">הבא</button>
                </form>
            )}
            {registerStep === 2 && (
                <form onSubmit={handleOtpBtn} className={style.inputBox}>
                    {registerStep === 2 && <input error="true" placeholder="סיסמה זמנית" onChange={(e) => setOtp(e.target.value)} name="otp" type="password" />}
                    <button type="submit">הבא</button>
                </form>
            )}

            {registerStep === 3 && (
                <form onSubmit={handleUpdatePassword} className={style.inputBox}>
                    <input placeholder="סיסמה חדשה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
                    <input placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
                    <button disabled={!isPwVerified} type="submit" style={{ backgroundColor: !isPwVerified ? "#a5a5a5" : undefined }}>כניסה</button>
                </form>
            )}

            {comment && <Box marginTop="10px" color={registerStep === 2 && comment !== "הסיסמה הזמנית שגויה." ? "black" : "red"}>{comment}</Box>}
        </div>
    </>
    );
};

export default ForgotPassword;
