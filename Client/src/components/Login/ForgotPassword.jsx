// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import style from "./Login.module.css";
// import { getRequest } from "../Tools/APIRequests";
// import { Box } from "@mui/material";
// import { config } from "../config.jsx";

// const ForgotPassword = () => {
//     const [comment, setComment] = useState("");
//     //   const [status, setStatus] = useState("");
//     const [userDetails, setUserDetails] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//     const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
//     const [otp, setOtp] = useState("");
//     const [registerStep, setRgisterStep] = useState();
//     const [isPwVerified, setIsPwVerified] = useState(false);


//     const navigate = useNavigate();

//     //   useEffect(() => {
//     //     const user = JSON.parse(localStorage.getItem("currentUser"));
//     //     if (user) {
//     //       navigate(`/users/${user.id}/home`);
//     //     }
//     //   }, []);

//     //   useEffect(() => {
//     //     if (status === 200)
//     //       navigateToHomePage(userDetails);
//     //     else if (status === 500)
//     //       setComment("כתובת מייל או סיסמא שגויים.");
//     //   }, [status])

//     //   useEffect(() => {
//     //     if (userDetails[0]) {
//     //       setComment("");
//     //       const passwordObject = { "password": password };
//     //       getByPostRequest(`register/${userDetails[0].id}`, passwordObject, setStatus, setComment);
//     //     }
//     // }, [userDetails]);

//     //   function navigateToHomePage(userDetails) {
//     //     delete userDetails["password"];
//     //     localStorage.setItem("currentUser", JSON.stringify(userDetails[0]));
//     //     navigate(`/users/${userDetails[0].id}/home`);
//     //   }

//     const emailPostRequest = async () => {
//         const emailObject = { email: userEmail };
//         console.log("i in emailPostRequest", userDetails[0].id)

//         try {
//             const response = await fetch(`http://${config.SERVERPORT}/register/forgotPassword/${userDetails[0].id}`, {
//                 headers: { 'Content-Type': 'application/json', 'Origin': `http://${config.SERVERPORT}` },
//                 method: 'POST',
//                 body: JSON.stringify(emailObject),
//                 credentials: 'include'
//             });
//             if (!response.ok) {
//                 throw new Error(`Request failed with status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log("dataaaa", data);

//             setComment("success");
//             return true;

//         } catch (error) {
//             console.error("Error creating request:", error);
//             setComment("שגיאת שרת");
//             return false;
//         }
//     };

//     useEffect(() => {
//         setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
//     }, [PW.password, PW.verifyPW])

//     useEffect(() => {
//         if (userDetails[0]) {
//             console.log(userDetails[0]);
//             setComment("");
//             emailPostRequest();
//         }
//     }, [userDetails]);

//     useEffect(() => {
//         if (comment !== "") {
//             setRgisterStep("2");
//         }
//     }, [comment]);

//     const getUserByEmail = async (email) => {
//         await getRequest("users", `?filter=email=${email}`, setUserDetails, setComment, "כתובת מייל");
//     }

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         const email = event.target.email.value;
//         setUserEmail(email);
//         await getUserByEmail(email);
//     };

//     const handleUpdatePassword = async (event) => {
//         event.preventDefault();
//         const updateObject = { otp: otp, password: PW["password"] };
//         console.log("i in emailPostRequest", userDetails[0].id)

//         try {
//             const response = await fetch(`http://${config.SERVERPORT}/register/forgotPassword/${userDetails[0].id}`, {
//                 headers: { 'Content-Type': 'application/json', 'Origin': `http://${config.SERVERPORT}` },
//                 method: 'PUT',
//                 body: JSON.stringify(updateObject),
//                 credentials: 'include'
//             });
//             if (!response.ok) {
//                 throw new Error(`Request failed with status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log("dataaaa", data);

//             setComment("success");
//             return true;

//         } catch (error) {
//             console.error("Error creating request:", error);
//             setComment("שגיאת שרת");
//             return false;
//         }
//     };

//     return (
//         <>
//             <div className={style.wrapper}>
//                 <h1>איפוס הסיסמא</h1>
//                 {registerStep === 1 && <form onSubmit={handleFormSubmit} className={style.inputBox}>
//                     <input disabled={registerStep !== 1} name="email" type="text" placeholder="כתובת מייל" required />
//                     <button type="submit">הבא</button>
//                 </form>}
//                 {registerStep === 2 && <form onSubmit={handleUpdatePassword} className={style.inputBox}>
//                     <input disabled={registerStep !== 1} name="email" type="text" placeholder={userEmail} required />
//                     <input disabled={registerStep === 1} placeholder="סיסמה זמנית" onChange={(e) => setOtp(e.target.value)} name="otp" type="otp" />
//                     <input disabled={registerStep === 1} placeholder="סיסמה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
//                     <input disabled={registerStep === 1} placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
//                     <button disabled={!isPwVerified} type="submit">כניסה</button>
//                 </form>}
//                 {comment && <Box marginTop={"10px"} color={"red"}>{comment}</Box>}
//             </div>
//         </>
//     );
// };

// export default ForgotPassword;


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
    const [registerStep, setRegisterStep] = useState(1);
    const [isPwVerified, setIsPwVerified] = useState(false);
    const navigate = useNavigate();

    const getUserByEmail = async (email) => {
        await getRequest("users", `?filter=email=${email}`, setUserDetails, setComment, "כתובת מייל");
    }

    const emailPostRequest = async () => {
        const emailObject = { email: userEmail };
        console.log("i in emailPostRequest", userDetails[0].id)

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
            console.log("dataaaa", data);

            setComment("success");
            return true;

        } catch (error) {
            console.error("Error creating request:", error);
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
            console.error("Error creating request:", error);
            setComment("שגיאת שרת");
            return false;
        }
    };

    useEffect(() => {
        setIsPwVerified(PW.password !== "" && PW.password === PW.verifyPW);
    }, [PW.password, PW.verifyPW]);

    useEffect(() => {
        if (comment === "success") {
            setRegisterStep(2);
        }
    }, [comment]);

    useEffect(() => {
        if (userDetails[0]) {
            console.log(userDetails[0]);
            setComment("");
            emailPostRequest();
        }
    }, [userDetails]);

    return (
        <div className={style.wrapper}>
            <h1>איפוס הסיסמא</h1>
            {registerStep === 1 && (
                <form onSubmit={handleFormSubmit} className={style.inputBox}>
                    <input name="email" type="text" placeholder="כתובת מייל" required />
                    <button type="submit">הבא</button>
                </form>
            )}
            {registerStep === 2 && (
                <form onSubmit={handleUpdatePassword} className={style.inputBox}>
                    <input placeholder="סיסמה זמנית" onChange={(e) => setOtp(e.target.value)} name="otp" type="password"/>
                    <input placeholder="סיסמה חדשה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
                    <input placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
                    <button disabled={!isPwVerified} type="submit">כניסה</button>
                </form>
            )}
            {comment && <Box marginTop="10px" color="red">{comment}</Box>}
        </div>
    );
};

export default ForgotPassword;