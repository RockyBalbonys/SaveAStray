import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import { Link as RouterLink } from "react-router-dom";
import { CustomButton } from "../Components/Button/CustomButton";
import heroImage from "../assets/images/Herocopy.png";
import catImage from "../assets/images/Cats.png";
import dogImage from "../assets/images/Dogs.png";
import aboutImage from "../assets/images/image_14.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Donate from "../Components/PageComponent/Donate";
import Footer from "../Components/PageComponent/Footer";
import { cardContent, helpContent } from "../constants/landingPage";

export const Home = () => {
  return (
    <>
      <Stack sx={{ mt: "-4rem" }}>
        <HeroSection />
        <HeroCard />
        <AboutContent />
        <Box
          sx={{
            backgroundColor: "#FAFAFB",
            py: {
              xs: "24px",
              sm: "34px",
              md: "108px",
            },
            mt: { sm: "0px", md: "-52px" },
          }}
        >
          <HelpContent />
          <HelpCard />
          <MeetTheRescues />
        </Box>
        <Donate />
        <Footer />
      </Stack>
    </>
  );
};

const H1Style = {
  textAlign: "center",
  fontWeight: "900",
  color: "white",
  fontSize: {
    xs: "1.9rem",
    sm: "2rem",
    md: "4.5rem",
    lg: "6.25rem",
  },
};

const H2Style = {
  textAlign: "center",
  fontWeight: "400",
  width: {
    md: "600px",
    lg: "800px",
  },
  color: "white",
  fontSize: {
    xs: "1rem",
    sm: "1rem",
    md: "1.25rem",
  },
};

const cardHeroStyle = {
  boxShadow: "0px 0px 7px 1px rgba(0, 0, 0, 0.05)",
  borderRadius: "7px",
  border: "1px solid rgba(0, 0, 0, 0.10);",
  backgroundColor: "#FAFAFB",
  padding: "32px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  color: "#2F4858",
  transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",

  "&:hover": {
    boxShadow: "0px 4px 20px 3px rgba(0, 0, 0, 0.15)",
    transform: "scaleY(1.1)",
    transformOrigin: "top",
  },
};

const cardHelpStyle = {
  boxShadow: "0px 0px 7px 1px rgba(0, 0, 0, 0.05)",
  borderRadius: "7px",
  border: "1px solid rgba(0, 0, 0, 0.10);",
  backgroundColor: "#FAFAFB",
  padding: "32px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  color: "#2F4858",
  "&:hover": {
    boxShadow: "0px 4px 20px 3px rgba(0, 0, 0, 0.15)",
  },
};

