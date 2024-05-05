import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import logo from "../../assets/icons/SAS_Logo4.png";
import { pages2, icons } from "../../constants/landingPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import messageIcon from "../../assets/icons/Message Icon.svg";
import bellIcon from "../../assets/icons/Bell Icon.svg";
import SAS_Logo from "../../assets/icons/SAS_Logo4.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import CustomLink from "../CustomLink";
import { CustomButton } from "../Button/CustomButton";
import IconLinks from "../IconLinks";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
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

  // drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={isRoot && isHero ? 0 : 7}
        component={"header"}
        sx={{
          backgroundColor: isRoot && isHero ? "transparent" : "white",
          color: isRoot && isHero ? "white" : "black",
        }}
      >
        <Toolbar component={"nav"}>
          <NavbarContent
            isRoot={isRoot}
            isHero={isHero}
            onClick={handleDrawerOpen}
          />
        </Toolbar>

        <NavbarDrawer open={openDrawer} onClose={handleDrawerClose} />
      </AppBar>
    </>
  );
};

export default Navbar;

function NavbarContent({ isRoot, isHero, onClick }) {
  const { isLoggedIn, user, role } = useAuth();

  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        mx: {
          xs: 0,
          md: "100px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <img
          src={logo}
          alt={"logo"}
          width={46}
          height={46}
          component={RouterLink}
          to="/"
        />
        <Typography
          variant="h6"
          component={RouterLink}
          to={"/"}
          sx={{
            color: isRoot && isHero ? "inherit" : "#2F4858",
            ml: 2,
            fontWeight: "bold",
          }}
        >
          SaveAStray
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          columnGap: "24px",
          display: { xs: "none", lg: "flex" },
        }}
      >
        {pages2.map((page, idx) => {
          const isLearn = page.name === "Learn";
          return (
            <CustomLink
              key={idx}
              sx={{
                color: isRoot && isHero ? "white" : "#2F4858",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
              }}
              component={RouterLink}
              to={isLearn ? undefined : `/${page.name}`}
              onClick={isLearn ? handleClick : undefined}
              aria-label={page.name}
              id={isLearn ? "learn-button" : undefined}
              aria-controls={open ? "learn-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {page.name}
              {isLearn ? <KeyboardArrowDownIcon /> : null}
            </CustomLink>
          );
        })}

        <LearnMenu onClose={handleClose} anchorEl={anchorEl} open={open} />

        {isLoggedIn ? (
          <DisplayUserComponents />
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
        onClick={onClick}
        color="inherit"
        sx={{ display: { lg: "none" } }}
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </Box>
  );
}

function LearnMenu({ onClose, anchorEl, open }) {
  return (
    <>
      <Menu
        id="learn-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "learn-button",
          onMouseLeave: onClose,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component={RouterLink} to={"/articles"}>
          Articles
        </MenuItem>
        <MenuItem component={RouterLink} to={"/faq"}>
          FAQ's
        </MenuItem>
      </Menu>
    </>
  );
}

function DisplayUserComponents() {
  const { isLoggedIn, user, role } = useAuth();

  let requestLink = "/login"; // Default link to login page

  // Determine the manage account link based on the user's role
  if (isLoggedIn) {
    if (role === "Adoptive Pawrent") {
      requestLink = "/request/pawrent";
    } else if (role === "Rescue Shelter") {
      requestLink = "/request/shelter";
    }
  }

  return (
    <>
      <Box display={"flex"} sx={{ alignItems: "center", columnGap: "12px" }}>
        <Tooltip title="Messages">
          <RouterLink to="/messages/t">
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
        <AvatarRing />
      </Box>
    </>
  );
}

const AvatarRing = () => {
  const { isLoggedIn, user, role } = useAuth();

  let manageAccountLink = "/login"; // Default link to login page

  // Determine the manage account link based on the user's role
  if (isLoggedIn) {
    if (role === "Adoptive Pawrent") {
      manageAccountLink = "/manage/pawrent";
    } else if (role === "Rescue Shelter") {
      manageAccountLink = "/manage/shelter";
    }
  }

  return (
    <>
      <Tooltip title="Manage Account">
        <Avatar
          component={RouterLink}
          to={manageAccountLink}
          alt={SAS_Logo}
          src={SAS_Logo}
          sx={{
            boxShadow: "0px 0px 6.548px 3.274px rgba(255, 161, 52, 0.30)",
            border: "5px solid #EE7200",
          }}
        />
      </Tooltip>
    </>
  );
};

function NavbarDrawer({ open, onClose }) {
  const { isLoggedIn, user, role } = useAuth();
  let rolePath = "";
  if (isLoggedIn) {
    rolePath = role.split(" ").pop().toLowerCase();
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
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
          <img
            src={logo}
            alt="logo"
            width={120}
            height={120}
            component={RouterLink}
            to="/"
          />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
            SaveAStray
          </Typography>
        </Box>
        <Divider />
        <List>
          {pages2.map((page, index) => (
            <div key={index}>
              <ListItemButton
                button
                component={RouterLink}
                to={page.path}
                onClick={onClose}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
              {index !== pages2.length - 1 && <Divider />}
            </div>
          ))}
          <Divider />
          {isLoggedIn ? (
            <>
              <ListItemButton
                component={RouterLink}
                to="/messages/t"
                onClick={onClose}
              >
                <ListItemText primary="Messages" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                component={RouterLink}
                to={`/request/${rolePath}`}
                onClick={onClose}
              >
                <ListItemText primary="Request" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                component={RouterLink}
                to="/manage"
                onClick={onClose}
              >
                <ListItemText primary="Account" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              button
              component={RouterLink}
              to="/register"
              onClick={onClose}
            >
              <ListItemText primary="Get Started" />
            </ListItemButton>
          )}
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
          <Typography variant="body2">
            © 2024 SaveAStray by Lyfie Tech 🧡
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
