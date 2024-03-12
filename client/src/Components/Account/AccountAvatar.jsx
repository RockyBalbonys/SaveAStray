import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";

export const AccountAvatar = () => {
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
