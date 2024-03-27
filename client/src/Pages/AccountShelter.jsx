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
import { useNavigate } from "react-router-dom";

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
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: user,
    shelterName: "",
    shelterAddress: "",
    cityAddress: "",
    zipCode: "",
    shelterEmailAddress: "",
    shelterPhoneNumber: "",
    animalAdoptionFeeForDogs: "",
    animalAdoptionFeeForCats: "",
    representativeFirstName: "",
    representativeLastName: "",
    representativeHomeAddress: "",
    representativeCityAddress: "",
    representativeZipCode: "",
    //representativeBirthdate: null,
    representativePhoneNumber: "",
  });

  const handleSaveChanges = () => {
    //console.log("Update account.");
    axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/updateShelterInfo`,
        formData
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
/*       setLoginAttempted(true);
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
                <ShelterInfo
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterContactInfo
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterAdoptionFee
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterRepInfo
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
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

const ShelterInfo = ({ formData, onChange }) => {
  return (
    <FormPaper>
      <FormHeader header={"Rescue Shelter Information"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <TextField
                label="Rescue Shelter Name"
                id="shelterName"
                fullWidth
                value={formData.shelterName}
                onChange={onChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Rescue Shelter Address"
                id="shelterAddress"
                fullWidth
                value={formData.shelterAddress}
                onChange={onChange}
              />{" "}
            </Grid>
            <Grid item sm={8}>
              <TextField
                label="City Address"
                id="cityAddress"
                fullWidth
                value={formData.cityAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                label="Zip Code"
                id="zipCode"
                fullWidth
                value={formData.zipCode}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ShelterContactInfo = ({ formData, onChange }) => {
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
                id="shelterEmailAddress"
                type="email"
                label="Email Address (View Only)"
                inputProps={{ readOnly: true }}
                sx={{ width: "100%" }}
                value={formData.shelterEmailAddress}
                onChange={onChange}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <TextField
                id="shelterPhoneNumber"
                label="Phone Number"
                sx={{ width: "100%" }}
                value={formData.shelterPhoneNumber}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ShelterAdoptionFee = ({ formData, onChange }) => {
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
                    <TextField
                      id="animalAdoptionFeeForDogs"
                      placeholder="00.00"
                      fullWidth
                      value={formData.animalAdoptionFeeForDogs}
                      onChange={onChange}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Typography>Animal Adoption Fee For Cats</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    columnGap={"4px"}
                  >
                    <Typography fontWeight={700}>PHP</Typography>
                    <TextField
                      id="animalAdoptionFeeForCats"
                      placeholder="00.00"
                      fullWidth
                      value={formData.animalAdoptionFeeForCats}
                      onChange={onChange}
                    />
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

const ShelterRepInfo = ({ formData, onChange }) => {
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
                id="representativeFirstName"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.representativeFirstName}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={6} md={6}>
              <TextField
                label="Last Name"
                id="representativeLastName"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.representativeLastName}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12} md={12}>
              <TextField
                label="Home Address"
                id="representativeHomeAddress"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.representativeHomeAddress}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={8} md={8}>
              <TextField
                label="City Address"
                id="representativeCityAddress"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.representativeCityAddress}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={4} md={4}>
              <TextField
                label="ZIP Code"
                id="representativeZipCode"
                variant="outlined"
                sx={{ width: "100%" }}
                value={formData.representativeZipCode}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={6}>
              <DatePicker
                label="Birthdate"
                //id="representativeBirthdate"
                sx={{ width: "100%" }}
                //value={formData.representativeBirthdate}
                //onChange={onChange}
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                label="Phone Number"
                id="representativePhoneNumber"
                sx={{ width: "100%" }}
                value={formData.representativePhoneNumber}
                onChange={onChange}
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
