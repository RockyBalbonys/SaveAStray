import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CustomButton } from "../Components/Button/CustomButton";
import heroImage from "../assets/images/image_13.png";
import catImage from "../assets/images/Cats.png";
import dogImage from "../assets/images/Dogs.png";
import aboutImage from "../assets/images/image_14.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Donate from "../Components/PageComponent/Donate";
import Footer from "../Components/PageComponent/Footer";
import { cardContent, helpContent, filter } from "../constants/landingPage";

const headerImage = {
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "80vh",
};

export const LandingPage = () => {
  return (
    <>
      <Grid container component="main" mt="-4rem">
        <Grid item xs={12} position="relative">
          <Box sx={headerImage}>
            <div style={filter}></div>
            <Box position="absolute" width="100%">
              <Stack direction="column" rowGap={18}>
                <HeroContent />
                <HeroCard />

                <Grid item xs={12} sx={{ paddingLeft: 3, paddingRight: 3 }}>
                  <AboutContent />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ background: "#FAFAFB" }}
                  padding={"6.75rem 0px"}
                >
                  <HelpContent />
                  <HelpCard />
                </Grid>
                <Grid item xs={12}>
                  <MeetTheRescues />
                </Grid>
                <Grid item xs={12}>
                  <Donate />
                </Grid>
              </Stack>
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;

function HeroContent() {
  return (
    <Container maxWidth="md">
      <Stack
        mt={15}
        direction="column"
        textAlign="center"
        spacing={4}
        color="white"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            typography: {
              xs: "h3",
              sm: "h2",
              md: "h1",
              lg: "h1",
            },
            fontWeight: "bold",
          }}
        >
          Rescue.Adopt.Love
        </Typography>
        <Typography
          variant="h5"
          sx={{
            typography: {
              xs: "body1",
              sm: "h6",
              md: "h6",
              lg: "h6",
            },
          }}
        >
          Looking for a loyal adventure buddy? Look no further than your local
          shelter! Adopt a pup and fill your life with pawsitive memories.
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          <Grid item>
            <Link to="/login?role=Adoptive Pawrent" component={RouterLink}>
              <CustomButton variant="contained" sx={{ padding: "8px 48px" }}>
                I am a <span className="font-bold">&nbsp;Pawrent</span>
              </CustomButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/login?role=Rescue Shelter" component={RouterLink}>
              <CustomButton variant="contained" sx={{ padding: "8px 21px" }}>
                I am a <span className="font-bold">&nbsp;Rescue Shelter</span>
              </CustomButton>
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

function HeroCard({ items }) {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        spacing={2}
        alignContent="baseline"
      >
        {cardContent.map((card, index) => (
          <Grid item key={index} maxWidth="300px">
            <Card
              sx={{
                padding: "32px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              elevation={4}
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
                    <img
                      src={card.icon}
                      alt={card.icon}
                      width="40px"
                      height="40px"
                    />
                  </Paper>
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
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
    <Container maxWidth="md" disableGutters>
      <Grid container alignItems="center" columnSpacing={10}>
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
          <Box width="473px" sx={{ backgroundSize: "cover" }}>
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
          <Grid item key={index} maxWidth="300px">
            <Card
              sx={{
                padding: "32px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              elevation={4}
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
                    <FavoriteBorderIcon
                      sx={{ width: "40px", height: "35px" }}
                    />
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
        ))}
      </Grid>
    </Container>
  );
}

function MeetTheRescues() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "32px",
          gap: 4,
          my: "-4rem",
        }}
      >
        <Typography
          mb={4}
          textAlign="center"
          variant="h4"
          component="div"
          fontWeight="bold"
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
          <Grid item xs={12} sm={6}>
            <Box>
              <img src={dogImage} alt="Dogs" width="100%" />
              <Typography color="initial">Dogs</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <img src={catImage} alt="Cats" width="100%" />
              <Typography color="initial">Cats</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
