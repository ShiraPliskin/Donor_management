import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIfExist, postRequest } from "../Tools/APIRequests";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { checkValidation } from './RegisterValidation'
import GenericMessage from '../Tools/GenericSuccessMessage';

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
    permission: "secretary",
    password: '',
    verifyPW: ''
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false
  });

  const [helperText, setHelperText] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  useEffect(() => { 
    if (userId) {
      const updatedUser = {
        ...userFields,
        id: userId
      };
      const {password, verifyPW, ...userWithoutPassword } = updatedUser;
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      navigate(`users/${updatedUser.id}/home`, { replace: true });
    }
  }, [userId, userFields, navigate]);

  useEffect(() => {
    console.log(userFields)
    setIsPwVerified(userFields.password !== "" && userFields.password === userFields.verifyPW);
  }, [userFields.password, userFields.verifyPW]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = checkValidation(userFields, setError, setHelperText);
    if (!isValid) 
      return;
    const updatedUserFields = {
      ...userFields,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    setUserFields(updatedUserFields);
    const {id, verifyPW, ...userForAdd } = updatedUserFields;
    checkIsUserExist(userForAdd);
  };

  const checkIsUserExist = async (user) => {
    const isNew = await checkIfExist("users", `?filter=email=${user.email}`, setComment);
    if (isNew) {
      addUser(user);
    }
  };

  const addUser = (user) => {
    postRequest("users", user, setSuccess, setUserId);
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setUserFields((prevData) => ({ ...prevData, [name]: value }));
    setError((prevData) => ({ ...prevData, [name]: false }));
    setHelperText((prevData) => ({ ...prevData, [name]: '' }));
  }

  return (
    <>
      <div>
        <h2>משתמש חדש</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="שם"
            variant="outlined"
            placeholder="שם"
            size="small"
            required
            margin="normal"
            error={error.name}
            helperText={helperText.name}
            onChange={handleChange}
            inputProps={{
                maxLength: 20,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PersonIcon />
                    </InputAdornment>
                ),
            }}
          /><br/>
          <TextField
            name="email"
            label="כתובת מייל"
            variant="outlined"
            placeholder="כתובת מייל"
            size="small"
            required
            margin="normal"
            error={error.email}
            helperText={helperText.email}
            onChange={handleChange}
            inputProps={{
                maxLength: 40,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                ),
            }}
          /><br/>
          <TextField
            name="password"
            label="סיסמה"
            variant="outlined"
            placeholder="סיסמה"
            size="small"
            type={showPassword ? 'text' : 'password'}
            required
            margin="normal"
            error={error.password}
            helperText={helperText.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={()=>{setShowPassword(prev=>!prev)}}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}/><br/>
          <TextField
            name="verifyPW"
            label="אימות סיסמה"
            variant="outlined"
            placeholder="אימות סיסמה"
            size="small"
            type={showVerifyPassword ? 'text' : 'password'}
            required
            margin="normal"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={()=>{setShowVerifyPassword(prev=>!prev)}}
                    edge="start"
                  >
                    {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}/><br/>
          <Button
            disabled={!isPwVerified}
            variant="contained"
            color="primary"
            type="submit"
          >
            המשך
          </Button>
        </form>
      </div>
      <p>{comment}</p>
      <p>משתמש קיים? <Link to="/Login">לחץ להתחברות</Link></p>
    </>
  );
};

export default Register;
