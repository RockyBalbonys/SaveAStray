import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import facebook_icon from "../assets/icons/facebook.png";
import email_icon from "../assets/icons/email.png";
import telegram_icon from "../assets/icons/telegram.png";
import { pages, contacts, legal } from "../constants/landingPage";
import logo from "../assets/icons/SAS_Logo4.png";

const icons = [
  { icon: facebook_icon, alt: "facebook icon" },
  { icon: email_icon, alt: "email icon" },
  { icon: telegram_icon, alt: "telegram icon" },
];

// Display content links
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
          to={page}
          component={RouterLink}
        >
          {page}
        </Link>
      ))}
    </Stack>
  );
}

// Display icon links
function IconLinks() {
  return (
    <Stack direction="row" columnGap={3}>
      {icons.map((item, index) => (
        <IconButton key={index}>
          <img src={item.icon} alt={item.alt} width="26px" />
        </IconButton>
      ))}
    </Stack>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        padding: 6,
        backgroundColor: "rgb(38, 58, 71)",
        color: "rgba(255, 161, 52, 1)",
      }}
      component="footer"
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

                {/* Display Facebook, Telegram, Email Icons and Links */}
                <IconLinks />
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
};

export default Footer;
