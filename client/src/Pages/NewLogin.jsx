import React, { useEffect, useState } from "react";
import myPassive from "../assets/images/myPassiveCopy.png";
import logo from "../assets/icons/SAS_Logo4.png";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import useFormSubmit from "../hooks/useFormSubmit";

export const NewLogin = () => {
  const [showPass, setShowPass] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Initialize selectedRole state

  // Call the custom hook and destructure the returned values
  const {
    formData,
    loginAttempted,
    userIn,
    handleChange,
    loginSubmit,
    handleCallbackResponse,
    passwordError,
  } = useFormSubmit(selectedRole);

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
        <LoginCard
          role={formData.loginRole}
          setRole={setSelectedRole} // Pass setSelectedRole instead of setRole
          showPass={showPass}
          setShowPass={setShowPass}
          formData={formData} // Pass formData to LoginCard
          handleChange={handleChange} // Pass handleChange to LoginCard
          loginSubmit={loginSubmit} // Pass loginSubmit to LoginCard
          loginAttempted={loginAttempted}
          passwordError={passwordError}
        />
      </div>
    </>
  );
};

function LoginCard({
  role,
  setRole,
  showPass,
  setShowPass,
  formData,
  handleChange,
  loginSubmit,
  loginAttempted,
  passwordError,
}) {
  const showPassIcon = showPass ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const showPassText = showPass ? "text" : "password";
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
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            order={{ xs: 2, sm: 2, md: 1 }}
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
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }}
              />
              <div className="absolute flex flex-col items-center space-y-8 text-center text-white">
                <img src={logo} alt="logo" className="w-[91px] h-[91px]" />
                <p className="text-xl sm:text-[3.5rem] md:text-[3.5rem] lg:text-[3.5rem] xl:text-[3.5rem] font-bold sm:mb-6 md:mb-6 lg:mb-6 xl:mb-6">
                  SaveAStray
                </p>
                <p className="text-xs md:text-[0.875rem] md:w-[350px]">
                  Open our heart, save a life! Adopt & welcome pawsitive change
                </p>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md: 2 }}>
            <div className="md:p-8 lg:p-8 p-6 sm:p-8 py-20 flex flex-col items-center w-full h-full justify-center border-2 border-white bg-white">
              <p className="text-[24px] text-[#FF7A00] mb-9">Login Account</p>
              <div className="text-[#FF7A00] text-[12px] flex flex-col items-center justify-center w-full">
                <FormControl>
                  <RadioGroup
                    value={role}
                    onChange={handleChange}
                    name="loginRole"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      ".MuiFormControlLabel-label": {
                        fontSize: "12px",
                      },
                      columnGap: "18px",
                    }}
                    required
                  >
                    <FormControlLabel
                      label="Adoptive Pawrent"
                      value={"Adoptive Pawrent"}
                      control={<Radio size="small" sx={{ color: "#FF7A00" }} />}
                    />
                    <FormControlLabel
                      label="Rescue Shelter"
                      value={"Rescue Shelter"}
                      control={<Radio size="small" sx={{ color: "#FF7A00" }} />}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <FormControl
                sx={{
                  width: {
                    xs: "90%",
                    sm: "90%",
                    md: "70%",
                  },
                  mt: "28px",
                }}
              >
                <InputLabel htmlFor="email" shrink={false} sx={InputLabelStyle}>
                  Email
                </InputLabel>
                <UserInput
                  onChange={handleChange}
                  required
                  value={formData.loginEmail}
                  id="email"
                  type="email"
                  name="loginEmail"
                  fullWidth
                />
                <FormHelperText
                  id="password-helper-text"
                  sx={{ ml: "-.09rem" }}
                >
                  Enter your email
                </FormHelperText>
              </FormControl>

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
                  fullWidth
                  value={formData.loginPass}
                  name="loginPass"
                  onChange={handleChange}
                  required
                  error={passwordError}
                  type={showPassText}
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
                {passwordError && ( // Show error message if passwordError is true
                  <FormHelperText
                    id="password-error-text"
                    sx={{ ml: "-.09rem", color: "red" }}
                  >
                    Incorrect password
                  </FormHelperText>
                )}
                {!passwordError && (
                  <FormHelperText
                    id="password-helper-text"
                    sx={{ ml: "-.09rem" }}
                  >
                    Enter your password
                  </FormHelperText>
                )}
              </FormControl>
              <div className="flex justify-around px-5 w-full text-[#FF7A00] mt-2 mb-9">
                <p className="font-light cursor-pointer">Forgot Password?</p>
                <p className="font-bold cursor-pointer">Need an account?</p>
              </div>
              <Button
                onClick={loginSubmit}
                disabled={
                  formData.loginRole === "" ||
                  formData.loginEmail === "" ||
                  formData.loginPass === ""
                }
                variant="contained"
                sx={{
                  color: "white",
                  textTransform: "none",
                  width: "70%",
                  borderRadius: "7px",
                }}
              >
                Continue
              </Button>

              <div className="my-2 ml-8">
                <div id="signinDiv" className="mt-5 w-[230.188px] " />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const UserInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(5),
  },
  "& .MuiInputBase-input": {
    color: "#FF7A00",
    borderRadius: "7px",
    position: "relative",
    border: "2px solid #FF7A00",
    fontSize: 16,
    padding: "10px 12px",
    paddingRight: "20%",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const InputLabelStyle = {
  color: "#FF7A00",
  ml: "-.8rem",
  fontWeight: "700",
};
