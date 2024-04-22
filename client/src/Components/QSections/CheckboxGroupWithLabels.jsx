import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { CheckboxSmall } from "../../Pages/Questionnaire";

export default function CheckboxGroupWithLabels({
  id,
  options,
  onChange,
  value,
}) {
  return (
    <FormGroup
      id={id}
      sx={{
        color: "#FF8210",
        ".MuiFormControlLabel-label": {
          fontWeight: "300",
        },
      }}
    >
      {options.map((option, idx) => (
        <FormControlLabel
          key={idx}
          label={option}
          control={
            <CheckboxSmall
              checked={value[option]} // Use value[option] to determine the checked state
              onChange={() => onChange(option)}
            />
          }
        />
      ))}
      <FormHelperText sx={{ color: "red", ml: ".1rem" }}>
        Required*
      </FormHelperText>
    </FormGroup>
  );
}
