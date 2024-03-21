import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "../tools/authActions";

const useFormSubmit = (selectedRole) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: selectedRole || "",
  });

  const [loginAttempted, setLoginAttempted] = useState(false);
  const [userIn, setUserIn] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      loginRole: selectedRole || "",
    }));
  }, [selectedRole]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        {
          email: formData.loginEmail,
          password: formData.loginPass,
          role: formData.loginRole,
        }
      );

      if (response.data.status === 200 && response.data.checked === true) {
        const user = response.data.user;
        dispatch(loginSuccess(formData.loginRole, user));
        navigate("/Animals");
      } else if (
        response.data.status === 400 &&
        response.data.checked === true
      ) {
        dispatch(loginFailed());
        setLoginAttempted(true);
        setUserIn(false);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCallbackResponse = (response) => {
    const cred = response.credential;

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/googleLogin`, { cred })
      .then(function (response) {
        if (response.data.status === 200 && response.data.checked === true) {
          const user = response.data.user;
          dispatch(loginSuccess(formData.loginRole, user));
          navigate("/Animals");
        } else if (
          response.data.status === 400 &&
          response.data.checked === true
        ) {
          dispatch(loginFailed());
          setLoginAttempted(true);
          setUserIn(false);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return {
    formData,
    loginAttempted,
    userIn,
    handleChange,
    loginSubmit,
    handleCallbackResponse,
    passwordError,
  };
};

export default useFormSubmit;
