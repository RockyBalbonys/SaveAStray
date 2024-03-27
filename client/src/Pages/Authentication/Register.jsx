// react and other functions
import React, { useEffect, useState } from "react";

// mui components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

// images, icons
import myPassive from "../../assets/images/top.png";
import logo from "../../assets/icons/SAS_Logo4.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// stlyes, custom component
import {
  InputHelperTextErrorStyle,
  InputHelperTextStyle,
  InputLabelStyle,
  UserInput,
} from "./Login";
import TermsAndPrivacyModal from "../../Components/TermsAndPrivacyModal";
import UseSignup from "../../hooks/useSignup";

// react functions
import { Link } from "react-router-dom";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    formData,
    isGoogle,
    googleResponse,
    setIsGoogle,
    setGoogleResponse,
    setUserExists,
    handleChange,
  } = UseSignup();

  function handleCallbackResponse(response) {
    setIsGoogle(true);
    setGoogleResponse(response);
    setModalOpen(true);
  }

  // useEffect hook for initializing Google Sign-In
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_google_oauth_client_id,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="bgLogin h-screen w-screen">
        <SignupCard
          showPass={showPass}
          setShowPass={setShowPass}
          showConfirmPass={showConfirmPass}
          setShowConfirmPass={setShowConfirmPass}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          formData={formData}
          isGoogle={isGoogle}
          googleResponse={googleResponse}
          setIsGoogle={setIsGoogle}
          setGoogleResponse={setGoogleResponse}
          handleChange={handleChange}
          setUserExists={setUserExists}
        />
      </div>
    </>
  );
};

export default Register;

