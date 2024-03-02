import styled from "@emotion/styled";
import { FormControlLabel, useRadioGroup } from "@mui/material";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  fontSize: "16px",
  width: "152px",
  border: "1.2px solid transparent",
  fontWeight: "300",
  transition: "background-color border 1s ease",
  "&:hover": {
    background: "#FAFAFB",
    borderRadius: "40px",
    border: "1.2px solid rgba(238, 114, 0, 0.80)",
    paddingRight: "16px",
  },
  ...(checked && {
    // Conditional background style when checked
    background: "rgba(238, 114, 0, 0.15)",
    borderRadius: "40px",
    border: "1.2px solid transparent",
    paddingRight: "16px",
  }),
}));

export function MyFormControlLabel(props) {
  // MUI UseRadio Group
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}
