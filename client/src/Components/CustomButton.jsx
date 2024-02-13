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

const CustomButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    textTransform: "none",
    boxShadow: "4px 4px 5.800000190734863px rgba(169.79, 221.75, 255, 0.70)",
    borderRadius: "48px",
  },
  "&.MuiButton-contained": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: "none",
    },
  },
  "&.MuiButton-outlined": {
    backgroundColor: "transparent",
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.white,
      boxShadow: "4px 4px 5.800000190734863px rgba(169.79, 221.75, 255, 0.70)",
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

export { MyPrimaryButton, MySecondaryButton, CustomButton };
