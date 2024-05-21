import {
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { Input } from "@mui/material";
import {
  RadioSmall,
  RadioSmallReadOnly,
  paperStyle,
} from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { useParams } from "react-router-dom";
import { useEffect, memo } from "react";
import useAuth from "../../hooks/useAuth";

const QSection1 = ({ isAnswer }) => {
  const { section1, updateSection1 } = useQuestionnaireContext();
  const { email, bestDescribe } = section1;
  const { role } = useAuth();

  useEffect(() => {
    console.table(section1);
  }, [section1]);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    updateSection1({ email: emailValue });
  };

  const handleRadioChange = (e) => {
    const radioValue = e.target.value;
    updateSection1({ bestDescribe: radioValue });
  };

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format">
        <p className="q-section-text">SECTION 1 : INTRODUCTION</p>
        <div className="input-container mb-6 ">
          <label htmlFor="email" className="font-bold sm:w-1/2 lg:w-1/5">
            1. Enter your Email:
          </label>
          {isAnswer ? (
            <div className="lg:w-full border-b-[1px] border-gray-800 font-bold">
              <p>{email}</p>
            </div>
          ) : (
            <div className="flex w-full flex-col">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
              />
              <FormHelperText sx={{ color: "red" }}>Required*</FormHelperText>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <FormControl>
            <label htmlFor="best-describe" className="font-bold">
              2. Which of the following best describes why you're filling out
              this form?
            </label>
            <RadioOptions
              value={bestDescribe}
              onChange={handleRadioChange}
              isAnswer={isAnswer}
            />
            {!isAnswer && (
              <FormHelperText sx={{ color: "red", ml: "-.1rem" }}>
                Required*
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
    </Paper>
  );
};

const RadioOptions = ({ value, onChange, isAnswer }) => {
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
          disabled={isAnswer}
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
