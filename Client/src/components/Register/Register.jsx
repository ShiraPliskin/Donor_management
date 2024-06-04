import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import style from "./Register.module.css"
const Register = () => {
  const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [registerStep, setRgisterStep] = useState(1);
  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const user = {
    "username": "",
    "email": "",
    "password": ""
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
    user.id = await getNextId() ?? alert("sorry, try later");
    user.name = event.target.name.value;
    user.email = event.target.email.value;
    user.address.street = event.target.street.value;
    user.address.suite = event.target.suite.value;
    user.address.city = event.target.city.value;
    user.address.zipcode = event.target.zipcode.value;
    user.address.geo.lat = event.target.lat.value;
    user.address.geo.lng = event.target.lng.value;
    user.phone = event.target.phone.value;
    user.company.name = event.target.companyName.value;
    user.company.catchPhrase = event.target.catchPhrase.value;
    user.company.bs = event.target.bs.value;
    addUser();
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

  async function getNextId() {
    const id = await fetch("http://localhost:3000/config/1")
    //http://${config.SERVERPORT}/${table}/${id}}
      .then(result => result.json())
      .then(json => json.userId)
      .catch(error => console.error(error));
    return id.toString();
  }

  useEffect(() => {
    setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
  }, [PW.password, PW.verifyPW])

  return (
    <>
      <div className={style.wrapper}>
        <h1>Please sign up</h1>
        <form onSubmit={(event) => handleNextBtn(event)} className={style.inputBox}>
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