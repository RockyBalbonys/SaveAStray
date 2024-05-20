import { FormControlLabel, FormHelperText, RadioGroup } from "@mui/material";
import { RadioSmall } from "../../Pages/Questionnaire";

export default function RadioGroupWithLabels({
  id,
  options,
  onChange,
  value,
  isAnswer,
}) {
  return (
    <RadioGroup
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
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
          value={option}
          key={idx}
          label={option}
          disabled={isAnswer}
          control={<RadioSmall />}
        />
      ))}
      {!isAnswer && (
        <FormHelperText sx={{ color: "red", ml: ".1rem" }}>
          Required*
        </FormHelperText>
      )}
    </RadioGroup>
  );
}
