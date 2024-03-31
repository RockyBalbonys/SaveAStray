import {
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { Input } from "@mui/material";
import { RadioSmall, paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { useParams } from "react-router-dom";
import { useEffect, memo } from "react";

const QSection1 = () => {
  const { answers, updateAnswer, handleShelterId } = useQuestionnaireContext();
  const { email, bestDescribe } = answers.section1;

  const { shelterId } = useParams();

  const { toShelter } = answers.toShelter;

  useEffect(() => {
    handleShelterId(toShelter, shelterId);
  }, [shelterId]);

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
        <div className="input-container mb-6 ">
          <label htmlFor="email" className="font-bold sm:w-1/2 lg:w-1/5">
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
      {options.map((option, idx) => (
        <FormControlLabel
          key={idx}
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

export default memo(QSection1);
