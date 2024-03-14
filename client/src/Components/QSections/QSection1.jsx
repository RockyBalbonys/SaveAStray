import {
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Input } from "@mui/material";
import { RadioSmall, paperStyle } from "../../Pages/Questionnaire";
import { useState } from "react";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";

const QSection1 = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
  const { email, bestDescribe } = answers.section1;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    updateAnswer("section1", "email", emailValue);
  };

  const handleRadioChange = (e) => {
    const radioValue = e.target.value;
    updateAnswer("section1", "bestDescribe", radioValue);
  };

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format">
        <p className="q-section-text">SECTION 1 : INTRODUCTION</p>
        <div className="input-container">
          <label htmlFor="email" className="font-bold lg:w-1/5">
            1. Enter your Email:
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </div>
        <div className="flex flex-col">
          <FormControl>
            <label htmlFor="best-describe" className="font-bold">
              2. Which of the following best describes why you're filling out
              this form?
            </label>
            <RadioOptions value={bestDescribe} onChange={handleRadioChange} />
          </FormControl>
        </div>
      </div>
    </Paper>
  );
};

const RadioOptions = ({ value, onChange }) => {
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
      onChange={onChange}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.label}
          label={option.label}
          value={option.label}
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
