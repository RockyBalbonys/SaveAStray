import React from "react";
import { Box, Container } from "@mui/material";
import PawBG from "../assets/images/Paw.png";

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        // backgroundImage: `url(${PawBG})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
      className="bg-gradient-to-bl from-amber-500 to-orange-600"
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
