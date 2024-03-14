import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Stack,
  Link,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/icons/SAS_Logo4.png";
import facebook_icon from "../../assets/icons/facebook.png";
import email_icon from "../../assets/icons/email.png";
import telegram_icon from "../../assets/icons/telegram.png";
import { pages } from "../../constants/landingPage";
import { CustomButton } from "../Button/CustomButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconLinks from "../IconLinks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomLink from "../CustomLink";
import useAuth from "../../hooks/useAuth";
import messageIcon from "../../assets/icons/Message Icon.svg";
import bellIcon from "../../assets/icons/Bell Icon.svg";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";

const icons = [
  { icon: facebook_icon, alt: "facebook icon" },
  { icon: email_icon, alt: "email icon" },
  { icon: telegram_icon, alt: "telegram icon" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isLoggedIn, user } = useAuth();

  console.log(isLoggedIn);
  console.log("helloworld from navbar");
  console.log(user);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <>
      {/* Navbar Container */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isRoot ? "transparent" : "white",
          color: isRoot ? "white" : "black",
        }}
        elevation={isRoot ? 0 : 7}
        component="header"
      >
        <Container maxWidth="xl">
          {" "}
          {/* Add margin to left and right */}
          <Toolbar component="nav">
            <Box
              display="flex"
              alignItems="center"
              component="nav"
              width="100%"
            >
              <Link to="/" component={RouterLink}>
                <img src={logo} alt="logo" width={46} height={46} />
              </Link>

              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  component={RouterLink}
                  color={isRoot ? "inherit" : "#2F4858"}
                  underline="none"
                  ml={2}
                >
                  SaveAStray
                </Link>
              </Typography>

              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {pages.map((page, index) => {
                  const isLearn = page === "Learn";
                  return (
                    <CustomLink
                      key={index}
                      sx={{
                        color: isRoot ? "white" : "#2F4858",
                      }}
                      to={isLearn ? "articles" : page}
                      component={RouterLink}
                      aria-label={page}
                      fontSize={16}
                      id={isLearn ? "learn-button" : undefined}
                      onMouseOver={isLearn ? handleClick : undefined}
                      onClick={isLearn ? handleClick : undefined}
                      aria-controls={open ? "learn-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      aria-disabled={isLearn}
                    >
                      {page}
                      {isLearn ? (
                        <IconButton
                          sx={{
                            padding: 0,
                            margin: 0,
                            color: isRoot ? "white" : "",
                          }}
                        >
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      ) : null}
                    </CustomLink>
                  );
                })}

                {/* Menu hamburger when mobile view */}
                <Menu
                  id="learn-menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{
                    "aria-labelledby": "learn-button",
                    onMouseLeave: handleMenuClose,
                  }}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem component={RouterLink} to="/articles">
                    <Typography variant="body2">Articles</Typography>
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/faq">
                    <Typography variant="body2">FAQ's</Typography>
                  </MenuItem>
                </Menu>

                {isLoggedIn ? (
                  <DisplayUserComponents />
                ) : (
                  <CustomButton
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to="signup"
                    startIcon={<AccountCircleIcon />}
                    sx={{ padding: "6px 16px" }}
                  >
                    Get Started
                  </CustomButton>
                )}
              </Stack>
              <IconButton
                onClick={handleDrawerOpen}
                color="inherit"
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Drawer for mobile */}
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={handleDrawerClose}
          sx={{ "& .MuiDrawer-paper": { width: "50%" }, display: "flex" }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              bgcolor: "orange",
              color: "white",
              flexDirection: "column",
            }}
          >
            <Link to="/" component={RouterLink}>
              <img src={logo} alt="logo" width={120} height={120} />
            </Link>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              SaveAStray
            </Typography>
          </Box>
          <Divider />
          <List>
            {pages.map((page, index) => (
              <div key={index}>
                <ListItemButton
                  button
                  component={RouterLink}
                  to={page}
                  onClick={handleDrawerClose}
                >
                  <ListItemText primary={page} />
                </ListItemButton>
                {index !== pages.length - 1 && <Divider />}
              </div>
            ))}
            <Divider />
            <ListItemButton
              button
              component={RouterLink}
              to="signup"
              onClick={handleDrawerClose}
            >
              <ListItemText primary="Get Started" />
            </ListItemButton>
          </List>
          <Box
            width="100%"
            textAlign="center"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pb: "1rem",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <IconLinks icons={icons} />
            <Typography
              variant="body2"
              // sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              © 2024 SaveAStray by Lyfie Tech 🧡
            </Typography>
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
}

function DisplayUserComponents() {
  return (
    <>
      <Box display={"flex"} sx={{ alignItems: "center", columnGap: "12px" }}>
        <Tooltip title="Messages">
          <RouterLink to="/chat">
            <img
              src={messageIcon}
              alt="messages"
              width={"42px"}
              height={"42px"}
            />
          </RouterLink>
        </Tooltip>
        <Tooltip title="Notifications">
          <RouterLink to="/request">
            <img
              src={bellIcon}
              alt="notifications"
              width={"42px"}
              height={"42px"}
            />
          </RouterLink>
        </Tooltip>
        <AvatarRing />
      </Box>
    </>
  );
}

const AvatarRing = () => {
  return (
    <>
      <Tooltip title="Manage Account">
        <Avatar
          component={RouterLink}
          to="/manage"
          alt="avatar placeholder"
          src={avatar_placeholder}
          sx={{
            boxShadow: "0px 0px 6.548px 3.274px rgba(255, 161, 52, 0.30)",
            border: "5px solid #EE7200",
          }}
        />
      </Tooltip>
    </>
  );
};
