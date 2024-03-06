import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import Textarea from "../Components/Textarea";
import { contactDetails } from "../constants/contact";
import dogImage from "../assets/images/dogContact.png";
import Donate from "../Components/PageComponent/Donate";
import Footer from "../Components/PageComponent/Footer";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

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
              width: "35%",
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
        <Grid item key={index} xs={12} sm={6}>
          <Stack direction="row" spacing={2.5}>
            <img src={item.icon} alt="" width="30px" height="30px" />
            <Box>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography>{item.link}</Typography>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

//TODO: Fetch email body from text area
function Message() {
  const [messageContent, setMessageContent] = useState("");

  const handleTextareaChange = (event) => {
    setMessageContent(event.target.value);
  };

  const sendEmail = () => {
    // Construct the mailto link with the subject and body
    const subject = "User Feedback";
    const emailBody = encodeURIComponent(messageContent);
    const mailtoLink = `mailto:saveastray@gmail.com?subject=${subject}&body=${emailBody}`;
    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
  };
  return (
    <Box display="flex" flexDirection="column">
      <Typography fontWeight="bold" mb={2}>
        Your Message:
      </Typography>
      <Textarea value={messageContent} onChange={handleTextareaChange} />
      <Button
        variant="contained"
        sx={{ color: "white", mt: "4px" }}
        component={RouterLink}
        to="mailto:saveastray@gmail.com"
        onClick={sendEmail}
      >
        Send email
      </Button>
    </Box>
  );
}
