import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Define custom styles for each button type
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  padding: 0,
  boxShadow: "4px 4px 5.800000190734863px rgba(169.79, 221.75, 255, 0.70)",
  borderRadius: "48px",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.dark,
  },
  textTransform: "none",
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFA500",
  color: "#FFFFFF",
  borderRadius: "8px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#FF7F00",
  },
}));

const VerifyButton = styled(Button)(({ theme, icon }) => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "7px",
  color: theme.palette.primary,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.primary.main}`,
  transition: "background-color 0.3s, color 0.5s", // Add transition property
  "& svg": {
    // Apply hover styles to the svg element inside the button
    fill: "white", // Assuming the color you want to change is fill
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "& svg": {
      // Apply hover styles to the svg element inside the button
      fill: "white", // Assuming the color you want to change is fill
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    textTransform: "none",
    borderRadius: "48px",
  },
  "&.MuiButton-contained": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: "4px 4px 5.800000190734863px rgba(169.79, 221.75, 255, 0.70)",
    },
  },
  "&.MuiButton-outlined": {
    backgroundColor: "transparent",
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    boxShadow: "4px 4px 5.800000190734863px rgba(169.79, 221.75, 255, 0.70)",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.white,
      boxShadow: "none",
    },
  },
  "&.MuiButton-text": {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: theme.palette.primary.main,
    padding: 0,
  },
}));

// Create individual components for each button type
const MyPrimaryButton = ({ children, ...props }) => {
  return <PrimaryButton {...props}>{children}</PrimaryButton>;
};

const MySecondaryButton = ({ children, ...props }) => {
  return <SecondaryButton {...props}>{children}</SecondaryButton>;
};

export { MyPrimaryButton, MySecondaryButton, CustomButton, VerifyButton };
