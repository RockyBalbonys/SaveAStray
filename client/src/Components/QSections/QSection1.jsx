import {
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Input } from "@mui/material";
import { RadioSmall, paperStyle } from "../../Pages/Questionnaire";
import { useState } from "react";

const QSection1 = () => {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format">
        <p className="q-section-text">SECTION 1 : INTRODUCTION</p>
        <div className="input-container">
          <label htmlFor="email" className="font-bold lg:w-1/5">
            1. Enter your Email:
          </label>
          <Input id="email" type="email" fullWidth />
        </div>
        <div className="flex flex-col">
          <FormControl>
            <label htmlFor="best-describe" className="font-bold">
              2. Which of the following best describes why you're filling out
              this form?
            </label>
            <RadioOptions />
          </FormControl>
        </div>
      </div>
    </Paper>
  );
};

const RadioOptions = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <RadioGroup
      id="best-describe"
      sx={{
        color: "#FF8210",
        ".MuiFormControlLabel-label": {
          fontWeight: "300",
        },
      }}
      value={value}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.label}
          label={option.label}
          value={option.label}
          onChange={handleChange}
          control={<RadioSmall />}
        />
      ))}
    </RadioGroup>
  );
};

const options = [
  { label: "I want to adopt a dog" },
  { label: "I want to adopt a cat" },
  {
    label:
      "I would like to adopt a pet, but I am unsure which type would be best suited for me",
  },
];

export default QSection1;
