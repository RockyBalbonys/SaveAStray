import bgImage from "../assets/images/intersect.png";
import vector from "../assets/images/vector.png";
import aboutImage from "../assets/images/aboutImage.png";
import about from "../assets/images/about.png";
import pawBG from "../assets/images/Paw.png";
import { Box, Container, Typography, Stack, Grid, Paper } from "@mui/material";
import mission from "../assets/icons/mission.svg";
import { aboutContent, team } from "../constants/about";
import Footer from "../Components/Footer";
import Donate from "../Components/Donate";

// TODO:
const About = () => {
  return (
    <>
      <Box
        sx={{
          background: `url(${about})`,
          height: "60vh",
          overflow: "hidden",
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
        }}
      >
        <Container maxWidth="lg">
          <Box position="absolute" width="334px" mt={13.8}>
            <Typography fontSize="2.25rem" color="white" fontWeight="bold">
              Helping hundreds connect together.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box paddingTop={13.5} paddingBottom={13.5}>
          <Typography
            variant="h5"
            color="initial"
            fontWeight="bold"
            mb={4}
            textAlign="center"
          >
            About SaveAStray
          </Typography>
          <Stack direction="column" spacing={4.5} textAlign="justify">
            <Typography fontWeight="bold">
              More Than Coding, We're Pawsitive Changemakers
            </Typography>
            <Typography fontWeight="bold">
              We're not just student coders, we're a band of passionate hearts
              united by a furry mission: to be the bridge between the yearning
              gazes of abandoned paws and the welcoming arms of loving homes. We
              dream of a world where adoption is seamless, joyful, and
              accessible to all.
            </Typography>
            <Typography>
              Imagine - no more endless shelter visits, no more uncertainty,
              just a vibrant platform teeming with wagging tails and soulful
              eyes waiting to be discovered. That's what we're building - a
              one-stop shop for adoption journeys, powered by the magic of
              technology and fueled by our unwavering love for animals.
            </Typography>
            <Typography>
              Hundreds of furry souls, each with a unique story and a heart full
              of hope, wait patiently for their second chance. We believe
              adoption is not just about giving a dog a home, it's about finding
              the perfect missing piece for both human and animal. Through our
              platform, we facilitate meaningful connections, ensuring every
              match is a love story waiting to be written.
            </Typography>
            <Typography>
              We're not just building a platform, we're building a community. A
              community of paw-rents who understand the unconditional love and
              unwavering loyalty a dog brings. A community of volunteers who
              dedicate their time and energy to animal welfare. A community of
              passionate coders like us, weaving lines of code into threads of
              hope and second chances.
            </Typography>
            <Typography>
              Join us on this incredible journey. Adopt, volunteer, donate, or
              simply spread the word. Together, let's rewrite the narrative for
              abandoned paws, one loving connection at a time. Remember, every
              life deserves a chance to find its forever home, and together, we
              can make that dream a reality.
            </Typography>
          </Stack>
        </Box>
      </Container>
      <Stack>
        <Grid container width="100%">
          <ThirdSection contents={aboutContent} />
        </Grid>
      </Stack>
      <MeetTheTeam />
      <Donate />
      <Footer />
    </>
  );
};

export default About;

function ThirdSection({ contents }) {
  return (
    <>
      {contents.map((content, index) => (
        <Grid container key={index} spacing={0}>
          {index % 2 !== 0 ? (
            <>
              <OddIndexContent content={content} />
            </>
          ) : (
            <>
              <EvenIndexContent content={content} />
            </>
          )}
        </Grid>
      ))}
    </>
  );
}

function OddIndexContent({ content }) {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: {
            sm: "block",
            md: "block",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "80%",
              marginRight: "40px",
            }}
          >
            <Typography fontSize={26} fontWeight="bold" mb={3}>
              {content.title}
            </Typography>
            <Stack direction="column" spacing={3}>
              <Typography>{content.p1}</Typography>
              <Typography>{content.p2}</Typography>
              <Typography>{content.p3}</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              position: "absolute",
              background: `url(${content.icon})`,
              width: "30%", // Adjusted width to fit the remaining space
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              left: 0, // Icon on the left side
            }}
          ></Box>
        </Box>
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
          position="relative"
          sx={{
            backgroundColor: "rgb(238, 114, 0)",
            width: "100%",
            height: "422px",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${pawBG})`,
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
          >
            <Typography
              fontSize={168}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              {content.section}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

function EvenIndexContent({ content }) {
  return (
    <>
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
          position="relative"
          sx={{
            backgroundColor: "rgb(238, 114, 0)",
            width: "100%",
            height: "422px",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${pawBG})`,
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize={168}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              {content.section}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: {
            sm: "block",
            md: "block",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "80%",
              marginLeft: "40px",
            }}
          >
            <Typography fontSize={26} fontWeight="bold" mb={3}>
              {content.title}
            </Typography>
            <Stack direction="column" spacing={3}>
              <Typography>{content.p1}</Typography>
              <Typography>{content.p2}</Typography>
              <Typography>{content.p3}</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              position: "absolute",
              background: `url(${content.icon})`,
              width: "30%", // Adjusted width to fit the remaining space
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              right: 0, // Icon on the right side
            }}
          ></Box>
        </Box>
      </Grid>
    </>
  );
}

function MeetTheTeam() {
  return (
    <Box sx={{ mt: "108px", mb: "108px" }}>
      <Container maxWidth="lg">
        <Box
          textAlign="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography fontWeight="bold" mb={3}>
            Meet The Team
          </Typography>
          <Typography mb={3} width="600px">
            We're not just CS students, we're animal advocates in code. We dream
            of a day when every stray has a home.
          </Typography>
        </Box>

        <Grid container rowSpacing={4} columnSpacing={3} alignItems="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ flexGrow: 1 }}>
              <Paper elevation={4} sx={{ height: "459px", p: 0 }}>
                <Box
                  sx={{
                    height: "375px",
                    width: "100%",
                    backgroundImage: `url(${member.media})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    margin: 0, // Remove any margin
                    padding: 0, // Remove any padding
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Box textAlign="center" p={2}>
                  <Typography fontWeight="bold" variant="h6" component="div">
                    {member.name}
                  </Typography>
                  <Typography>{member.position}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
