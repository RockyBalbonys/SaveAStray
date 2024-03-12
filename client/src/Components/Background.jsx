import React from "react";
import { Box } from "@mui/material";

const Background = ({ children }) => {
  return (
    <div
      // sx={{
      //   position: "relative",
      //   height: "100vh",
      //   justifyContent: `${justify}`,
      //   display: `${display}`,
      //   alignItems: `${align}`,
      // }}
      className="bg-gradient-to-bl from-amber-500 to-orange-600 flex justify-center items-center relative h-screen"
    >
      <Box
        sx={{
          position: "absolute",
          // width: "100%",
          // height: "100%",
        }}
      />
      {children}
    </div>
  );
};

export default Background;
