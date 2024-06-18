//import React, { useContext } from "react";
import { useState } from "react";
//import { userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { getRequest} from "../Tools/APIRequests"; 
import GenericMessage from '../Tools/GenericMessage'

const Login = () => {
  const [comment, setComment] = useState("");
  const [userDetails,setUserDetails] = useState("");
  const [errorMessage,setErrorMessage]=(false);
  //const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    getRequest("users", `?filter=username=${username}`, setUserDetails,setComment);
    userDetails?navigateToHomePage(userDetails):setErrorMessage(true);
  }

  function navigateToHomePage(userDetails) {
    delete userDetails["website"];
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    //navigate("/home");
    setCurrentUser(userDetails);
  }

  return (
    <>
      <div className={style.wrapper}>
        <h1>Please Log In</h1>
        <form onSubmit={handleFormSubmit} className={style.inputBox}>
            <input name="username" type="text" placeholder="username" required />
            <input name="password" type="password" placeholder="password" required />
            <button type="submit">Submit</button>
        </form>
        <p>{errorMessage}</p>
        {errorMessage&&<GenericMessage message="שם משתמש או סיסמא שגויים" type="error"/>}
        <p className={style.link}>
          Don't have an account yet? Let's <Link to={"/register"}>sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
