import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest} from "../Tools/APIRequests"; 
import GenericMessage from '../Tools/GenericMessage'

const Login = () => {
  const [comment, setComment] = useState("");
  const [userDetails,setUserDetails] = useState("");
  const [errorMessage,setErrorMessage]= useState(false);
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    getRequest("users", `?filter=email=${email}`, setUserDetails,setComment);
    userDetails?navigateToHomePage(userDetails):setErrorMessage(true);
  }

  function navigateToHomePage(userDetails) {
    delete userDetails["password"];
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    navigate("/users/:userId/home");
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
        {errorMessage&&<GenericMessage message="שם משתמש או סיסמא שגויים" type="error"/>}
        <p className={style.link}>אין לך חשבון עדיין?  <Link to={"/register"}>לחץ להרשמה</Link></p>
      </div>
    </>
  );
};

export default Login;