function HeroSection() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImage})`,
        position: "relative",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography sx={H1Style}>Rescue.Adopt.Love</Typography>
        <Typography sx={H2Style}>
          Looking for a loyal adventure buddy? Look no further than your local
          shelter! Adopt a pup and fill your life with pawsitive memories.
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Grid item>
            <CustomButton
              to="/login?role=Adoptive Pawrent"
              component={RouterLink}
              variant="contained"
              sx={{ padding: "8px 48px" }}
            >
              I am a <span className="font-bold">&nbsp;Pawrent</span>
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              to="/login?role=Rescue Shelter"
              component={RouterLink}
              variant="contained"
              sx={{ padding: "8px 21px" }}
            >
              I am a <span className="font-bold">&nbsp;Rescue Shelter</span>
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function HeroCard() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: "-10rem", zIndex: "100" }}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        alignContent="baseline"
      >
        {cardContent.map((card, index) => (
          <Grid item md={4} key={index} width="300px">
            <Card
              sx={cardHeroStyle}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <CardContent sx={{ padding: 0, flexGrow: 1 }}>
                <Stack spacing="12px" direction="column">
                  <Paper
                    sx={{
                      display: "inline-block",
                      padding: "8.55px 5.7px",
                      width: "fit-content",
                      borderRadius: "7px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundImage: `url(${
                          hovered === index ? card.iconFilled : card.icon
                        })`,
                        display: "flex",
                        alignItems: "center",
                        width: "60px",
                        height: "60px",
                        transition: "background-image 0.3s ease-in-out",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    ></Box>
                  </Paper>
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {card.title}
                  </Typography>
                  <Typography fontWeight={400}>{card.description}</Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ padding: 0, margin: 0 }}>
                <CustomButton
                  endIcon={<ChevronRightIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Read more
                </CustomButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function AboutContent() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: "24px",
          sm: "34px",
          md: "108px",
        },
        my: { xs: "40px", sm: "50px", md: "0px" },
        color: "#2F4858",
      }}
    >
      <Grid container>
        <Grid item md={6}>
          <Stack direction="column" spacing={4}>
            <Typography variant="h5" component="div" fontWeight="bold">
              About SaveAStray
            </Typography>
            <Box>
              <Typography fontWeight="bold" sx={{ marginBottom: "16px" }}>
                We're a band of student coders with a mission - to bridge the
                gap between loving homes and abandoned paws.
              </Typography>
              <Typography>
                We connect hundreds of furry souls with potential paw-rents,
                offering a one-stop shop for adoption journeys. No more endless
                shelter visits, just a convenient platform teeming with love
                waiting to be discovered.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <CustomButton variant="contained" endIcon={<ChevronRightIcon />}>
                Read more
              </CustomButton>
              <CustomButton variant="outlined">Donate</CustomButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Box
            width="100%"
            sx={{
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img src={aboutImage} alt="about image" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

function HelpContent() {
  return (
    <Container maxWidth="md">
      <Box
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "32px",
          color: "#2F4858",
        }}
      >
        <Typography mb={4} variant="h4" component="div" fontWeight="bold">
          How You Can Help
        </Typography>
        <Typography maxWidth="600px">
          A little help with caring hearts can become a wave of compassion,
          protecting a multitude of our animal companions
        </Typography>
      </Box>
    </Container>
  );
}

function HelpCard() {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        spacing={2}
        alignContent="baseline"
        rowSpacing={4}
        columnSpacing={3}
      >
        {helpContent.map((card, index) => (
          <HelpCardItem key={index} card={card} index={index} />
        ))}
      </Grid>
    </Container>
  );
}

function HelpCardItem({ card, index }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const badgeStyle = {
    position: "absolute",
    top: -10,
    left: 16,
    backgroundColor: hovered ? "#EE7200" : "#FFF",
    boxShadow: "0px 1px 2.5px rgba(0, 0, 0, 0.10)",
    border: hovered ? "0.5px solid white" : "0.5px solid transparent",
    color: hovered ? "white" : "#2F4858",
    transition: "background-color border color 0.3s ease-in-out",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        minWidth: {
          xs: "326px",
          sm: "326px",
        },
      }}
    >
      <Card
        sx={cardHelpStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent sx={{ padding: 0, flexGrow: 1 }}>
          <Stack
            spacing="12px"
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box
              sx={{
                display: "inline-block",
                padding: "8px",
                width: "fit-content",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${
                    hovered ? card.iconFilled : card.icon
                  })`,
                  width: "57px",
                  height: "57px",
                  transition: "background-image 0.3s ease-in-out",
                  position: "relative",
                }}
              >
                <Badge sx={badgeStyle}>0{index + 1}</Badge>
              </Box>
            </Box>
            <Typography variant="h6" component="div">
              {card.title}
            </Typography>
            <Typography>{card.description}</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Box textAlign="center" width="100%">
            <CustomButton
              sx={{
                padding: 0,
                margin: 0,
                textTransform: "none",
              }}
              endIcon={<ChevronRightIcon />}
            >
              Read more
            </CustomButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

function MeetTheRescues() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: "40px", sm: "50px", md: "195px", color: "#2F4858" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "32px",
          gap: 4,
        }}
      >
        <Typography
          textAlign="center"
          variant="h4"
          component="div"
          fontWeight="bold"
          sx={{
            mb: {
              xs: 1,
              sm: 2,
              md: 4,
            },
          }}
        >
          Meet The Rescues
        </Typography>
        <Typography>
          <Typography fontWeight="bold" component="span">
            Across the country, dedicated shelters open their doors to hundreds
            of rescued animals, each with a story of hardship and resilience.
          </Typography>
          These havens become sanctuaries, offering not just food and shelter,
          but a chance at healing and a future filled with love. Be moved by the
          power of rescue - together, we can ensure the voiceless are heard.
        </Typography>
        <Grid container textAlign="center" columnSpacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <ButtonAnimals img={dogImage} />
              <Typography color="initial">Dogs</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <ButtonAnimals img={catImage} />
              <Typography color="initial">Cats</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

function ButtonAnimals({ img }) {
  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .myBtn1": {
          visibility: "visible",
          opacity: 1,
        },
      }}
    >
      <img src={img} alt="Dogs" width="100%" />
      <Box
        className="myBtn1"
        sx={{
          visibility: "hidden",
          opacity: 0,
          transition: "opacity 0.3s ease, visibility 0s 0.3s",
        }}
      >
        <Button
          component={RouterLink}
          to="/Animals"
          className="myBtn1"
          sx={{
            color: "white",
            bgcolor: "rgba(255, 174, 78, 0.70)",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            textTransform: "none",
            fontWeight: "500",
            opacity: 1,
            display: "flex",
            flexDirection: "row",
            "&:hover": {
              bgcolor: "rgba(255, 174, 78, 0.70)",
            },
          }}
          endIcon={<ChevronRightIcon />}
        >
          Meet Them
        </Button>
      </Box>
    </Box>
  );
}
