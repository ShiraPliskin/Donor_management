import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { getRequest } from "../Tools/APIRequests";

import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [registerStep, setRgisterStep] = useState(1);
  const [isUserExists,setIsUserExist] = useState("")
  const { setCurrentUser } = useContext(userContext);

  const navigate = useNavigate();
  const user = {
    "username": "",
    "email": ""
  }

  const register={
    "user_id":"",
    "password":""
  }

  function handleNextBtn(event) {
    event.preventDefault();
    setErrMessage("");
    fetch(`http://localhost:3000/users?username=${event.target.username.value}`)
      .then(result => result.json())
      .then(json => json.length ? setErrMessage("This username already exists") : requestMoreDetails(event))
      .catch(error => setErrMessage("ERROR try agian"))
  }

  function requestMoreDetails(event) {
    user.username = event.target.username.value;
    user.website = event.target.password.value;
    setRgisterStep(2);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrMessage("");
    user.username = event.target.username.value;
    user.email = event.target.email.value;
    register.password = event.target.password.value;
    chackDetails();
  }

  
  function chackDetails()
  {
     getRequest("users", `filter=username=${user.username}`, setIsUserExist,setErrMessage);
     return isUserExists[0].username?setErrMessage("this username already exist"):true;
  }

  function addUser() {
    fetch("http://localhost:3000/users", {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          fetch("http://localhost:3000/config/1", {
            method: 'PATCH',
            body: JSON.stringify({ "userId": (Number)(user.id) + 1 }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then().catch(err => console.error(err))
          delete user["website"]
          localStorage.setItem("currentUser", JSON.stringify(user));
          setCurrentUser(user);
          navigate("/home", { replace: true });
        }
        else {
          setErrMessage("500 something get worng:( try latter.")
        }
      })
  }

  useEffect(() => {
    setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
  }, [PW.password, PW.verifyPW])

  return (
    <>
      <div className={style.wrapper}>
        <h1>Please sign up</h1>
        <form onSubmit={handleSubmit} className={style.inputBox}>
          <input name="username" type="text" placeholder="usernane" required />
          <input name="email" type="text" placeholder="email" required />
          <input placeholder="password" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
          <input placeholder="verify password" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
          <button disabled={!isPwVerified} type="submit">Next</button>
        </form>
      </div>
      <p>{errMessage}</p>
    </>
  )
}
export default Register