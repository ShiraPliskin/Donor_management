import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest } from "../Tools/APIRequests";
import { Box } from "@mui/material";
import { config } from "../config.jsx";

const ForgotPassword = () => {
    const [comment, setComment] = useState("");
    //   const [status, setStatus] = useState("");
    const [userDetails, setUserDetails] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    //   useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("currentUser"));
    //     if (user) {
    //       navigate(`/users/${user.id}/home`);
    //     }
    //   }, []);

    //   useEffect(() => {
    //     if (status === 200)
    //       navigateToHomePage(userDetails);
    //     else if (status === 500)
    //       setComment("כתובת מייל או סיסמא שגויים.");
    //   }, [status])

    //   useEffect(() => {
    //     if (userDetails[0]) {
    //       setComment("");
    //       const passwordObject = { "password": password };
    //       getByPostRequest(`register/${userDetails[0].id}`, passwordObject, setStatus, setComment);
    //     }
    // }, [userDetails]);

    //   function navigateToHomePage(userDetails) {
    //     delete userDetails["password"];
    //     localStorage.setItem("currentUser", JSON.stringify(userDetails[0]));
    //     navigate(`/users/${userDetails[0].id}/home`);
    //   }

    const emailPostRequest = async () => {
        const emailObject = { email: userEmail };
        console.log("emailObject",emailObject)

        try {
            const response = await fetch(`register/forgotPassword/${userDetails[0].id}`, {
                headers: { 'Content-Type': 'application/json', 'Origin': `http://${config.SERVERPORT}` },
                method: 'POST',
                body: JSON.stringify(emailObject),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const data = await response.json();
            console.log("dataaaa", data);
          
            setComment("success");
            return true;

        } catch (error) {
            console.error("Error creating request:", error);
            setComment("שגיאת שרת");
            return false;
        }
    };

    useEffect(() => {
        if (userDetails[0]) {
            console.log(userDetails[0]);
            setComment("");
            emailPostRequest();
        }
    }, [userDetails]);

    const getUserByEmail = async (email) => {
        await getRequest("users", `?filter=email=${email}`, setUserDetails, setComment, "כתובת מייל");
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        setUserEmail(email);
        await getUserByEmail(email);
    };

    return (
        <>
            <div className={style.wrapper}>
                <h1>איפוס הסיסמא</h1>
                <form onSubmit={handleFormSubmit} className={style.inputBox}>
                    <input name="email" type="text" placeholder="כתובת מייל" required />
                    {/* <input name="password" type="password" placeholder="סיסמה" required /> */}
                    {/* <a onClick={forgotPassword}>שכחת את הסיסמא שלך?</a> */}
                    <button type="submit">הבא</button>
                </form>
                {comment && <Box marginTop={"10px"} color={"red"}>{comment}</Box>}
            </div>
        </>
    );
};

export default ForgotPassword;