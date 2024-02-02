import React from "react";
import {
  Stack,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Typography,
  IconButton,
  Link,
  Card,
  CardContent,
  CardActions,
  Paper,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import heroImage from "../assets/images/image_13.png";
import aboutImage from "../assets/images/image_14.png";
import logo from "../assets/icons/SAS_Logo4.png";

const pages = ["About", "Animals", "Learn", "Donate", "Contact"];
const cardContent = [
  {
    title: "Save A Life",
    description:
      "By adopting from a local shelter, you are directly pulling an animal at risk of euthanasia.",
  },
  {
    title: "Support Your Community",
    description:
      "Shelters rely on community support to function and care for their animals.",
  },
  {
    title: "Discover Fur-ever Friend",
    description:
      "Shelters are home to a wonderful animals, with unique personalities waiting to be discovered. ",
  },
];
const headerImage = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const filter = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(213, 127, 46, 0.5)",
};

export const LandingPage = () => {
  return (
    <>
      <Box position="relative" sx={headerImage}>
        <div style={filter}></div>
        {/* Hero Image */}
        <Stack position="absolute" top={10} width="100%">
          <Navbar />
          <HeroSection />
          <HeroCard />
          <Box mt={3}>
            <AboutSection />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default LandingPage;

const Navbar = () => {
  return (
    <AppBar sx={{ background: "transparent", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo and Brand */}
          <Box display="flex" alignItems="center" width="100%">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <IconButton>
                <img src={logo} alt="logo" width={46} />
              </IconButton>
              <Typography variant="h6" component="div">
                SaveAStray
              </Typography>
            </Stack>

            {/* Navigation Links and Get Started Button */}
            <Stack
              direction="row"
              spacing="24px"
              display="flex"
              alignItems="center"
            >
              {pages.map((page) => (
                <Link key={page} color="inherit" underline="hover" href={page}>
                  {page}
                </Link>
              ))}
              <Button variant="contained" size="small">
                Get Started
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        height: "65vh",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        Rescue.Adopt.Love
      </Typography>
      <Typography variant="h5" width="30%" textAlign="center">
        Looking for a loyal adventure buddy? Look no further than your local
        shelter! Adopt a pup and fill your life with pawsitive memories.
      </Typography>
    </Box>
  );
};

const HeroCard = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {cardContent.map((card) => (
          <Grid item xs={12} md={4} key={card.title}>
            <Card sx={{ padding: "32px", minHeight: "300px" }}>
              <CardContent sx={{ padding: 0 }}>
                <Paper sx={{ display: "inline-block", padding: "8px" }}>
                  <FavoriteBorderIcon sx={{ width: "45px", height: "45px" }} />
                </Paper>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  mt={2}
                  fontWeight="bold"
                >
                  {card.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: "0", marginTop: "16px" }}>
                <Button sx={{ padding: "0" }} endIcon={<ChevronRightIcon />}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const AboutSection = () => {
  return (
    <Container maxWidth="md">
      <Grid container alignItems="center">
        <Grid item md={6}>
          <Typography variant="h5" color="initial">
            About SaveAStray
          </Typography>
          <Typography>
            We're a band of student coders with a mission - to bridge the gap
            between loving homes and abandoned paws.
          </Typography>
          <Typography>
            We connect hundreds of furry souls with potential paw-rents,
            offering a one-stop shop for adoption journeys. No more endless
            shelter visits, just a convenient platform teeming with love waiting
            to be discovered.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained">Read More</Button>
            <Button variant="outlined">Donate</Button>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <img src={aboutImage} alt="About image" />
        </Grid>
      </Grid>
    </Container>
  );
};
