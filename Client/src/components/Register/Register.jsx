import { useState, useContext, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { getRequest,postRequest } from "../Tools/APIRequests";
import GenericMessage from '../Tools/GenericMessage'
import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [isUserExists,setIsUserExist] = useState("");
  const [success,setSuccess] = useState(false);
  const [userId,setUserId]= useState("0");
  const navigate = useNavigate();

  const user={
    "name": "",
    "email": "",
    "password":""
  }  

  async function handleSubmit(event) {
    event.preventDefault();
    user.name = event.target.name.value;
    user.email = event.target.email.value;
    user.password = event.target.password.value;
    console.log("email   "+user.email)
    let isNew = chackisUserExist();
    if(isNew==true)
      adduser();
  }
  
  function chackisUserExist()
  {
    console.log("chackisUserExist   "+user.email)

     getRequest("users", `?filter=email=${user.email}`, setIsUserExist,setComment);
     return isUserExists?setComment("שם משתמש קיים"):true;
  }

  useEffect(() => { 
    if (userId!=0)
      {
        console.log("effect   "+user.email)

        user.id=userId;
        delete user["password"];
        user.permission = "secretary";
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate(`users/${user.id}/home`, { replace: true });
      }
  },[userId])


  function adduser()
  {
    console.log("addUser   "+user.email)

    postRequest("users",user,setComment,setUserId);
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