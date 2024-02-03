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
} from "@mui/material";
import logo from "../assets/icons/SAS_Logo4.png";
import heroImage from "../assets/images/image_13.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const headerImage = {
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "80vh",
};

const filter = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(213, 127, 46, 0.5)",
};

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

export const LandingPageP = () => {
  return (
    <>
      <Box position="relative" sx={headerImage}>
        <div style={filter}></div>
        <Box position="absolute" width="100%">
          <Stack direction="column" rowGap={18}>
            <Navbar />
            <HeroContent />
            <HeroCard />
          </Stack>
        </Box>
      </Box>
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
          border: "1px solid",
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
                    href={page}
                  >
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
    </>
  );
}

function HeroContent() {
  return (
    <Container maxWidth="md" sx={{ border: "1px solid" }}>
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

const HeroCard = () => {
  return (
    <Container maxWidth="lg" sx={{ border: "1px solid" }}>
      <Grid container justifyContent="center">
        {cardContent.map((card, index) => (
          <Grid item key={index} maxWidth="300px">
            <Card>
              <CardContent>
                <Paper sx={{ display: "inline-block" }}>
                  <FavoriteBorderIcon />
                </Paper>
                <Typography variant="h4" component="div">
                  {card.title}
                </Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
              <CardActions>
                <Button endIcon={<ChevronRightIcon />}>Read more</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
