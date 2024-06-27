import { useState, useContext, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { getRequest,postRequest } from "../Tools/APIRequests";
import GenericMessage from '../Tools/GenericMessage'
import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [isUserExists, setIsUserExist] = useState("");
  const [success, setSuccess] = useState(false);
  const [userId, setUserId]= useState("0");

  const user={
    "name": "",
    "email": "",
    "password":""
  }  
  const [currentUser, setCurrentUser] = useState(user);

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    // const name = event.target.name.value;
    // const email = event.target.email.value;
    // const password = event.target.password.value;
    setCurrentUser(prevState => ({
      ...prevState,
        ["name"]: event.target.name.value,
        ["email"]:event.target.email.value,
        ["password"]:event.target.password.value
      }));
    let isNew = chackisUserExist();
    if(isNew==true)
      adduser();
  }
  
  function chackisUserExist()
  {
     getRequest("users", `?filter=email=${currentUser.email}`, setIsUserExist,setComment);
     return isUserExists?setComment("שם משתמש קיים"):true;
  }

  useEffect(() => { 
    if (userId!=0)
      {
        setCurrentUser(prevState => ({
          ...prevState,
            ["id"]: userId,
            ["permission"]:"secretary",
          }));
        currentUser.id=userId;
        delete currentUser["password"];
        currentUser.permission = "secretary";
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        navigate(`users/${currentUser.id}/home`, { replace: true });
      }
  },[userId])


  function adduser()
  {
    postRequest("users",currentUser,setComment,setUserId);
  }

  useEffect(() => {
    if (comment === "success") {
      setSuccess(true);
    }
  }, [comment]);

  useEffect(() => {
    setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
  }, [PW.password, PW.verifyPW])

  return (
    <>
      <div className={style.wrapper}>
        <h1>משתמש חדש</h1>
        <form onSubmit={handleSubmit} className={style.inputBox}>
          <input name="name" type="text" placeholder="שם משתמש" required />
          <input name="email" type="text" placeholder="מייל" required />
          <input placeholder="סיסמה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
          <input placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
          <button disabled={!isPwVerified} type="submit">המשך</button>
        </form>
      </div>
      <p>{comment}</p>
      {success&&<GenericMessage message="נרשמת בהצלחה!!!" comment={comment}/>}
      <p className={style.link}>משתמש קיים?   <Link to={"/Login"}>לחץ להתחברות</Link></p>
    </>
  )
}
export default Register