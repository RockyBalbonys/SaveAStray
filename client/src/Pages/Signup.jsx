import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Signup.module.css";
import bgImg from "../assets/images/passive.png";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, IconButton, Alert } from "@mui/material";
import TermsAndPrivacyModal from "../Components/TermsAndPrivacyModal";

function Signup() {
  const [formData, setFormData] = useState({
    regEmail: "",
    regPass: "",
    regConfirmPass: "",
    regRole: "",
  });

  const [userExists, setUserExists] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // set this to true to open the modal
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

      if (response.data.status == 409) {
        setUserExists(true);
      } else {
        console.log("Response:", response.data);
        setUserCreated(true);
      }
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

  //Helper text conditions for email
  const isEmailInvalid =
    formData.regEmail.length > 0 &&
    !formData.regEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

  // Helper text conditions for password and confirm password fields
  const isPasswordTooShort =
    formData.regPass.length < 8 && formData.regPass.length > 0;
  const isPasswordMismatch =
    formData.regConfirmPass && formData.regPass !== formData.regConfirmPass;
  const isConfirmPasswordMismatch =
    formData.regConfirmPass && isPasswordMismatch;

  const passwordsMatch = formData.regPass === formData.regConfirmPass;

  // Determine if any input field is empty
  const isAnyFieldEmpty =
    formData.regEmail.length === 0 ||
    formData.regPass.length === 0 ||
    formData.regConfirmPass.length === 0;

  // Determine if the form has been submitted
  const isFormSubmitted = Object.values(formData).some((field) => field !== "");

  return (
    <div className={styles.container}>
      <section className={styles.register}>
        <div className={styles["col-1"]}>
          <div className="relative">
            <Box
              position="absolute"
              className="ml-5 mt-5 -top-[3rem] -left-20 sm:-top-[3rem] lg:-top-[4rem]"
            >
              <IconButton disableRipple onClick={handleGoBack}>
                <Link to="#">
                  <KeyboardBackspaceIcon
                    sx={{ fontSize: "2rem", color: "hsl(29, 100%, 53%)" }}
                  />
                </Link>
              </IconButton>
            </Box>
            <h2 className="mb-[36px]">Create Account</h2>
          </div>

          <form
            id="form"
            className={`${styles.form} flex flex-col`}
            onSubmit={regSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder=""
              id="email"
              name="regEmail"
              className={`${styles.border2} p-2 mb-5`}
              value={formData.regEmail}
              onChange={handleChange}
              required
            />
            {/* Helper text for email input */}
            {(isFormSubmitted || isAnyFieldEmpty) && isEmailInvalid && (
              <div className="text-sm text-red-500 mt-[-1.25rem] ">
                Please enter a valid email address.
              </div>
            )}
            {isFormSubmitted && !formData.regEmail && (
              <div className="text-sm text-red-500 mt-[-1.25rem] ">
                Email is required.
              </div>
            )}

            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                id="password"
                name="regPass"
                className={`${styles.border2} p-2 mb-5`}
                value={formData.regPass}
                onChange={handleChange}
                required
              />
              {/* Eye icon */}
              {formData.regPass && (
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
            {/* Helper text for confirm password input */}
            {(isPasswordTooShort || isPasswordMismatch) && (
              <div className="text-sm text-red-500 mt-[-1.25rem] ">
                {isPasswordTooShort
                  ? "Password must be at least 8 characters."
                  : "Passwords do not match."}
              </div>
            )}

            {/* // Confirm password input field */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                id="confirmPassword"
                name="regConfirmPass"
                className={`${styles.border2} p-2 mb-5`}
                value={formData.regConfirmPass}
                onChange={handleChange}
                required
              />
              {/* Eye icon */}
              {formData.regConfirmPass && (
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "5%",
                    top: "15%",
                  }}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              )}
            </div>
            {/* Helper text for confirm password input */}
            {isConfirmPasswordMismatch && (
              <div className="text-sm text-red-500 mt-[-1.25rem] ">
                Passwords do not match.
              </div>
            )}

            <p className={`${styles.myLink} mb-[36px] text-sm `}>
              <Link to="/login">
                <strong>Have an Account?</strong>
              </Link>
            </p>
            {userExists && (
              <Alert severity="error" onClose={() => setUserExists(false)}>
                User already exists.
              </Alert>
            )}
            {userCreated && (
              <Alert severity="success" onClose={() => setUserCreated(false)}>
                User successfully created. Please check your email for
                verification. Thank you.
              </Alert>
            )}

            {/* Open modal when accept is set to false, else send form */}
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded-xl mt-5 mb-[22px]"
              disabled={!passwordsMatch}
              onClick={(e) => {
                if (!accept && isFormSubmitted && passwordsMatch) {
                  e.preventDefault();
                  setModalOpen(true);
                } else {
                  if (accept) {
                    regSubmit(e); // Call your form submission function here
                  }
                }
              }}
            >
              {accept ? "Continue" : "Get Started"}
            </button>

            {/* Terms and Privacy Modal */}
            <TermsAndPrivacyModal
              open={modalOpen}
              onClose={handleModalClose}
              formData={formData}
              setAccept={setAccept}
            />
            <hr />
            <div className={styles["my-2"]}>
              <div id="signinDiv" className="mt-5"></div>
            </div>
          </form>
        </div>
        <div className={styles["col-2"]}>
          <img src={bgImg} alt="" />
        </div>
      </section>
    </div>
  );
}

export default Signup;
