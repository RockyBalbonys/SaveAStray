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
import { AccountHeader } from "../Components/Account/AccountHeader";

//Footer
import Footer from "../Components/PageComponent/Footer";

// Icons
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

// Avatar Component
import { AccountAvatar } from "../Components/Account/AccountAvatar";

export const AccountPawrent = () => {
  return (
    <>
      <AccountHeader />
      <AccountForm />
      <Footer />
    </>
  );
};

const AccountForm = () => {
  return (
    <>
      <Container sx={{ py: "64px" }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <AccountAvatar />
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
                <DeleteAcc />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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
