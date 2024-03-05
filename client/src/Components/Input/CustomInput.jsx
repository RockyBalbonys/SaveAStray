import styled from "@emotion/styled";
import { InputBase, Typography } from "@mui/material";

export const AnimalNameInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "5px",
    borderBottom: `2px solid transparent`,
    marginBottom: theme.spacing(2),
    transition: "border-bottom 0.3s ease",
    "&:hover": {
      borderBottom: `2px solid grey`,
    },
    "&:focus": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export const AnimalDescInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "5px",
    borderRadius: "7px",
    border: `2px solid transparent`,
    fontSize: "16px",
    fontWeight: 300,
    transition: "border 0.3s ease",
    "&:hover": {
      border: `2px solid grey`,
    },
    "&:focus": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export const AdoptionFeeInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderBottom: `2px solid transparent`,
    marginBottom: theme.spacing(2),
    transition: "border-bottom 0.3s ease",
    "&:hover": {
      borderBottom: `2px solid grey`,
    },
    "&:focus": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));
