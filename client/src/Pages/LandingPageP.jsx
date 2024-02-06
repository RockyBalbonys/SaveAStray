import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Stack,
  Typography,
  IconButton,
  Link,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import logo from "../assets/icons/SAS_Logo4.png";
import heroImage from "../assets/images/image_13.png";
import catImage from "../assets/images/Cats.png";
import dogImage from "../assets/images/Dogs.png";
import donateImage from "../assets/images/image_donate.png";
import aboutImage from "../assets/images/image_14.png";
import facebook_icon from "../assets/icons/facebook.png";
import email_icon from "../assets/icons/email.png";
import telegram_icon from "../assets/icons/telegram.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";

const headerImage = {
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "80vh",
};

const donateBackground = {
  position: "relative",
  backgroundImage: `url(${donateImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const filter = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "rgba(213, 127, 46, 0.5)",
};

const pages = ["About", "Animals", "Learn", "Donate", "Contact"];
const legal = ["Terms of Services", "Privacy Policy", "Data Privacy Act"];
const contacts = [
  "University of Caloocan City - North Congress",
  "+63-994-478-639",
  "lyfiesupport@gmail.com",
];
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
const helpContent = [
  {
    title: "Donate",
    description:
      "Shelters need money to cover the costs of food, shelter, and medical care for the animals",
  },
  {
    title: "Adopt",
    description:
      "There are so many animals in shelters waiting for loving homes",
  },
  {
    title: "Volunteer",
    description:
      "Rescue shelters are always in need of volunteers to help with a variety of tasks",
  },
  {
    title: "Sponsor",
    description:
      "If you can't adopt an animal permanently, you can consider sponsoring one",
  },
  {
    title: "Advocate",
    description:
      "Help animal adoption centers by advocating for animal welfare laws and policies.",
  },
  {
    title: "Spread The Word",
    description:
      "Tell your friends about your local animal adoption center and encourage them to help out",
  },
];

export const LandingPageP = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} position="relative">
          <Box sx={headerImage}>
            <div style={filter}></div>
            <Box position="absolute" width="100%">
              <Stack direction="column" rowGap={18}>
                <Navbar />
                <HeroContent />
                <HeroCard />
                <Stack direction="column" rowGap={13.5}>
                  <Grid
                    item
                    xs={12}
                    sx={{ paddingLeft: 13.5, paddingRight: 13.5 }}
                  >
                    <AboutContent />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ background: "#FAFAFB" }}
                    padding={13.5}
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

function Navbar() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              component="nav"
              width="100%"
            >
              <IconButton>
                <img src={logo} alt="logo" width={46} height={46} />
              </IconButton>
              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                SaveAStary
              </Typography>
              <Stack spacing={3} direction="row" alignItems="center">
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    to={page}
                    component={RouterLink}
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
    </>
  );
}

function HeroContent() {
  return (
    <Container maxWidth="md">
      <Stack
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
              lg: "h1",
            },
            fontWeight: "bold",
          }}
        >
          Rescue.Adopt.Love
        </Typography>
        <Typography variant="h5">
          Looking for a loyal adventure buddy? Look no further than your local
          shelter! Adopt a pup and fill your life with pawsitive memories.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">I am a Pawrent</Button>
          <Button variant="contained">I am a Rescue Shelter</Button>
        </Stack>
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
            <Card sx={{ padding: "32px", height: "100%" }} elevation={4}>
              <CardContent sx={{ padding: 0 }}>
                <Stack spacing="12px" direction="column">
                  <Paper
                    sx={{
                      display: "inline-block",
                      padding: "8px",
                      width: "fit-content",
                    }}
                  >
                    <FavoriteBorderIcon
                      sx={{ width: "40px", height: "35px" }}
                    />
                  </Paper>
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  sx={{ padding: 0, margin: 0 }}
                  endIcon={<ChevronRightIcon />}
                >
                  Read more
                </Button>
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
              <Button variant="contained" endIcon={<ChevronRightIcon />}>
                Read more
              </Button>
              <Button variant="outlined">Donate</Button>
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
            <Card sx={{ padding: "32px", height: "100%" }} elevation={4}>
              <CardContent sx={{ padding: 0 }}>
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
                  <Button
                    sx={{ padding: 0, margin: 0 }}
                    endIcon={<ChevronRightIcon />}
                  >
                    Read more
                  </Button>
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

function Donate() {
  return (
    <Box sx={donateBackground} component="section">
      <div style={filter}></div>
      <Box
        position="absolute"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 7.8,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="white">
          Help SaveAStray to end animal loneliness
        </Typography>
        <Button variant="contained" size="large">
          Donate Now
        </Button>
      </Box>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        padding: 6,
        backgroundColor: "rgb(38, 58, 71)",
        color: "rgba(255, 161, 52, 1)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Stack direction="column" rowGap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <img src={logo} width={85} height={85} alt="Logo" />
                <Typography sx={{ fontSize: "36px", fontWeight: "bold" }}>
                  SaveAStray
                </Typography>
              </Box>
              <Box>
                <Typography>Rescue. Adopt. Love</Typography>
                <Typography>
                  They deserve a place to call home. Be the reason their tail
                  wags again. Join the pack. Make a difference. Save a stray.
                </Typography>
                <Stack direction="row" columnGap={3}>
                  <IconButton>
                    <img src={facebook_icon} alt="facebook icon" width="26px" />
                  </IconButton>
                  <IconButton>
                    <img src={email_icon} alt="email icon" width="26px" />
                  </IconButton>
                  <IconButton>
                    <img src={telegram_icon} alt="telegram icon" width="26px" />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack direction="row" columnGap={11.8} marginBottom={3}>
              <LinksItem items={pages} category="Websites" />
              <LinksItem items={legal} category="Legal" />
              <LinksItem items={contacts} category="Contacts" />
            </Stack>
          </Grid>
          <Divider
            orientation="horizontal"
            width="100%"
            sx={{ bgcolor: "rgba(255, 161, 52, 1)", marginTop: 3 }}
          />
          <Box
            width="100%"
            textAlign="center"
            sx={{
              padding: "32px 0 0 0",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              © 2024 SaveAStray by Lyfie Tech 🧡
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

function LinksItem({ items, category }) {
  return (
    <Stack direction="column" columnGap={1} rowGap={1}>
      <Typography fontWeight="bold" gutterBottom>
        {category}
      </Typography>
      {items.map((page, index) => (
        <Link
          underline="hover"
          key={index}
          sx={{ color: "rgba(255, 161, 52, 1)" }}
          href={page}
        >
          {page}
        </Link>
      ))}
    </Stack>
  );
}
