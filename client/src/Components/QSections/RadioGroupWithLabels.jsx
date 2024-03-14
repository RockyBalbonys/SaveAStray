import { FormControlLabel, RadioGroup } from "@mui/material";
import { RadioSmall } from "../../Pages/Questionnaire";

export default function RadioGroupWithLabels({ id, options }) {
  return (
    <RadioGroup
      id={id}
      sx={{
        color: "#FF8210",
        ".MuiFormControlLabel-label": {
          fontWeight: "300",
        },
      }}
    >
      {options.map((option, idx) => (
        <FormControlLabel key={idx} label={option} control={<RadioSmall />} />
      ))}
    </RadioGroup>
  );
}
