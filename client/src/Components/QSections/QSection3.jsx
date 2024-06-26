import {
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CheckboxSmall, paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { format } from "date-fns";
import { memo, useEffect } from "react";

const QSection3 = ({ isAnswer }) => {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 3 : PERSONAL INFORMATION</p>
        <Introduction />
        <PersonalInfoForm isAnswer={isAnswer} />
        <ReachMethods isAnswer={isAnswer} />
      </div>
    </Paper>
  );
};

const Introduction = () => {
  return (
    <p>
      At SaveAStray, your privacy is our top priority. We keep all your personal
      information confidential and secure. It's used solely for processing your
      pet adoption application and never shared with third parties or for any
      other purpose. Trust us to safeguard your data while you find your furry
      soulmate!
    </p>
  );
};

const PersonalInfoForm = ({ isAnswer }) => {
  const { section3, updateSection3 } = useQuestionnaireContext();

  const { fullName, birthdate, phoneNum, fullAddress, fbProfLink, occupation } =
    section3;

  const handleInputChange = (id, value) => {
    updateSection3({ [id]: value });
  };

  useEffect(() => {
    console.table(section3);
  }, [section3]);

  return (
    <div className="input-container font-bold space-y-6 sm:flex-col">
      <InputField
        value={fullName}
        handleInputChange={handleInputChange}
        label="1. Full Name (First Name, M.I., Last Name):"
        id="fullName"
        width="sm:w-full"
        isAnswer={isAnswer}
      />
      <InputField
        value={birthdate}
        label="2. Birthdate:"
        id="birthdate"
        handleInputChange={handleInputChange}
        isAnswer={isAnswer}
      />
      <InputField
        value={phoneNum}
        handleInputChange={handleInputChange}
        label="3. Phone Number:"
        id="phoneNum"
        isAnswer={isAnswer}
      />
      <InputField
        value={fullAddress}
        handleInputChange={handleInputChange}
        label="4. Full Address:"
        id="fullAddress"
        isAnswer={isAnswer}
      />
      <InputField
        value={fbProfLink}
        handleInputChange={handleInputChange}
        label="5. Facebook Profile Link:"
        id="fbProfLink"
        isAnswer={isAnswer}
      />
      <InputField
        value={occupation}
        handleInputChange={handleInputChange}
        label="6. Occupation or Income (Type N/A if unemployed):"
        id="occupation"
        isAnswer={isAnswer}
      />
    </div>
  );
};

const InputField = ({
  label,
  id,
  width,
  value,
  handleInputChange,
  isAnswer,
}) => {
  const handleDateChange = (date) => {
    console.log(date);
    const dateString = format(date, "MM/dd/yyyy");
    console.log(dateString);
    handleInputChange(id, dateString);
  };
  return (
    <div className={`input-container sm:items-center ${width}`}>
      <label htmlFor={id} className="sm:w-1/2 md:w-1/2 lg:w-1/2">
        {label}
      </label>
      {isAnswer ? (
        <div className="lg:w-full border-b-2 border-gray-800 font-bold">
          <p>{value}</p>
        </div>
      ) : id === "birthdate" ? (
        <DatePicker
          value={value}
          fullWidth
          sx={{ width: "100%" }}
          onChange={handleDateChange}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => handleInputChange(id, e.target.value)}
          id={id}
          fullWidth
        />
      )}

      {!isAnswer && (
        <FormHelperText sx={{ color: "red" }}>Required*</FormHelperText>
      )}
    </div>
  );
};

const ReachMethods = ({ isAnswer }) => {
  const { section3, updateSection3 } = useQuestionnaireContext();
  const { shelterReach } = section3;

  const handleChangeShelterReach = (e) => {
    const { id, checked } = e.target;
    const updatedShelterReach = checked
      ? { ...shelterReach, [id]: true } // Update the specific reach method to true if checked
      : { ...shelterReach, [id]: false }; // Update the specific reach method to false if unchecked
    updateSection3({ shelterReach: updatedShelterReach });
  };

  return (
    <div className="input-container sm:justify-start mt-6">
      <FormControl>
        <label htmlFor="reach-methods" className="font-bold">
          7. How will the shelters reach you aside from this website?
        </label>
        <FormGroup
          id="reach-methods"
          sx={{
            color: "#FF8210",
            ".MuiFormControlLabel-label": {
              fontWeight: "300",
            },
          }}
        >
          <FormControlLabel
            label="Call and SMS"
            disabled={isAnswer}
            control={
              <CheckboxSmall
                checked={shelterReach.call || false}
                onChange={handleChangeShelterReach}
                id="call"
              />
            }
          />
          <FormControlLabel
            label="Email"
            disabled={isAnswer}
            control={
              <CheckboxSmall
                checked={shelterReach.email || false}
                onChange={handleChangeShelterReach}
                id="email"
              />
            }
          />
          <FormControlLabel
            label="Facebook Messenger"
            disabled={isAnswer}
            control={
              <CheckboxSmall
                checked={shelterReach.fbMessenger || false}
                onChange={handleChangeShelterReach}
                id="fbMessenger"
              />
            }
          />
          <FormControlLabel
            label="Telegram"
            disabled={isAnswer}
            control={
              <CheckboxSmall
                checked={shelterReach.telegram || false}
                onChange={handleChangeShelterReach}
                id="telegram"
              />
            }
          />
        </FormGroup>
        {!isAnswer && (
          <FormHelperText sx={{ color: "red", ml: "-.1rem" }}>
            Required*
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default memo(QSection3);
