import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
import catCover from "../../assets/images/change-pass-image.png";

export default function ChangePass() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const [tokenStatus, setTokenStatus] = useState(null); //if true, pwede niyang palitan yung password, pag false, meaning expired yung token
  const [inputData, setInputData] = useState({
    password: "",
    rePassword: "",
  });
  const [newPassword, setNewPassword] = useState();
  const navigate = useNavigate();
  const [inputError, setInputError] = useState(false);

  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/api/forgot/changePass?token=${token}`
    )
    .then(function (response) {
      console.log(response);
      if (response.data.status === 200) {
        setTokenStatus(true);
      } else {
        setTokenStatus(false);
        navigate("*")
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  const changeHandler = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  function changePassword() {
    if (inputData.password !== inputData.rePassword) {
      setInputError(true);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updatePass`, {
        inputData,
        token,
      })
      .then(function (response) {
        console.log("Password Change Successfuly: ", response);
      })
      .catch(function (error) {
        console.log(error);
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
          <Paper sx={{ mt: 2, p: "64px", border: "7px" }}>
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
                    New Password
                  </Typography>
                  <Typography fontWeight={300} sx={{ color: "#2F4858" }}>
                    This will allow you to change your password. Don’t share
                    your new password.
                  </Typography>
                  <Stack direction={"column"}>
                    <label
                      htmlFor="password"
                      className="text-[#FF7A00] font-bold text-[14px]"
                    >
                      New Password
                    </label>
                    <input
                      id="password"
                      type="text"
                      onChange={changeHandler}
                      value={inputData.password}
                      className="border-[#FF7A00] border-[0.882px] rounded-[7px] py-2 px-2"
                    />
                    <div className="text-sm">
                      {inputError ? (
                        <span className="text-red-600">
                          Password does not match
                        </span>
                      ) : (
                        "Enter your new password"
                      )}
                    </div>
                  </Stack>
                  <Stack direction={"column"}>
                    <label
                      htmlFor="rePassword"
                      className="text-[#FF7A00] font-bold text-[14px]"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="rePassword"
                      type="text"
                      onChange={changeHandler}
                      value={inputData.rePassword}
                      className="border-[#FF7A00] border-[0.882px] rounded-[7px] py-2 px-2"
                    />
                    <div className="text-sm">
                      {inputError ? (
                        <span className="text-red-600">
                          Password does not match
                        </span>
                      ) : (
                        "Enter confirm new password"
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
                    onClick={changePassword}
                  >
                    Save New Password
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Background>

      {/* <div>
        <input
          type="password"
          onChange={changeHandler}
          value={inputData.password}
          placeholder="Enter new password..."
        />
        <input
          type="password"
          onChange={changeHandler}
          value={inputData.rePassword}
          placeholder="Re-Enter new password..."
        />
        <button onClick={changePassword}>Change Password</button>
      </div> */}
    </>
  );
}
