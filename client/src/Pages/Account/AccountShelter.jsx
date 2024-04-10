// import react and other components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { store, persistor } from "../../tools/store";
import { loginFailed, loginSuccess, logout } from "../../tools/authActions";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// import mui components
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

//Custom Components
import { FormPaper } from "../../Components/Paper/FormPaper";
import Footer from "../../Components/PageComponent/Footer";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

// Avatar Placeholder
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";
import { AccountHeader } from "../../Components/Account/AccountHeader";
import { AccountAvatar } from "../../Components/Account/AccountAvatar";
import AccountDrawer from "../../Components/Account/AccountDrawer";
import { format } from "date-fns";

const firebaseConfig = {
  apiKey: "AIzaSyAOyv2nyCcsDK0avw1qurZW1dapftwz5TA",
  authDomain: "save-a-stray-40e56.firebaseapp.com",
  projectId: "save-a-stray-40e56",
  storageBucket: "save-a-stray-40e56.appspot.com",
  messagingSenderId: "767492186893",
  appId: "1:767492186893:web:e9e9ef6c165e144c9a4644",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function AccountShelter() {
  return (
    <>
      <AccountHeader />
      <AccountForm />
      <AccountDrawer />
      <Footer />
    </>
  );
}

export default AccountShelter;

const AccountForm = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  //API Fetch Shelter Info
  const [shelterInfo, setShelterInfo] = useState({
    userProfilePic: "",
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
    representativeBirthdate: "",
    representativePhoneNumber: "",
  });

  const fetchShelterInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/shelterInfo/${userId}`,
        {
          params: {
            userId,
          },
        }
      );
      console.log(response);
      const { shelterInfo, email } = response.data;
      setShelterInfo({
        ...shelterInfo,
        shelterEmailAddress: email,
      });

      setProfilePic(shelterInfo.dp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShelterInfo(user);
  }, [user]);

  const handleSaveChanges = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/updateShelterInfo`,
        shelterInfo
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e, id, date) => {
    if (id === "representativeBirthdate") {
      setShelterInfo((prevState) => ({
        ...prevState,
        [id]: date,
      }));
      console.table("handle change " + shelterInfo);
    } else {
      setShelterInfo((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleLogout = () => {
    console.log("initial State: ", store.getState());
    const unsubscribe = store.subscribe(() =>
      console.log("Updated state: ", store.getState())
    );
    console.log("401");
    store.dispatch(logout());
    unsubscribe();
  };

  // profile picture
  const [profilePic, setProfilePic] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageBase64 = event.target.result;
          console.log("file: ", file);
          const storageRef = ref(storage, `user/dp/${file.name}`);
          try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("download url: ", downloadURL);
            console.log("Uploaded a blob or file!", snapshot);
            console.log("Success");

            if (downloadURL) {
              axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/updateDp`, {
                  user,
                  downloadURL,
                })
                .then(function (response) {
                  console.log(response);
                  setProfilePic(response);
                })
                .catch(function (err) {
                  console.log(err);
                });
            } else {
              console.log("no download URL");
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  console.table(shelterInfo);

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
                profilePic={profilePic}
                handleFileChange={handleFileChange}
                accountInfo={shelterInfo}
              />
            </Box>
          </Grid>
          <Grid item md={8} lg={9}>
            <Grid container rowSpacing={3}>
              <Grid item sx={{ width: "100%" }}>
                <ShelterInfo
                  formData={shelterInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterContactInfo
                  formData={shelterInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterAdoptionFee
                  formData={shelterInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterRepInfo
                  formData={shelterInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ResetPass />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <DeleteAcc forcedLogout={handleLogout} />
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
  const handleDateChange = (date) => {
    const dateString = format(date, "MM/dd/yyyy");
    console.log(dateString);
    console.log("date value: " + dateString);
    onChange(dateString, "representativeBirthdate", dateString);
  };

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
                id="representativeBirthdate"
                sx={{ width: "100%" }}
                value={formData.representativeBirthdate}
                onChange={handleDateChange}
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

const DeleteAcc = ({ forcedLogout }) => {
  const { user } = useAuth();

  const deleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deleteGoogleUserCredentials/${user}`
      );
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deleteUserCredentials/${user}`
      );
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deleteShelterInfo/${user}`
      );

      forcedLogout();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
        onClick={deleteUser}
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
