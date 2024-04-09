import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";
import editProfile from "../../assets/icons/editImage.svg";
import styled from "@emotion/styled";
import useAuth from "../../hooks/useAuth";

export const AccountAvatar = ({
  onClick,
  onLogout,
  profilePic,
  handleFileChange,
  accountInfo,
}) => {
  const { role } = useAuth();

  let accountName = "";
  let accountNum = "";
  let accountEmail = "";

  if (role === "Adoptive Pawrent") {
    accountName = accountInfo.firstName + " " + accountInfo.lastName;
    accountNum = accountInfo.phoneNumber;
    accountEmail = accountInfo.emailAddress;
  }
  if (role === "Rescue Shelter") {
    accountName = accountInfo.shelterName;
    accountNum = accountInfo.shelterPhoneNumber;
    accountEmail = accountInfo.shelterEmailAddress;
  }

  console.table(accountInfo);

  return (
    <>
      <Paper className="p-4 sticky top-[64px] space-y-9">
        {/* TODO: Avatar icon */}
        <Box className="space-y-4">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "25px",
            }}
          >
            <AvatarRing
              profilePic={profilePic}
              handleFileChange={handleFileChange}
            />
            <Typography
              color={"secondary"}
              textAlign={"center"}
              fontWeight={600}
            >
              {accountName.length < 2 ? "No name" : accountName}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", rowGap: "16px", flexDirection: "column" }}
          >
            <Stack direction={"row"} sx={{ columnGap: "8px" }}>
              {/* TODO: Phone call icon */}
              <PhoneRoundedIcon />
              <Typography>
                {!accountNum ? "No phone number" : accountNum}
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ columnGap: "8px" }}>
              {/* TODO: email icon */}
              <LanguageRoundedIcon />
              <Typography>
                {!accountEmail ? "No email" : accountEmail}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Stack direction={"column"} sx={{ rowGap: "16px" }}>
          <Button
            variant="contained"
            onClick={onClick}
            sx={{ color: "white", textTransform: "none", borderRadius: "7px" }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: "7px" }}
            onClick={onLogout}
          >
            Log Out
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

const AvatarRing = ({ profilePic, handleFileChange }) => {
  return (
    <>
      <Avatar
        alt=""
        src={profilePic}
        sx={{
          width: "100px",
          height: "100px",
          boxShadow: "0px 0px 6.548px 3.274px rgba(255, 161, 52, 0.30)",
          border: "5px solid #EE7200",
        }}
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          mt: "-2.5rem",
          minWidth: "auto",
          padding: "7px 8px",
          borderRadius: "50%",
        }}
      >
        <img
          src={editProfile}
          alt="edit profile image"
          width={"16px"}
          height={"17px"}
        />
        <input
          type="file"
          hidden
          id="userProfilePic"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
};
