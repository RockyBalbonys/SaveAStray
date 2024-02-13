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
} from "@mui/material";
import { MyPrimaryButton, MySecondaryButton } from "./CustomButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/icons/SAS_Logo4.png";
import { pages } from "../constants/landingPage";
import { CustomButton } from "./CustomButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
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
              {pages.map((page, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  to={page}
                  component={RouterLink}
                  aria-label={page}
                  fontSize={16}
                >
                  {page}
                </Link>
              ))}
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
        sx={{ "& .MuiDrawer-paper": { width: "50%" } }}
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
        <List></List>
      </Drawer>
    </AppBar>
  );
}
