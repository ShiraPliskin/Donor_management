import { useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { userContext } from "../../App";
import { getRequest,postRequest } from "../Tools/APIRequests";
import GenericMessage from '../Tools/GenericMessage'
import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [isUserExists,setIsUserExist] = useState("");
  const [newUserId,setNewUserId] = useState(0);
  const [success,setSuccess] = useState(false);

  //const { setCurrentUser } = useContext(userContext);

  //const navigate = useNavigate();

  const register={
    "username": "",
    "email": "",
    "password":""
  }

  useEffect(() => {
    if (comment === "success") {
      setSuccess(true);
    }
  }, [comment]);
  

  async function handleSubmit(event) {
    event.preventDefault();
    setComment("");
    register.username = event.target.username.value;
    register.email = event.target.email.value;
    register.password = event.target.password.value;
    let isNew = chackisUserExist();
    if(isNew==true)
      addRegister();
  }
  
  function chackisUserExist()
  {
     getRequest("users", `?filter=username=${register.username}`, setIsUserExist,setComment);
     return isUserExists?setComment("שם משתמש קיים"):true;
  }

  function addRegister()
  {
    postRequest("users",register,setComment,setNewUserId);
    if(comment==="success")
       setSuccess(true);
      
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
      {success&&<GenericMessage message="You have successfully registered!!!" comment={comment}/>}
    </>
  )
}
export default Register