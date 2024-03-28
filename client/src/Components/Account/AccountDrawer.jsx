import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Avatar, Paper, Stack } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";
import editProfile from "../../assets/icons/editImage.svg";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function AccountDrawer(props, { component }) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Root className="SwipeableEdgeDrawer">
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root.SwipeableEdgeDrawer > .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            zIndex: 1000,
            "& .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              borderTop: "5px solid #FF8210",
            }}
          >
            <Puller />
            <Typography
              sx={{
                p: 2,
                color: "text.secondary",
                textAlign: "center",
                mt: "6px",
              }}
            >
              Manage your account
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <AccountAvatar />
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </>
  );
}

const AccountAvatar = () => {
  return (
    <>
      <Box className="p-4 sticky top-[64px] space-y-9 h-full flex flex-col items-center justify-center">
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
              <PhoneRoundedIcon />
              <Typography>012345671234</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ columnGap: "8px" }}>
              <LanguageRoundedIcon />
              <Typography>example@gmail.com</Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
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
        <input type="file" hidden />
      </Button>
    </>
  );
};
