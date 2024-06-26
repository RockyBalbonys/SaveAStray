import { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/images/passive.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alert, Box, IconButton } from "@mui/material";
import { store, persistor } from "../../tools/store";
import { loginFailed, loginSuccess } from "../../tools/authActions";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const OldLogin = () => {
  // get the role from verify page
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedRole = params.get("role");

  const { isLoggedIn, user, role } = useAuth();

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: selectedRole || "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userIn, setUserIn] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // Update formData with the selected role whenever it changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      loginRole: selectedRole || "", // Update loginRole with the new selected role
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
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "8888",
          },
        }
      );
      if (response.data.status === 200 && response.data.checked === true) {
        console.log(response.data);
        console.log("initial State: ", store.getState());
        const unsubscribe = store.subscribe(() =>
          console.log("Updated state: ", store.getState())
        );
        store.dispatch(loginSuccess(response.data.role, response.data.user));
        unsubscribe();
        navigate("/Animals");
      } else if (
        response.data.status === 400 &&
        response.data.checked === true
      ) {
        console.log("initial State: ", store.getState());
        store.dispatch(loginFailed());
        const unsubscribe = store.subscribe(() =>
          console.log("Updated state: ", store.getState())
        );
        console.log("401");
        store.dispatch(loginFailed());
        unsubscribe();
        setLoginAttempted(true);
        setUserIn(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleCallbackResponse(response) {
    const cred = response.credential;
    console.log("Encoded JWT ID token: " + response.credential);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/googleLogin`, {
        cred,
      })
      .then(function (response) {
        console.log(response.data);
        if (
          response.data.status === 200 /*  && response.data.checked === true */
        ) {
          console.log(response.data);
          console.log("initial State: ", store.getState());
          const unsubscribe = store.subscribe(() =>
            console.log("Updated state: ", store.getState())
          );
          store.dispatch(loginSuccess(response.data.role, response.data.user));
          unsubscribe();
          navigate("/Animals");
        } else if (
          response.data.status === 400 /*  &&
          response.data.checked === true */
        ) {
          console.log("initial State: ", store.getState());
          const unsubscribe = store.subscribe(() =>
            console.log("Updated state: ", store.getState())
          );
          console.log("401");
          store.dispatch(loginFailed());
          unsubscribe();
          setLoginAttempted(true);
          setUserIn(false);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_google_oauth_client_id,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const passwordsMatch = formData.regPass === formData.regConfirmPass;

  const alertMessage = userIn ? (
    <Alert severity="success" onClose={() => setUserIn(false)}>
      Login Successful
    </Alert>
  ) : (
    <Alert severity="error" onClose={() => setUserIn(false)}>
      Incorrect Credentials
    </Alert>
  );

  return (
    <div className={`${styles.container} px-4`}>
      <section className={styles.register}>
        <div className={styles["col-2"]}>
          <img src={bgImg} alt="" />
        </div>
        <div className={styles["col-1"]}>
          <div className="relative">
            <Box
              position="absolute"
              className="ml-5 mt-5 -top-[3rem] -left-20 sm:-top-[3rem] "
            >
              <IconButton position="absolute" disableRipple>
                <Link to="/">
                  <KeyboardBackspaceIcon
                    sx={{ fontSize: "2rem", color: "hsl(29, 100%, 53%)" }}
                  />
                </Link>
              </IconButton>
            </Box>
            <h2 className="mb-[32px]">Login Account</h2>
          </div>
          <form
            id="form"
            className={`${styles.form} flex flex-col`}
            onSubmit={loginSubmit}
          >
            <div className="flex space-x-4 my-8 justify-center">
              <input
                type="radio"
                name="loginRole"
                id="adoptiveParent"
                value="Adoptive Pawrent"
                onChange={handleChange}
                checked={formData.loginRole === "Adoptive Pawrent"}
                required
              />
              <label htmlFor="adoptiveParent" className="text-sm">
                Adoptive Pawrent
              </label>
              <input
                type="radio"
                name="loginRole"
                id="rescueShelter"
                value="Rescue Shelter"
                onChange={handleChange}
                checked={formData.loginRole === "Rescue Shelter"}
                required
              />
              <label htmlFor="rescueShelter" className="text-sm">
                Rescue Shelter
              </label>
            </div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder=""
              id="email"
              name="loginEmail"
              className={`${styles.input} border-2 p-2 mb-5`}
              value={formData.loginEmail}
              onChange={handleChange}
              required
            ></input>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                id="password"
                name="loginPass"
                className={`${styles.input} border-2 p-2 mb-5`}
                value={formData.loginPass}
                onChange={handleChange}
                required
              />
              {/* Eye icon */}
              {formData.loginPass && (
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "5%",
                    top: "15%",
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              )}
            </div>
            <div className="flex justify-between mb-8">
              <p className="mt-2 text-center text-sm">
                <Link to="/forgot-password">
                  <strong>Forgot Password?</strong>
                </Link>
              </p>
              <p className="mt-2 text-center text-sm">
                <Link to="/signup">
                  <strong>Need an Account?</strong>
                </Link>
              </p>
            </div>

            {loginAttempted && alertMessage}
            <button
              type="submit"
              className={`${styles.btn} bg-orange-500 text-white p-2 rounded-xl mt-5 mb-[22px]`}
              disabled={!passwordsMatch}
            >
              Continue
            </button>
            <hr />
            <div className={styles["my-2"]}>
              <div id="signinDiv" className="mt-5 w-[230.188px] "></div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default OldLogin;
