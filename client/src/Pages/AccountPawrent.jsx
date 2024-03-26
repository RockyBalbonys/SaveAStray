import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { store, persistor } from "../tools/store";
import { loginFailed, loginSuccess, logout } from "../tools/authActions";

import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Icon,
  Stack,
} from "@mui/material";
import useAuth from "../hooks/useAuth";

//Custom Components
import { FormPaper } from "../Components/Paper/FormPaper";
import { AccountHeader } from "../Components/Account/AccountHeader";

//Footer
import Footer from "../Components/PageComponent/Footer";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

// Avatar Component
import { AccountAvatar } from "../Components/Account/AccountAvatar";
import AccountDrawer from "../Components/Account/AccountDrawer";

export const AccountPawrent = () => {
  return (
    <>
      <AccountHeader />
      <AccountForm />
      <Footer />
      <AccountDrawer />
    </>
  );
};

const AccountForm = () => {

  const {user} = useAuth();

  const [formData, setFormData] = useState({
    userId: user,
    firstName: "",
    lastName: "",
    homeAddress: "",
    cityAddress: "",
    zipCode: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const handleSaveChanges = () => {
    axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/updatePawrentInfo`, formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogout = () => {
          console.log("initial State: ", store.getState());
          const unsubscribe = store.subscribe(() =>
            console.log("Updated state: ", store.getState())
          );
          console.log("401");
          store.dispatch(logout());
          unsubscribe();
/*           setLoginAttempted(true);
          setUserIn(false); */
  };
  return (
    <>
      <Container sx={{ py: "64px" }}>
        <Grid container spacing={3}>
          <Grid
            item
            md={4}
            lg={3}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Box sx={{ height: "100%" }}>
              <AccountAvatar
                onClick={handleSaveChanges}
                onLogout={handleLogout}
              />
            </Box>
          </Grid>
          <Grid item md={8} lg={9}>
            <Grid container rowSpacing={3}>
              <Grid item sx={{ width: "100%" }}>
                <PersonalInfoCard 
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ContactInfoCard
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <DeleteAcc />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <Stack direction={"column"} sx={{ rowGap: "16px" }}>
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                sx={{
                  color: "white",
                  textTransform: "none",
                  borderRadius: "7px",
                }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", borderRadius: "7px" }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const PersonalInfoCard = ({ formData, onChange }) => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Personal Information"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={3}>
            <Grid item sm={12} md={6}>
              <TextField
                label="First Name"
                id="firstName"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.firstName}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                label="Last Name"
                id="lastName"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.lastName}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12} md={12}>
              <TextField
                label="Home Address"
                id="homeAddress"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.homeAddress}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12} md={8}>
              <TextField
                label="City Address"
                id="cityAddress"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.cityAddress}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12} md={4}>
              <TextField
                label="ZIP Code"
                id="zipCode"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={12}>
              <DatePicker label="Birthdate" sx={{ width: "100%" }} />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ContactInfoCard = ({ formData, onChange }) => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Contact Information"} />
      <Box className="px-4 pt-4">
        <FormControl sx={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={12}>
              <TextField
                id="emailAddress"
                type="email"
                label="Email Address (View Only)"
                inputProps={{ readOnly: true }}
                sx={{ width: "100%" }}
                value={formData.emailAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                sx={{ width: "100%" }}
                value={formData.phoneNumber}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const DeleteAcc = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Deletion of Account"} />
      <Typography className="pb-6">
        Deleting your Account will{" "}
        <span className="font-medium">remove all of your information</span> from
        our database. <br />
        This action cannot be undone.
      </Typography>
      <Button
        variant="contained"
        sx={{
          color: "white",
          textTransform: "none",
          borderRadius: "7px",
          width: {
            xs: "100%",
            md: "216px",
          },
        }}
      >
        Delete Account
      </Button>
    </FormPaper>
  );
};

const FormHeader = ({ color, header }) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} mb={"4px"}>
        <AccountCircleRoundedIcon sx={{ color: color, mr: "4px" }} />
        <Typography sx={{ color: color, fontWeight: "600" }}>
          {header}
        </Typography>
      </Stack>
      <Divider color={color} sx={{ mb: "16px" }} />
    </>
  );
};
