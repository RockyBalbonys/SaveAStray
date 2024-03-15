import { FormControl, FormControlLabel, FormGroup } from "@mui/material";
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
              checked={value.includes(option)}
              onChange={() => onChange(option, id, value)}
            />
          }
        />
      ))}
    </FormGroup>
  );
}
