import about from "../assets/images/about.png";
import pawBG from "../assets/images/Paw.png";
import { Box, Container, Typography, Stack, Grid, Paper } from "@mui/material";
import { aboutContent, team, sectionContent } from "../constants/about";
import Footer from "../Components/Footer";
import Donate from "../Components/Donate";

const About = () => {
  return (
    <>
      <Box
        sx={{
          background: `url(${about})`,
          height: "60vh",
          overflow: "visible",
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
        }}
        component="main"
      >
        <Container maxWidth="lg">
          <Box position="absolute" width="334px" mt={13.8}>
            <Typography fontSize="2.25rem" color="white" fontWeight="bold">
              Helping hundreds connect together.
            </Typography>
          </Box>
        </Container>
      </Box>
      <SecondSection contents={sectionContent} />
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

function SecondSection({ contents }) {
  return (
    <Container maxWidth="lg">
      <Box paddingTop={13.5} paddingBottom={13.5}>
        {contents.map((content, index) => (
          <Box key={index}>
            <Typography
              variant="h5"
              color="initial"
              fontWeight="bold"
              mb={4}
              textAlign="center"
            >
              {content.title}
            </Typography>
            <Stack direction="column" spacing={4.5} textAlign="justify">
              <Typography>{content.p1}</Typography>
              <Typography>{content.p2}</Typography>
              <Typography>{content.p3}</Typography>
              <Typography>{content.p4}</Typography>
              <Typography>{content.p5}</Typography>
              <Typography>{content.p6}</Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

function ThirdSection({ contents }) {
  return (
    <>
      {contents.map((content, index) => (
        <Grid
          container
          key={index}
          spacing={0}
          sx={{
            "& > *": {
              mb: { xs: 2, sm: 0 }, // Add margin bottom only on mobile devices
            },
          }}
        >
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
