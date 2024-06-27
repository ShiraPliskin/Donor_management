// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { checkIfExist, postRequest } from "../Tools/APIRequests";
// import GenericMessage from '../Tools/GenericMessage'
// import style from "./Register.module.css"

// const Register = () => {

//   const [isPwVerified, setIsPwVerified] = useState(false);
//   const [comment, setComment] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [userId, setUserId]= useState("");
//   // const navigate = useNavigate();

//   const passwordFields = {
//     password: '',
//     verifyPW: ''
//   }

//   const userFields = {
//     id: '',
//     name: '',
//     email: '',
//     permition: '',
//     password: '',
// };

//   const [PW, setPW] = useState(passwordFields)
//   const [currentUser, setCurrentUser] = useState(userFields);

//   useEffect(() => { 
//     if (userId)
//       {
//         setCurrentUser(prevState => ({
//           ...prevState,
//             ["id"]: userId,
//             ["permission"]: "secretary",
//           }));
//         delete currentUser["password"];
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         // navigate(`users/${currentUser.id}/home`, { replace: true });
//       }
//   },[userId])

//   useEffect(() => {
//     if (comment === "success") {
//       setSuccess(true);
//     }
//   }, [comment]);

//   useEffect(() => {
//     setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
//   }, [PW])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setCurrentUser(prevState => ({
//       ...prevState,
//         ["name"]: e.target.name.value,
//         ["email"]:e.target.email.value,
//         ["password"]:e.target.password.value
//       }));
//     chackIsUserExist();
//   }

//   const chackIsUserExist = async () => {
//     const isNew = await checkIfExist("users", `?filter=email=${currentUser.email}`, setComment);
//     if(isNew)
//       adduser();
//   }

//   const adduser = () => {
//     postRequest("users", currentUser, setComment, setUserId);
//   }

//   return (
//     <>
//       <div className={style.wrapper}>
//         <h1>משתמש חדש</h1>
//         <form onSubmit={handleSubmit} className={style.inputBox}>
//           <input name="name" type="text" placeholder="שם משתמש" required />
//           <input name="email" type="text" placeholder="מייל" required />
//           <input placeholder="סיסמה" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
//           <input placeholder="אימות סיסמה" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
//           <button disabled={!isPwVerified} type="submit">המשך</button>
//         </form>
//       </div>
//       <p>{comment}</p>
//       {success&&<GenericMessage message="נרשמת בהצלחה" type={comment}/>}
//       <p className={style.link}>משתמש קיים?<Link to={"/Login"}>לחץ להתחברות</Link></p>
//     </>
//   )
// }
// export default Register

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIfExist, postRequest } from "../Tools/APIRequests";
import GenericMessage from '../Tools/GenericMessage';
import style from "./Register.module.css";

const Register = () => {
  const [isPwVerified, setIsPwVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [userFields, setUserFields] = useState({
    id: '',
    name: '',
    email: '',
    permission: '',
    password: '',
    verifyPW: ''
  });

  useEffect(() => { 
    if (userId) {
      const updatedUser = {
        ...userFields,
        id: userId,
        permission: "secretary"
      };
      const { password, verifyPW, ...userWithoutPassword } = updatedUser;
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      navigate(`users/${updatedUser.id}/home`, { replace: true });
    }
  }, [userId, userFields, navigate]);

  useEffect(() => {
    if (comment === "success") {
      setSuccess(true);
    }
  }, [comment]);

  useEffect(() => {
    setIsPwVerified(userFields.password !== "" && userFields.password === userFields.verifyPW);
  }, [userFields.password, userFields.verifyPW]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserFields = {
      ...userFields,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    setUserFields(updatedUserFields);
    checkIsUserExist(updatedUserFields);
  };

  const checkIsUserExist = async (user) => {
    const isNew = await checkIfExist("users", `?filter=email=${user.email}`, setComment);
    if (isNew) {
      addUser(user);
    }
  };

  const addUser = (user) => {
    postRequest("users", user, setComment, setUserId);
  };

  return (
    <>
      <div className={style.wrapper}>
        <h1>משתמש חדש</h1>
        <form onSubmit={handleSubmit} className={style.inputBox}>
          <input name="name" type="text" placeholder="שם משתמש" required />
          <input name="email" type="text" placeholder="מייל" required />
          <input 
            placeholder="סיסמה" 
            onChange={(e) => setUserFields(prev => ({ ...prev, password: e.target.value }))} 
            name="password" 
            type="password" 
            required 
          />
          <input 
            placeholder="אימות סיסמה" 
            onChange={(e) => setUserFields(prev => ({ ...prev, verifyPW: e.target.value }))} 
            name="verifyPassword" 
            type="password" 
            required 
          />
          <button disabled={!isPwVerified} type="submit">המשך</button>
        </form>
      </div>
      <p>{comment}</p>
      {success && <GenericMessage message="נרשמת בהצלחה" type={comment} />}
      <p className={style.link}>משתמש קיים?<Link to="/Login">לחץ להתחברות</Link></p>
    </>
  );
};

export default Register;
