import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Background from "../../Components/Background";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import passive from "../../assets/images/top.png";
import logo from "../../assets/icons/SAS_Logo4.png";
import catCover from "../../assets/images/forgot-image.png";

export default function ForgotPassword() {
  const [inputData, setInputData] = useState({
    email: "",
  });

  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputData({ ...inputData, email: e.target.value });
  };

  function verifyEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputData.email)) {
      setInputError(true);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/forgotPassword`, {
        email: inputData,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <>
      <Background display={"flex"} align={"center"}>
        <Container sx={{ py: 10, width: "100%" }} maxWidth="lg">
          <div className="h-[12vh] relative border-[5px] rounded-[7px]">
            <img
              src={passive}
              alt="top image"
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <img src={logo} alt="logo" className="h-[91px] w-[91px]" />
              <Typography component="div" variant="h3" ml="22px" color="white">
                SaveAStray
              </Typography>
            </div>
          </div>
          <Paper sx={{ mt: 2, p: "32px 31px", border: "7px" }}>
            <Grid container>
              <Grid item xs={0} sm={6}>
                <Box
                  display={{
                    xs: "none",
                    sm: "block",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={catCover}
                      alt="cat cover"
                      width={"403px"}
                      height={"403px"}
                      className="self-center"
                      loading={"lazy"}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    height: "100%",
                    rowGap: "24px",
                    color: "#2F4858",
                    ml: "32px",
                    width: "398px",
                  }}
                >
                  <Typography
                    sx={{ color: "#FF7A00", fontWeight: 700, fontSize: "48px" }}
                  >
                    Forgot Pass?
                  </Typography>
                  <Typography fontWeight={300} sx={{ color: "#2F4858" }}>
                    Please enter the email address used within the website so we
                    can send the redirection link to “Forgot Password”
                  </Typography>
                  <Stack direction={"column"}>
                    <label
                      htmlFor="forgot-pass-email"
                      className="text-[#FF7A00] font-bold text-[14px]"
                    >
                      Email
                    </label>
                    <input
                      id="forgot-pass-email"
                      type="email"
                      onChange={changeHandler}
                      value={inputData.email}
                      className="border-[#FF7A00] border-[0.882px] rounded-[7px] py-2 px-2"
                    />
                    <div className="text-sm">
                      {inputError ? (
                        <span className="text-red-600">Invalid email</span>
                      ) : (
                        "Enter your email"
                      )}
                    </div>
                  </Stack>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      width: "fit-content",
                      border: "7px",
                      textTransform: "none",
                    }}
                    onClick={verifyEmail}
                  >
                    Send Redirection Link
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Background>
    </>
  );
}
