import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  InputLabel,
  OutlinedInput,
  Button,
  Link,
} from "@mui/material";
import PawBG from "../assets/images/Paw.png";
import formImage from "../assets/images/formImage.png";
import logo from "../assets/icons/SAS_Logo4.png";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MyLogin = () => {
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: "",
  });

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
        role: "Adoptive Parent",
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

  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        backgroundImage: `url(${PawBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form data={formData} onChange={handleChange} />
    </Box>
  );
};

export default MyLogin;

function Form({ data, onChange }) {
  return (
    <Container maxWidth="md">
      <Paper sx={{ height: "548px", borderRadius: "12px", overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundImage: `url(${formImage})`,
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Overlay to darken the image */}
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "rgb(255, 130, 16, 0.70)", // Adjust the opacity as needed
                  width: "100%",
                  height: "100%",
                }}
              ></Box>
              {/* Logo and text */}
              <Box
                textAlign="center"
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={logo} alt="logo" width={91} height={91} />
                <Typography fontWeight="bold" fontSize="3.5rem">
                  SaveAStray
                </Typography>
                <Box width="250px">
                  <Typography>
                    Welcome Back! Let's get pawsitive and show love to our furry
                    friends
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
                borderRadius: "12px",
                overflow: "show",
                width: "100%",
                rowGap: "36px",
                paddingLeft: "63px",
                paddingRight: "63px",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Login Account
              </Typography>
              <Client />
              <InputForm
                email={data.email}
                password={data.password}
                onChange={onChange}
              />
              <Button variant="contained" sx={{ width: "100%" }}>
                Continue
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

function Client() {
  return (
    <FormControl>
      <RadioGroup>
        <Stack direction="row" spacing={2.25}>
          <FormControlLabel
            value="Adoptive Parent"
            control={<Radio />}
            label={
              <Typography sx={{ fontSize: "12px" }}>Adoptive Parent</Typography>
            }
          />
          <FormControlLabel
            value="Rescue Shelter"
            control={<Radio />}
            label={
              <Typography sx={{ fontSize: "12px" }}>Rescue Shelter</Typography>
            }
          />
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}

function InputForm({ email, password, onChange }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          rowGap: "22px",
        }}
      >
        <Box width="100%">
          <InputLabel htmlFor="emailInput">Email</InputLabel>
          <OutlinedInput
            id="emailInput"
            type="email"
            variant="filled"
            value={email}
            sx={{ width: "100%" }}
            onChange={onChange}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="passwordInput">Password</InputLabel>
          <OutlinedInput
            id="passwordInput"
            type="password"
            variant="filled"
            value={password}
            sx={{ width: "100%" }}
          />
          <Stack direction="row" spacing={7.9} mt={1}>
            <Link to="forgotPass" component={RouterLink} underline="hover">
              <Typography variant="body2" sx={{ color: "orange" }}>
                Forgot Password?
              </Typography>
            </Link>
            <Link to="signup" component={RouterLink} underline="hover">
              <Typography variant="body2" fontWeight="bold">
                Need an Account?
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