function SignupCard({
  showPass,
  setShowPass,
  showConfirmPass,
  setShowConfirmPass,
  modalOpen,
  setModalOpen,
  formData,
  isGoogle,
  googleResponse,
  setIsGoogle,
  setGoogleResponse,
  handleChange,
  setUserExists,
}) {
  const showPassIcon = showPass ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const showPassText = showPass ? "text" : "password";
  const showConfirmPassIcon = showConfirmPass ? (
    <VisibilityIcon />
  ) : (
    <VisibilityOffIcon />
  );
  const showConfirmPassText = showConfirmPass ? "text" : "password";

  const isEmailInvalid =
    formData.regEmail.length > 0 &&
    !formData.regEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

  const isPasswordTooShort =
    formData.regPass.length < 8 && formData.regPass.length > 0;
  const isPasswordMismatch =
    formData.regConfirmPass && formData.regPass !== formData.regConfirmPass;
  const isConfirmPasswordMismatch =
    formData.regConfirmPass && isPasswordMismatch;

  const passwordHelperText = isPasswordTooShort ? (
    <FormHelperText sx={InputHelperTextErrorStyle}>
      Password must be at least 8 characters
    </FormHelperText>
  ) : (
    <FormHelperText sx={InputHelperTextStyle}>Enter password</FormHelperText>
  );

  const confirmPassHelperText = isConfirmPasswordMismatch ? (
    <FormHelperText sx={InputHelperTextErrorStyle}>
      Password do not match
    </FormHelperText>
  ) : (
    <FormHelperText sx={InputHelperTextStyle}>
      Enter confirm password
    </FormHelperText>
  );

  console.log(formData);

  return (
    <>
      <Paper
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "70%",
          },
          height: {
            xs: "90%",
            sm: "80%",
            md: "80%",
          },
          borderRadius: "12px",
          boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} sm={12} md={6}>
            <div className="md:p-8 lg:p-8 p-6 sm:p-8 py-20 flex flex-col items-center w-full h-full justify-center border-2 border-white bg-white">
              <p className="text-[24px] text-[#FF7A00] mb-9">
                Create an Account
              </p>

              {/* Email input */}
              <FormControl
                sx={{
                  width: {
                    xs: "90%",
                    sm: "90%",
                    md: "70%",
                  },
                  mt: "18px",
                }}
              >
                <InputLabel htmlFor="email" shrink={false} sx={InputLabelStyle}>
                  Email
                </InputLabel>
                <UserInput
                  required
                  id="email"
                  name="regEmail"
                  type="email"
                  onChange={handleChange}
                  fullWidth
                />
                {isEmailInvalid ? (
                  <FormHelperText
                    id="password-error-text"
                    sx={InputHelperTextErrorStyle}
                  >
                    Enter valid email
                  </FormHelperText>
                ) : (
                  <FormHelperText
                    id="password-helper-text"
                    sx={InputHelperTextStyle}
                  >
                    Enter your email
                  </FormHelperText>
                )}
              </FormControl>

              {/* Password input */}
              <FormControl
                sx={{
                  width: {
                    xs: "90%",
                    sm: "90%",
                    md: "70%",
                  },
                  position: "relative",
                }}
              >
                <InputLabel
                  htmlFor="password"
                  shrink={false}
                  sx={InputLabelStyle}
                >
                  Password
                </InputLabel>
                <UserInput
                  id="password"
                  name="regPass"
                  type={showPassText}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ width: "100%" }}
                  inputProps={{ placeholder: "********" }}
                />

                <InputAdornment
                  position="end"
                  onClick={() => setShowPass(!showPass)}
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "57%",
                    right: "5%",
                  }}
                >
                  {showPassIcon}
                </InputAdornment>
                {passwordHelperText}
              </FormControl>

              {/* Confirm Password input */}
              <FormControl
                sx={{
                  width: {
                    xs: "90%",
                    sm: "90%",
                    md: "70%",
                  },
                  position: "relative",
                }}
              >
                <InputLabel
                  htmlFor="password"
                  shrink={false}
                  sx={InputLabelStyle}
                >
                  Confirm Password
                </InputLabel>
                <UserInput
                  id="confirm-password"
                  name="regConfirmPass"
                  type={showConfirmPassText}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ width: "100%" }}
                  inputProps={{ placeholder: "********" }}
                />

                <InputAdornment
                  position="end"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "57%",
                    right: "5%",
                  }}
                >
                  {showConfirmPassIcon}
                </InputAdornment>
                {confirmPassHelperText}
              </FormControl>

              <div className="flex justify-end px-5 w-[75%] text-[#FF7A00] mt-2 mb-9">
                <Link to="/login">
                  <p className="cursor-pointer">Have an account?</p>
                </Link>
              </div>
              <Button
                variant="contained"
                disabled={
                  formData.regEmail === "" ||
                  isEmailInvalid ||
                  formData.regPass === "" ||
                  formData.regConfirmPass === ""
                }
                onClick={() => setModalOpen(true)}
                sx={{
                  color: "white",
                  textTransform: "none",
                  width: "70%",
                  borderRadius: "7px",
                }}
              >
                Get Started
              </Button>

              {/* Terms and Privacy Modal */}
              <TermsAndPrivacyModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                formData={formData}
                setUserExists={setUserExists}
                googleResponse={googleResponse}
                isGoogle={isGoogle}
              />

              <div className="my-2 ml-8">
                <div id="signinDiv" className="mt-5 w-[230.188px] " />
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <div className="flex justify-center items-center w-full h-full border-[5px] border-white relative">
              <img
                src={myPassive}
                alt="myPassive"
                className="object-cover object-center inset-0 w-full h-full"
                style={{
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              />
              <div className="absolute flex flex-col items-center space-y-8 text-center text-white">
                <img src={logo} alt="logo" className="w-[91px] h-[91px]" />
                <p className="text-xl sm:text-[3.5rem] md:text-[3.5rem] lg:text-[3.5rem] xl:text-[3.5rem] font-bold sm:mb-6 md:mb-6 lg:mb-6 xl:mb-6">
                  SaveAStray
                </p>
                <p className="text-xs md:text-[0.875rem] md:w-[350px] leading-loose">
                  Open our heart, save a life! Adopt & welcome pawsitive change
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
