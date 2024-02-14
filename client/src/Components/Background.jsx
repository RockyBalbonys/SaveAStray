import React from "react";
import { Box, Container } from "@mui/material";
import PawBG from "../assets/images/Paw.png";

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${PawBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {children}
    </Box>
  );
};

export default Background;
