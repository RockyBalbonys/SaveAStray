import { Container, Paper, Typography, Box, Stack, Grid } from "@mui/material";
import Textarea from "../Components/Textarea";
import { contactDetails } from "../constants/contact";
import dogImage from "../assets/images/dogContact.png";
import Donate from "../Components/Donate";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <>
      <Paper
        sx={{
          height: "80vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "32px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              rowGap: "32px",
            }}
          >
            <Box>
              <Typography
                fontWeight="bold"
                variant="h5"
                component="div"
                gutterBottom
              >
                Share Your Thoughts!
              </Typography>
              <Typography>Connect with us with various platforms.</Typography>
            </Box>
            <SocialMediaContacts contacts={contactDetails} />
            <Message />
          </Box>
          <Box
            sx={{
              backgroundImage: `url(${dogImage})`,
              height: "584px",
              backgroundRepeat: "no-repeat",
              width: "327px",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          ></Box>
        </Container>
      </Paper>
      <Donate />
      <Footer />
    </>
  );
};

export default Contact;

function SocialMediaContacts({ contacts }) {
  return (
    <Grid
      container
      spacing={2.5}
      alignItems="center"
      paddingLeft="40px"
      paddingRight="40px"
    >
      {contacts.map((item, index) => (
        <Grid item key={index} xs={6}>
          <Stack direction="row" spacing={2.5}>
            <img src={item.icon} alt="" width="30px" height="30px" />
            <Box>
              <Typography fontWeight="bold">{item.name}Hello</Typography>
              <Typography>{item.link}</Typography>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

function Message() {
  return (
    <Box>
      <Typography fontWeight="bold" mb={2}>
        Your Message:
      </Typography>
      <Textarea />
    </Box>
  );
}
