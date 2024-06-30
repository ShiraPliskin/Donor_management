import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest, getByPostRequest } from "../Tools/APIRequests";
// import GenericMessage from '../Tools/GenericSuccessMessage'

const Login = () => {
  const [comment, setComment] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails[0]) {
      const passwordObject = {"password" : password};
      const isPasswordCorrect = getByPostRequest(`register/${userDetails[0].id}`, passwordObject, setComment);
      isPasswordCorrect? navigateToHomePage(userDetails): setErrorMessage("שם משתמש או סיסמא שגויים");
    } 
  }, [userDetails, password, comment]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setPassword(password);
    getRequest("users", `?filter=email=${email}`, setUserDetails, setComment);
  };

  function navigateToHomePage(userDetails) {
    delete userDetails["password"];
    localStorage.setItem("currentUser", JSON.stringify(userDetails[0]));
    navigate(`/users/${userDetails[0].id}/home`);
  }

  return (
    <>
      <div className={style.wrapper}>
        <h1>התחברות</h1>
        <form onSubmit={handleFormSubmit} className={style.inputBox}>
          <input name="email" type="text" placeholder="מייל" required />
          <input name="password" type="password" placeholder="סיסמה" required />
          <button type="submit">המשך</button>
        </form>
        <p>{errorMessage}</p>
        {/* {errorMessage && <GenericMessage message="שם משתמש או סיסמא שגויים" type="error" />} */}
        <p className={style.link}>אין לך חשבון עדיין?  <Link to={"/register"}>לחץ להרשמה</Link></p>
      </div>
    </>
  );
};

export default Login;