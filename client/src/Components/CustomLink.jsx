import React from "react";
import Link from "@mui/material/Link";
import { styled } from "@mui/system";

// Define a styled component for the Link with custom CSS
const CustomLink = styled(Link)(({ theme }) => ({
  textDecoration: "none", // Remove default underline
  position: "relative", // Position relative for pseudo-elements
  color: theme.palette.secondary.main, // Default color
  transition: "color 0.3s ease-out", // Smooth transition for color change
  fontFamily: "Poppins",

  "&.active": {
    color: theme.palette.primary.main,
  },

  // Pseudo-element for the underline
  "&:before": {
    content: '""',
    position: "absolute",
    width: "0%", // Start with no width
    height: 2, // Adjust the thickness of the underline
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.secondary.main, // Default color of the underline
    visibility: "hidden", // Hide the underline by default
    transition: "all 0.3s ease-in", // Smooth transition for animation
    transformOrigin: "left", // Start the expansion from the left side
  },

  // Show the underline on hover
  "&:hover": {
    color: theme.palette.secondary.main, // Change text color on hover
    "&:before": {
      visibility: "visible", // Show the underline on hover
      width: "100%", // Expand the width to 100%
    },
  },
}));

export default CustomLink;
