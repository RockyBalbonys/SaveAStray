import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
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

export const AccountPawrent = () => {
  return (
    <>
      <AccountHeader />
      <AccountForm />
      <Footer />
    </>
  );
};

const AccountHeader = () => {
  return (
    <>
      <div className="background-account text-white flex flex-col items-start justify-center">
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: "2.375rem", fontWeight: "600" }}>
            Account Information Management
          </Typography>
          <Typography>
            Manage your account information securely and conveniently.
          </Typography>
        </Container>
      </div>
    </>
  );
};

const AccountForm = () => {
  return (
    <>
      <Container sx={{ py: "64px" }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <AvatarCard />
          </Grid>
          <Grid item md={9}>
            <Grid container rowSpacing={3}>
              <Grid item sx={{ width: "100%" }}>
                <PersonalInfoCard />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ContactInfoCard />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <ShelterContactInfo />
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
        </Grid>
      </Container>
    </>
  );
};

const AvatarCard = () => {
  return (
    <>
      <Paper className="p-4 h-[457px] sticky">
        {/* TODO: Avatar icon */}
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <AvatarRing />
          <Typography color={"secondary"} fontWeight={600}>
            NAME GOES HERE
          </Typography>
        </Box>
        <Box>
          <Stack direction={"row"}>
            {/* TODO: Phone call icon */}
            <PhoneRoundedIcon />
            <Typography>012345671234</Typography>
          </Stack>
          <Stack direction={"row"}>
            {/* TODO: email icon */}
            <PhoneRoundedIcon />
            <Typography>example@gmail.com</Typography>
          </Stack>
        </Box>
        <Stack direction={"column"}>
          <Button
            variant="contained"
            sx={{ color: "white", textTransform: "none" }}
          >
            Save Changes
          </Button>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Log Out
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

const PersonalInfoCard = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Personal Information"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={3}>
            <Grid item sm={6} md={6}>
              <TextField
                label="First Name"
                id="pawrent-first-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6} md={6}>
              <TextField
                label="Last Name"
                id="pawrent-last-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={12} md={12}>
              <TextField
                label="Home Address"
                id="pawrent-home-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={8} md={8}>
              <TextField
                label="City Address"
                id="pawrent-city-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={4} md={4}>
              <TextField
                label="ZIP Code"
                id="pawrent-zip-code"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6}>
              <DatePicker label="Birthdate" sx={{ width: "100%" }} />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormPaper>
  );
};

const ContactInfoCard = () => {
  return (
    <FormPaper className="py-6 px-4">
      <FormHeader color={"#EE7200"} header={"Contact Information"} />
      <Box className="px-4 pt-4">
        <FormControl sx={{ width: "100%" }}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={12}>
              <TextField
                id="email-address"
                type="email"
                label="Email Address (View Only)"
                inputProps={{ readOnly: true }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <TextField
                id="phone-number"
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

const ShelterContactInfo = () => {
  return (
    <FormPaper>
      <FormHeader color={"#EE7200"} header={"Rescue Shelter Adoption Fee"} />
      <Box className="px-4 pt-4">
        <FormControl>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Animal Adoption Fee For Dogs</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>PHP</Typography>
                    <TextField placeholder="00.00" />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Animal Adoption Fee For Dogs</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>PHP</Typography>
                    <TextField placeholder="00.00" />
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
                id="first-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6} md={6}>
              <TextField
                label="Last Name"
                id="shelter-last-name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={12} md={12}>
              <TextField
                label="Home Address"
                id="shelter-home-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={8} md={8}>
              <TextField
                label="City Address"
                id="shelter-city-address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={4} md={4}>
              <TextField
                label="ZIP Code"
                id="shelter-zip-code"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={6}>
              <DatePicker label="Birthdate" sx={{ width: "100%" }} />
            </Grid>

            <Grid item sm={6}>
              <TextField label="Phone Number" sx={{ width: "100%" }} />
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
      <FormHeader color={"#EE7200"} header={"Deletion of Account"} />
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

const AvatarRing = () => {
  return (
    <>
      <Avatar
        alt="avatar placeholder"
        src={avatar_placeholder}
        sx={{
          width: "100px",
          height: "100px",
          boxShadow: "0px 0px 6.548px 3.274px rgba(255, 161, 52, 0.30)",
          border: "5px solid #EE7200",
        }}
      />
    </>
  );
};

const FormHeader = ({ color, header }) => {
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
