import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";

export const AccountAvatar = ({ onClick, onLogout }) => {
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
            <AvatarRing />
            <Typography color={"secondary"} fontWeight={600}>
              NAME GOES HERE
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", rowGap: "16px", flexDirection: "column" }}
          >
            <Stack direction={"row"} sx={{ columnGap: "8px" }}>
              {/* TODO: Phone call icon */}
              <PhoneRoundedIcon />
              <Typography>012345671234</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ columnGap: "8px" }}>
              {/* TODO: email icon */}
              <LanguageRoundedIcon />
              <Typography>example@gmail.com</Typography>
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
