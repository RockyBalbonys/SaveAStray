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
import facebook_icon from "../../assets/icons/facebook.png";
import email_icon from "../../assets/icons/email.png";
import telegram_icon from "../../assets/icons/telegram.png";
import {
  pages,
  contacts,
  legal,
  contacts2,
  pages2,
  legal2,
} from "../../constants/landingPage";
import logo from "../../assets/icons/SAS_Logo4.png";
import IconLinks from "../IconLinks";

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
          to={`${page.path}`}
          component={RouterLink}
          target={
            category === "Legal" || category === "Contacts"
              ? "_blank"
              : undefined
          }
        >
          {page.name}
        </Link>
      ))}
    </Stack>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: "21px 16px",
          sm: "32px 16px",
          md: "48px",
        },
        backgroundColor: "rgb(38, 58, 71)",
        color: "rgba(255, 161, 52, 1)",
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item md={12} lg={6}>
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
                <IconLinks icons={icons} />
              </Box>
            </Stack>
          </Grid>
          <Grid item md={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <LinksItem items={pages2} category="Websites" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <LinksItem items={legal2} category="Legal" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <LinksItem items={contacts2} category="Contacts" />
              </Grid>
            </Grid>
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
