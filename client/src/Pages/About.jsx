import React, { useRef } from "react";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// icons image imports
import aboutHero from "../assets/images/aboutHero.png";
import pawBG from "../assets/images/Paw.png";

// data text imports
import { aboutContent, team, sectionContent } from "../constants/about";
import Donate from "../Components/PageComponent/Donate";
import Footer from "../Components/PageComponent/Footer";

// framer motion
import { motion } from "framer-motion";
import OddIndexContent from "../Components/OddIndexContent";

const About = () => {
  return (
    <>
      <HeroAbout />
      <SecondSection contents={sectionContent} />
      <ThirdSection contents={aboutContent} />
      <MeetTheTeam />
      <Donate />
      <Footer />
    </>
  );
};

export default About;

function HeroAbout() {
  return (
    <>
      <div className="relative bg-gradient-to-bl from-amber-500 to-orange-600 h-[65vh] w-full flex justify-end items-center">
        <div className="absolute left-0 z-10 w-full">
          <Container maxWidth="lg">
            <Typography variant="h2" className="text-white">
              Helping <br />
              <span className="text-[#2F4858]">hundreds</span> <br />
              <span className="text-[#2F4858]">connect</span> <br />
              together.
            </Typography>
          </Container>
        </div>
        <div
          style={{ backgroundImage: `url(${aboutHero})` }}
          className="absolute hidden md:block h-full bg-no-repeat bg-contain bg-right w-full"
        ></div>
      </div>
    </>
  );
}

function SecondSection({ contents }) {
  return (
    <Container maxWidth="lg" sx={{ color: "#2F4858" }}>
      <Box paddingBottom={13.5} paddingTop={13.5}>
        {contents.map((content, index) => (
          <Box key={index}>
            <Typography
              variant="h5"
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
      {contents.map((content, idx) => (
        <Grid container key={idx} spacing={0} sx={{ mb: { xs: 2, sm: 0 } }}>
          {idx % 2 !== 0 ? (
            <OddIndexContent content={content} />
          ) : (
            <EvenIndexContent content={content} />
          )}
        </Grid>
      ))}
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
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="bg-gradient-to-bl from-amber-500 to-orange-600"
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
            justifyContent: {
              sm: "center",
              md: "flex-start",
            },
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "80%",
              marginLeft: {
                sm: "0px",
                md: "40px",
              },
              color: "#2F4858",
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
              display: {
                sm: "none",
                md: "block",
              },
            }}
          ></Box>
        </Box>
      </Grid>
    </>
  );
}

function MeetTheTeam() {
  return (
    <>
      <div className="bg-[#FAFAFB]">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            color: "#2F4858",
            py: "108px",
          }}
        >
          <Typography fontWeight="bold" variant="h5" mb={3}>
            Meet The Team
          </Typography>
          <Typography mb={3} width="600px">
            We're not just CS students, we're animal advocates in code. We dream
            of a day when every stray has a home.
          </Typography>

          <Grid
            container
            rowGap={4}
            columnSpacing={3}
            sx={{ justifyContent: "center" }}
          >
            {team.map((member, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  minHeight: {
                    xs: "459px",
                    sm: "459px",
                  },
                  minWidth: {
                    xs: "326px",
                    sm: "326px",
                  },
                }}
                key={idx}
              >
                <Paper
                  sx={{
                    borderRadius: "7px",
                    boxShadow: "0px 0px 7px 1px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${member.media})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      height: "375px",
                      width: "100%",
                    }}
                  ></Box>
                  <Box sx={{ textAlign: "center", py: "16px" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                      {member.name}
                    </Typography>
                    <Typography>{member.position}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}
