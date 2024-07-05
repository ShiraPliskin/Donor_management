import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest, getByPostRequest } from "../Tools/APIRequests";
import { Box } from "@mui/material";

const Login = () => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      navigate(`/users/${user.id}/home`);
    }
  }, []);

  useEffect(() => {
    if (status === 200)
      navigateToHomePage(userDetails);
    else if (status === 500)
      setComment("כתובת מייל או סיסמא שגויים.");
  }, [status])

  useEffect(() => {
    if (userDetails[0]) {
      setComment("");
      const passwordObject = { "password": password };
      getByPostRequest(`register/${userDetails[0].id}`, passwordObject, setStatus, setComment);
    }
}, [userDetails]);

  function navigateToHomePage(userDetails) {
    delete userDetails["password"];
    localStorage.setItem("currentUser", JSON.stringify(userDetails[0]));
    navigate(`/users/${userDetails[0].id}/home`);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setPassword(password);
    getRequest("users/login", `?filter=email=${email}`, setUserDetails, setComment, "כתובת מייל");
  };

  const forgotPassword = () => {
    navigate(`/forgotPassword`);
  }

  return (
    <>
      <div className={style.wrapper}>
        <h1>התחברות</h1>
        <form onSubmit={handleFormSubmit} className={style.inputBox}>
          <input name="email" type="text" placeholder="כתובת מייל" required />
          <input name="password" type="password" placeholder="סיסמה" required />
          <a onClick={forgotPassword}>שכחת את הסיסמא שלך?</a>
          <button type="submit">כניסה</button>
        </form>
        {comment && <Box marginTop={"10px"} color={"red"}>{comment}</Box>}
        <p>אין לך עדיין חשבון? פנה למנהל להרשמה</p>
      </div>
    </>
  );
};

export default Login;