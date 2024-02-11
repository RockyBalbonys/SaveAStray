import { Route, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import logo from "../assets/icons/SAS_Logo4.png";
import { pages } from "../constants/landingPage";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "darkOrange",
        boxShadow: "none",
      }}
      component="header"
    >
      <Container maxWidth="xl">
        <Toolbar component="nav">
          <Box display="flex" alignItems="center" component="nav" width="100%">
            <IconButton>
              <Link to="/" component={RouterLink}>
                <img src={logo} alt="logo" width={46} height={46} />
              </Link>
            </IconButton>

            <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                component={RouterLink}
                color="inherit"
                underline="none"
              >
                SaveAStray
              </Link>
            </Typography>
            <Stack spacing={3} direction="row" alignItems="center">
              {pages.map((page, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  to={page}
                  component={RouterLink}
                  aria-label={page}
                >
                  {page}
                </Link>
              ))}
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to="signup"
              >
                Get Started
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
