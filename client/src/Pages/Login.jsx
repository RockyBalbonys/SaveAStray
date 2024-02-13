import { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/images/passive.png";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, IconButton } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: "",
  });

  console.log({ formData });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: formData.loginEmail,
        password: formData.loginPass,
        role: formData.loginRole,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id:
        "367854237850-6nomj4kp7i22ikmlcv0n4d0qkj332mhe.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const passwordsMatch = formData.regPass === formData.regConfirmPass;

  return (
    <div className={styles.container}>
      <section className={styles.register}>
        <div className={styles["col-2"]}>
          <img src={bgImg} alt="" />
        </div>
        <div className={styles["col-1"]}>
          <div className="relative">
            <Box position="absolute" className="ml-5 mt-5 -top-12 -left-20">
              <IconButton position="absolute" disableRipple>
                <Link to="/">
                  <KeyboardBackspaceIcon
                    sx={{ fontSize: "2rem", color: "hsl(29, 100%, 53%)" }}
                  />
                </Link>
              </IconButton>
            </Box>
            <h2>Login Account</h2>
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
                value="Adoptive Parent"
                onChange={handleChange}
                required
              />
              <label htmlFor="adoptiveParent" className="text-sm">
                Adoptive Parent
              </label>
              <input
                type="radio"
                name="loginRole"
                id="rescueShelter"
                value="Rescue Shelter"
                onChange={handleChange}
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

            <hr />
            <div className={styles["my-2"]}>
              <div id="signinDiv" className="mt-5"></div>
            </div>

            <button
              type="submit"
              className={`${styles.btn} bg-orange-500 text-white p-2 rounded-xl mt-5`}
              disabled={!passwordsMatch}
            >
              Get Started
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
