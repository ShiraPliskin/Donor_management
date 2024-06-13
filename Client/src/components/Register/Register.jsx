import { useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { userContext } from "../../App";
import { getRequest,postRequest } from "../Tools/APIRequests";

import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [isUserExists,setIsUserExist] = useState("")
  //const { setCurrentUser } = useContext(userContext);

  //const navigate = useNavigate();
  const user = {
    "username": "",
    "email": ""
  }

  const register={
    "user_id":"",
    "password":""
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setComment("");
    user.username = event.target.username.value;
    user.email = event.target.email.value;
    register.password = event.target.password.value;
    let isNew = chackisUserExist();
    if(isNew==true)
      addUser();
  }

  
  function chackisUserExist()
  {
     getRequest("users", `?filter=username=${user.username}`, setIsUserExist,setComment);
     return isUserExists?setComment("this username already exist"):true;
  }

  function addUser() {
    postRequest("users",user,setComment);
    postRequest("register",register,setComment);
    // localStorage.setItem("currentUser", JSON.stringify(user));
    // setCurrentUser(user);
    //navigate("/home", { replace: true });
  }

  useEffect(() => {
    setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
  }, [PW.password, PW.verifyPW])

  return (
    <>
      <div className={style.wrapper}>
        <h1>Please sign up</h1>
        <form onSubmit={handleSubmit} className={style.inputBox}>
          <input name="username" type="text" placeholder="שם משתמש" required />
          <input name="email" type="text" placeholder="מייל" required />
          <input placeholder="סיסמה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
          <input placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
          <button disabled={!isPwVerified} type="submit">המשך</button>
        </form>
      </div>
      <p>{comment}</p>
    </>
  )
}
export default Register