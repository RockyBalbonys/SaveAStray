import { Box, Container, Typography, Grid, Button } from "@mui/material";
import HeroImage from "../assets/images/donate/hero_donate.png";
import { carouselItems } from "../constants/donate";
import CustomCarousel from "../Components/CustomCarousel";
import Footer from "../Components/PageComponent/Footer";
import GCashImage from "../assets/images/donate/donate_gcash.png";
import gcashIcon from "../assets/icons/gcash.svg";
import paypalIcon from "../assets/icons/paypal.svg";
import atmIcons from "../assets/images/donate/atmIcons.png";
import { Link } from "react-router-dom";
import donateHero from '../assets/images/donateHero.png'
const Donate = () => {
  return (
    <>
            <div className="relative bg-gradient-to-bl from-amber-500 to-orange-600 h-[65vh] w-full flex justify-end items-center">
        <div className="absolute left-0 z-10 w-full">
          <Container maxWidth="lg">
            <Typography variant="h2" className="text-white">
              Make A <span className="text-[#2F4858]">Big <br />Difference</span> <br />
              Today!
            </Typography>
          </Container>
        </div>
        <div
          style={{
            backgroundImage: `url(${donateHero})`,
          }}
          className="absolute hidden md:block h-full bg-no-repeat bg-contain w-full bg-right"
        ></div>
      </div> 
      <Container maxWidth="lg">
        <CarouselSection />
        <DonateChannelsSection />
      </Container>
      <Footer />
    </>
  );
};

export default Donate;

function CarouselSection() {
  return (
    <Box sx={{ paddingTop: "64px", paddingBottom: "108px" }}>
      <Box display="flex" flexDirection="column" rowGap={2} mb={4}>
        <Typography variant="body1Bold">
          Hi there! We're the SaveAStray Project, a web-based initiative created
          by a group of passionate 3rd year college students. We rely heavily on
          the kindness of people like you to help us achieve our mission.
        </Typography>
        <Typography variant="body2">
          Every donation, no matter the size, helps provide warm beds, delicious
          meals, and loving care for abandoned animals. Give them a chance at
          happiness - donate today!
        </Typography>
      </Box>
      <CustomCarousel itemList={carouselItems} />
    </Box>
  );
}

function DonateChannelsSection() {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      rowGap="32px"
      paddingBottom="108px"
    >
      <Typography variant="h6" component="p">
        Check Our Donation Channels
      </Typography>
      <Typography variant="body2" component="p">
        Your donation fuels our mission! Empower us to connect more loving
        families with their furry companions.
      </Typography>
      <Grid container justifyContent="center" spacing={10}>
        <Grid item>
          <Box>
            <img
              src={GCashImage}
              alt="Gcash Donate"
              width="290px"
              height="381px"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            width="290px"
            height="381px"
          >
            <div className="bg-[#ee7200] text-white flex items-center py-4 justify-center box-border rounded-lg px-[76px]">
              <img
                src={gcashIcon}
                alt="gcash icon"
                height="44px"
                width="44px"
                className="mr-2"
              />
              <Typography>GCash</Typography>
            </div>
            <Box
              sx={{ flexGrow: 1 }}
              className="flex flex-col justify-start h-full"
            >
              <Typography
                variant="body1"
                component="p"
                className="font-semibold"
                gutterBottom
                mt={4}
              >
                Jhude V.
              </Typography>
              <Typography variant="body2" component="p">
                0968 710 1340
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className="font-semibold"
                gutterBottom
                mt={4}
              >
                Prince Lawrence J.
              </Typography>
              <Typography variant="body2" component="p">
                0970 094 2779
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box width="290px" height="381px">
            <div className="bg-[#ee7200] text-white flex items-center py-4 justify-center box-border rounded-lg px-[76px]">
              <img
                src={paypalIcon}
                alt="gcash icon"
                height="39px"
                width="39px"
              />
              <Typography>Paypal</Typography>
            </div>
            <Box>
              <Box
                sx={{ flexGrow: 1 }}
                className="flex flex-col justify-start h-full space-y-8"
              >
                <img src={atmIcons} alt="atm icons" className="mt-8" />

                <Button
                  variant="contained"
                  component={Link}
                  target="_blank"
                  to="https://www.sandbox.paypal.com/donate/?hosted_button_id=N75WBMATV34RJ"
                  sx={{
                    bgcolor: "rgba(255, 184, 0, 1)",
                    width: "100%",
                    color: "rgba(47, 72, 88, 1)",
                    borderRadius: "40px",
                    "&:hover": {
                      bgcolor: "rgba(233, 167, 0, 1)",
                    },
                  }}
                >
                  Donate
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
