import React from "react";
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

//Custom Components
import { FormPaper } from "../Components/Paper/FormPaper";

//Footer
import Footer from "../Components/PageComponent/Footer";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

// Avatar Placeholder
import avatar_placeholder from "../assets/images/avatar_placeholder.png";
import { AccountHeader } from "../Components/Account/AccountHeader";
import { AccountAvatar } from "../Components/Account/AccountAvatar";
import AccountDrawer from "../Components/Account/AccountDrawer";

export const AccountShelter = () => {
  return (
    <>
      <AccountHeader />
      <AccountForm />
      <AccountDrawer />
      <Footer />
    </>
  );
};

const AccountForm = () => {

  const handleSaveChanges = () => {
    console.log("Update account.");
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
                <ShelterInfo />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterContactInfo />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterAdoptionFee />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterRepInfo />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ResetPass />
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

const ShelterInfo = () => {
  return (
    <FormPaper>
      <FormHeader header={"Rescue Shelter Information"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <TextField
                label="Rescue Shelter Name"
                id="shelter-name"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Rescue Shelter Address"
                id="shelter-address"
                fullWidth
              />{" "}
            </Grid>
            <Grid item sm={8}>
              <TextField
                label="City Address"
                id="shelter-city-address"
                fullWidth
              />
            </Grid>
            <Grid item sm={4}>
              <TextField label="Zip Code" id="shelter-zip-code" fullWidth />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ShelterContactInfo = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader
        color={"#EE7200"}
        header={"Rescue Shelter Contact Information"}
      />
      <Box className="px-4 pt-4">
        <FormControl sx={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={12}>
              <TextField
                id="shelter-email-address"
                type="email"
                label="Email Address (View Only)"
                inputProps={{ readOnly: true }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <TextField
                id="shelter-phone-number"
                label="Phone Number"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ShelterAdoptionFee = () => {
  return (
    <FormPaper>
      <FormHeader color={"#EE7200"} header={"Rescue Shelter Adoption Fee"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Typography>Animal Adoption Fee For Dogs</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    columnGap={"4px"}
                  >
                    <Typography fontWeight={700}>PHP</Typography>
                    <TextField placeholder="00.00" fullWidth />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Typography>Animal Adoption Fee For Dogs</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    columnGap={"4px"}
                  >
                    <Typography fontWeight={700}>PHP</Typography>
                    <TextField placeholder="00.00" fullWidth />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ShelterRepInfo = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader
        color={"#EE7200"}
        header={"Rescue Shelter Representative Information"}
      />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={3}>
            <Grid item sm={6} md={6}>
              <TextField
                label="First Name"
                id="rep-first-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6} md={6}>
              <TextField
                label="Last Name"
                id="rep-last-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={12} md={12}>
              <TextField
                label="Home Address"
                id="rep-home-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={8} md={8}>
              <TextField
                label="City Address"
                id="rep-city-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={4} md={4}>
              <TextField
                label="ZIP Code"
                id="rep-zip-code"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6}>
              <DatePicker
                label="Birthdate"
                id="rep-birthdate"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                label="Phone Number"
                id="rep-birthdate"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ResetPass = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Reset Password"} />
      <Typography className="pb-6">
        Do you want to
        <span className="font-medium"> Reset Password?</span>
      </Typography>
      <Grid container spacing={3} mb={2}>
        <Grid item sm={6}>
          <TextField fullWidth label="Enter Current Password" />
        </Grid>
        <Grid item sm={6}>
          <TextField type="password" fullWidth label="Enter New Password" />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          color: "white",
          textTransform: "none",
          width: "216px",
          borderRadius: "7px",
        }}
      >
        Confirm Repassword
      </Button>
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
          width: "216px",
          borderRadius: "7px",
        }}
      >
        Delete Account
      </Button>
    </FormPaper>
  );
};

const FormHeader = ({ header }) => {
  const color = "#EE7200";

  return (
    <>
      <Stack direction={"row"} alignItems={"cent er"} mb={"4px"}>
        <AccountCircleRoundedIcon sx={{ color: color, mr: "4px" }} />
        <Typography sx={{ color: color, fontWeight: "600" }}>
          {header}
        </Typography>
      </Stack>
      <Divider color={color} sx={{ mb: "16px" }} />
    </>
  );
};
