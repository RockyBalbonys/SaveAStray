// react and other functions
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store, persistor } from "../../tools/store";
import { loginFailed, loginSuccess, logout } from "../../tools/authActions";
import useAuth from "../../hooks/useAuth";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { format, setDate } from "date-fns";

// mui components
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// Custom Components
import { FormPaper } from "../../Components/Paper/FormPaper";
import { AccountHeader } from "../../Components/Account/AccountHeader";
import Footer from "../../Components/PageComponent/Footer";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Avatar Component
import { AccountAvatar } from "../../Components/Account/AccountAvatar";
import AccountDrawer from "../../Components/Account/AccountDrawer";

// loader
import { DotLoader } from "react-spinners";

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

function AccountPawrent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="loader-container">
            <DotLoader
              color="orange"
              cssOverride={{ position: "absolute", zIndex: 1000 }}
            />
          </div>
        )}
        <AccountHeader />
        <AccountForm isLoading={isLoading} setIsLoading={setIsLoading} />
        <AccountDrawer />
      </div>
      <Footer />
    </>
  );
}

export default AccountPawrent;

const AccountForm = ({ isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  //API Fetch Pawrent Info
  const [pawrentInfo, setPawrentInfo] = useState({
    userProfilePic: "",
    userId: user,
    firstName: "",
    lastName: "",
    homeAddress: "",
    cityAddress: "",
    zipCode: "",
    birthdate: "",
    emailAddress: "",
    phoneNumber: "",
  });

  console.log({ pawrentInfo });

  // profile picture
  const [profilePic, setProfilePic] = useState("");

  // state for snackbar feedback
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);

  const fetchPawrentInfo = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/pawrentInfo/${userId}`,
        {
          params: {
            userId,
          },
        }
      );

      console.log(response);
      const { pawrentInfo, email, isGoogleUser } = response.data;
      setPawrentInfo({
        ...pawrentInfo,
        emailAddress: email,
        isGoogleUser,
      });
      setProfilePic(pawrentInfo.dp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPawrentInfo(user);
  }, [user]);

  const handleSaveChanges = () => {
    setIsLoading(true);
    console.log(user);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updatePawrentInfo`, {
        pawrentInfo,
        user,
      })
      .then(function (response) {
        console.log(response);
        fetchPawrentInfo(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e, id, date) => {
    if (id === "birthdate") {
      setPawrentInfo((prevState) => ({
        ...prevState,
        [id]: date,
      }));
      console.log(pawrentInfo.birthdate);
    } else {
      setPawrentInfo((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    try {
      console.log("initial State: ", store.getState());
      const unsubscribe = store.subscribe(() =>
        console.log("Updated state: ", store.getState())
      );
      console.log("401");
      setIsLoading(false);
      store.dispatch(logout());
      unsubscribe();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
            setIsLoading(true);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("download url: ", downloadURL);
            console.log("Uploaded a blob or file!", snapshot);
            console.log("Success");
            setIsLoading(false);
            setProfilePic(downloadURL);

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

  return (
    <>
      <Container sx={{ py: "64px" }}>
        <Grid container sx={{ filter: isLoading ? "blur(4px)" : undefined }}>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              maxWidth: "327px",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <AccountAvatar
                onClick={handleSaveChanges}
                onLogout={handleLogout}
                profilePic={profilePic}
                handleFileChange={handleFileChange}
                accountInfo={pawrentInfo}
              />
            </Box>
          </Grid>
          <Grid item md={8} lg={9} sx={{ paddingLeft: "16px" }}>
            <Grid container rowSpacing={3}>
              <Grid item sx={{ width: "100%" }}>
                <PersonalInfoCard
                  formData={pawrentInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ContactInfoCard
                  formData={pawrentInfo}
                  onChange={handleChange}
                  onSave={handleSaveChanges}
                />
              </Grid>
              {pawrentInfo &&
                !pawrentInfo.isGoogleUser && ( // Check for shelterInfo and isGoogleUser
                  <Grid item sx={{ width: "100%" }}>
                    <ResetPass forcedLogout={handleLogout} />
                  </Grid>
                )}
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
              mt: "32px",
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

const PersonalInfoCard = ({ formData, onChange, dateValue }) => {
  const handleDateChange = (date) => {
    const dateString = format(date, "MM/dd/yyyy");
    console.log(dateString);
    setDate(dateString);
    console.log("date value: " + dateString);
    onChange(dateString, "birthdate", dateString);
  };

  useEffect(() => {
    console.log(formData.birthdate);
  }, [formData.birthdate]);

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
                value={formData.zipCode}
                onChange={onChange}
              />
            </Grid>

            <Grid item sm={12}>
              <DatePicker
                label="Birthdate"
                id="birthdate"
                value={formData.birthdate}
                sx={{ width: "100%" }}
                onChange={handleDateChange}
              />
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

const ResetPass = ({ forcedLogout }) => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState({
    password: "",
    rePassword: "",
  });

  // state for showing password
  const [showPass, setShowPass] = useState(false);
  const [newPass, setNewPass] = useState(false);

  // state for password is less than 8
  const [isInvalid, setIsInvalid] = useState(false);

  // state for dialog box
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirmRePass = () => {
    handleRepassword();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePass = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleRepassword = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/repassword`, {
        password: inputValue.password,
        rePassword: inputValue.rePassword,
        user,
      })
      .then(function (response) {
        console.log(response);
        console.log("etitis");
        forcedLogout();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // check if both inputs are empty then disabled confirm pass button
  const isInputEmpty =
    inputValue.password.length === 0 || inputValue.rePassword.length === 0;

  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Reset Password"} />
      <Typography className="pb-6">
        Do you want to
        <span className="font-medium"> Reset Password?</span>
      </Typography>
      <Grid container spacing={3} mb={2}>
        <Grid item sm={6}>
          <TextField
            fullWidth
            onChange={handleChangePass}
            value={inputValue.password}
            name="password"
            label="Enter Current Password"
            type={showPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            onChange={handleChangePass}
            value={inputValue.rePassword}
            name="rePassword"
            fullWidth
            label="Enter New Password"
            type={newPass ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setNewPass(!newPass)}
                  >
                    {newPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isInvalid && (
            <FormHelperText sx={{ color: "red" }}>
              Password must be at least 8 characters long
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          color: "white",
          textTransform: "none",
          width: "216px",
          borderRadius: "7px",
        }}
        disabled={isInputEmpty}
      >
        Confirm Repassword
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: "16px" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Password Change"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change your password?
            <br />
            <br />
            This action will update your{" "}
            <span className="font-bold">account's login credentials.</span>{" "}
            Please ensure that you{" "}
            <span className="font-bold">remember your new password</span>, as
            you will need it to access your account in the future. If you
            proceed, your current password will be replaced with the new one.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: "16px" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirmRePass}
            variant="contained"
            autoFocus
            sx={{ color: "white" }}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </FormPaper>
  );
};

const DeleteAcc = ({ forcedLogout }) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteUser();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deleteGoogleUserCredentials/${user}`
      );
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deleteUserCredentials/${user}`
      );
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/deletePawrentInfo/${user}`
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
        color="error"
        sx={{
          color: "white",
          textTransform: "none",
          borderRadius: "7px",
          width: {
            xs: "100%",
            md: "216px",
          },
        }}
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account?
            <br />
            <br />
            This action is <span className="font-bold">irreversible</span> and
            will result in the{" "}
            <span className="font-bold">permanent loss of your account</span>{" "}
            data. Please note that once your account is deleted, you will no
            longer have access to your saved information, settings, and any
            associated content. Proceed with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
