import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest, getByPostRequest } from "../Tools/APIRequests";

const Login = () => {
  const [comment, setComment] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 200)
      navigateToHomePage(userDetails);
    else if (status === 500)
      setComment("שם משתמש או סיסמא שגויים");
  }, [status])

  useEffect(() => {
    if (userDetails[0]) {
      const passwordObject = { "password": password };
      getByPostRequest(`register/${userDetails[0].id}`, passwordObject, setComment, setStatus);
    }
  }, [userDetails]);

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
        <p>{comment}</p>
        <p className={style.link}>אין לך חשבון עדיין?  <Link to={"/register"}>לחץ להרשמה</Link></p>
      </div>
    </>
  );
};

export default Login;