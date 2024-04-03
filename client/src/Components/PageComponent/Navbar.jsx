// import react and other functions
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// import mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

// import icons and images
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/icons/SAS_Logo4.png";
import facebook_icon from "../../assets/icons/facebook.png";
import email_icon from "../../assets/icons/email.png";
import telegram_icon from "../../assets/icons/telegram.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import messageIcon from "../../assets/icons/Message Icon.svg";
import bellIcon from "../../assets/icons/Bell Icon.svg";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";

// import constant datas
import { pages } from "../../constants/landingPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import custom components
import { CustomButton } from "../Button/CustomButton";
import CustomLink from "../CustomLink";
import IconLinks from "../IconLinks";

const icons = [
  { icon: facebook_icon, alt: "facebook icon" },
  { icon: email_icon, alt: "email icon" },
  { icon: telegram_icon, alt: "telegram icon" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isLoggedIn, user, role } = useAuth();

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
  const [isHero, setIsHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isScrolled = scrollY > window.innerHeight * 0.7; // Change 0.9 to adjust the scroll threshold

      setIsHero(!isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isRoot && isHero ? "transparent" : "white",
          color: isRoot && isHero ? "white" : "black",
        }}
        elevation={isRoot && isHero ? 0 : 7}
        component="header"
      >
        {/* <Container maxWidth="xl"> */}
        <Toolbar component="nav">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              px: {
                md: "100px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Link to="/" component={RouterLink}>
                <img src={logo} alt="logo" width={46} height={46} />
              </Link>

              <Typography variant="h6" fontWeight="bold">
                <Link
                  to="/"
                  component={RouterLink}
                  color={isRoot && isHero ? "inherit" : "#2F4858"}
                  underline="none"
                  ml={2}
                >
                  SaveAStray
                </Link>
              </Typography>
            </Box>

            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              {pages.map((page, index) => {
                const isLearn = page === "Learn";
                return (
                  <CustomLink
                    key={index}
                    sx={{
                      color: isRoot && isHero ? "white" : "#2F4858",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                    {isLearn ? <KeyboardArrowDownIcon /> : null}
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
                <DisplayUserComponents
                  userIsLoggedIn={isLoggedIn}
                  userRole={role}
                />
              ) : (
                <CustomButton
                  variant="contained"
                  size="small"
                  component={RouterLink}
                  to="register"
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
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
        {/* </Container> */}

        {/* Drawer for mobile */}
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={handleDrawerClose}
          sx={{
            "& .MuiDrawer-paper": {
              width: {
                xs: "80%",
                sm: "70%",
                md: "50%",
              },
            },
            display: "flex",
          }}
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

function DisplayUserComponents({ userIsLoggedIn, userRole }) {
  let requestLink = "/login"; // Default link to login page

  // Determine the manage account link based on the user's role
  if (userIsLoggedIn) {
    if (userRole === "Adoptive Pawrent") {
      requestLink = "/request/pawrent";
    } else if (userRole === "Rescue Shelter") {
      requestLink = "/request/shelter";
    }
  }

  return (
    <>
      <Box display={"flex"} sx={{ alignItems: "center", columnGap: "12px" }}>
        <Tooltip title="Messages">
          <RouterLink to="/messages">
            <img
              src={messageIcon}
              alt="messages"
              width={"42px"}
              height={"42px"}
            />
          </RouterLink>
        </Tooltip>
        <Tooltip title="Notifications">
          <RouterLink to={requestLink}>
            <img
              src={bellIcon}
              alt="notifications"
              width={"42px"}
              height={"42px"}
            />
          </RouterLink>
        </Tooltip>
        <AvatarRing accountIsLoggedIn={userIsLoggedIn} accountRole={userRole} />
      </Box>
    </>
  );
}

const AvatarRing = ({ accountIsLoggedIn, accountRole }) => {
  let manageAccountLink = "/login"; // Default link to login page

  // Determine the manage account link based on the user's role
  if (accountIsLoggedIn) {
    if (accountRole === "Adoptive Pawrent") {
      manageAccountLink = "/manage/pawrent";
    } else if (accountRole === "Rescue Shelter") {
      manageAccountLink = "/manage/shelter";
    }
  }

  return (
    <>
      <Tooltip title="Manage Account">
        <Avatar
          component={RouterLink}
          to={manageAccountLink}
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
