import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.primary.main,
  padding: "77px",
  gap: "24px",
}));

export { StyledPaper };
