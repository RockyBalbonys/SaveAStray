import { Box, Typography, Button } from "@mui/material";
import { filter } from "../../constants/landingPage";
import donateImage from "../../assets/images/image_donate.png";
import { CustomButton } from "../Button/CustomButton";
import { Link } from "react-router-dom";

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
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          textAlign={"center"}
        >
          Help SaveAStray to end animal loneliness
        </Typography>
        <CustomButton
          variant="contained"
          size="large"
          component={Link}
          to="/Donate"
        >
          Donate Now
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Donate;
