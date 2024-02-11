import { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/images/passive.png";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    regEmail: "",
    regPass: "",
    regConfirmPass: "",
    regRole: "",
  });

  console.log({ formData });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const regSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        userID: "",
        email: formData.regEmail,
        pass: formData.regPass,
        role: formData.regRole,
        verified: false,
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
          <h2>Login Account</h2>

          <form
            id="form"
            className={`${styles.form} flex flex-col`}
            onSubmit={regSubmit}
          >
            <div className="flex space-x-4 my-8 justify-center">
              <input
                type="radio"
                name="regRole"
                id="adoptiveParent"
                value="Adoptive Parent"
                onChange={handleChange}
              />
              <label htmlFor="adoptiveParent" className="text-sm">
                Adoptive Parent
              </label>
              <input
                type="radio"
                name="regRole"
                id="rescueShelter"
                value="Rescue Shelter"
                onChange={handleChange}
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
              name="regEmail"
              className={`${styles.input} border-2 p-2 mb-5`}
              value={formData.regEmail}
              onChange={handleChange}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="regPass"
              className={`${styles.input} border-2 p-2 mb-5`}
              value={formData.regPass}
              onChange={handleChange}
            ></input>
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
