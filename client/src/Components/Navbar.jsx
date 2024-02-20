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
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/icons/SAS_Logo4.png";
import facebook_icon from "../assets/icons/facebook.png";
import email_icon from "../assets/icons/email.png";
import telegram_icon from "../assets/icons/telegram.png";
import { pages } from "../constants/landingPage";
import { CustomButton } from "./CustomButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconLinks from "./IconLinks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomLink from "./CustomLink";

const icons = [
  { icon: facebook_icon, alt: "facebook icon" },
  { icon: email_icon, alt: "email icon" },
  { icon: telegram_icon, alt: "telegram icon" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: isRoot ? "darkOrange" : "white",
        color: isRoot ? "white" : "black",
      }}
      component="header"
    >
      <Container maxWidth="xl">
        <Toolbar component="nav">
          <Box display="flex" alignItems="center" component="nav" width="100%">
            <Link to="/" component={RouterLink}>
              <img src={logo} alt="logo" width={46} height={46} />
            </Link>

            <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                component={RouterLink}
                color="inherit"
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
                    color="inherit"
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
                      <IconButton>
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    ) : null}
                  </CustomLink>
                );
              })}
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
                  Articles
                </MenuItem>
                <MenuItem component={RouterLink} to="/faq">
                  FAQ's
                </MenuItem>
              </Menu>

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
  );
}
