import { Box, Typography, Button } from "@mui/material";
import { filter } from "../constants/landingPage";
import donateImage from "../assets/images/image_donate.png";

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

const Donate = () => {
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
};

export default Donate;
