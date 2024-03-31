import {
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Input,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CheckboxSmall, paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { format } from "date-fns";
import { memo } from "react";

const QSection3 = () => {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 3 : PERSONAL INFORMATION</p>
        <Introduction />
        <PersonalInfoForm />
        <ReachMethods />
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

const PersonalInfoForm = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();

  const { fullName, birthdate, phoneNum, fullAddress, fbProfLink, occupation } =
    answers.section3;

  const handleInputChange = (id, value) => {
    updateAnswer("section3", id, value);
  };

  return (
    <div className="input-container font-bold space-y-6 sm:flex-col">
      <InputField
        value={fullName}
        handleInputChange={handleInputChange}
        label="1. Full Name (First Name, M.I., Last Name):"
        id="fullName"
        width="sm:w-full"
      />
      <InputField
        value={birthdate}
        label="2. Birthdate:"
        id="birthdate"
        handleInputChange={handleInputChange}
      />
      <InputField
        value={phoneNum}
        handleInputChange={handleInputChange}
        label="3. Phone Number:"
        id="phoneNum"
      />
      <InputField
        value={fullAddress}
        handleInputChange={handleInputChange}
        label="4. Full Address:"
        id="fullAddress"
      />
      <InputField
        value={fbProfLink}
        handleInputChange={handleInputChange}
        label="5. Facebook Profile Link:"
        id="fbProfLink"
      />
      <InputField
        value={occupation}
        handleInputChange={handleInputChange}
        label="6. Occupation or Income (Type N/A if unemployed):"
        id="occupation"
      />
    </div>
  );
};

const InputField = ({ label, id, width, value, handleInputChange }) => {
  const handleDateChange = (date) => {
    const dateString = format(date, "MM/dd/yyyy");
    handleInputChange(id, dateString);
  };
  return (
    <div className={`input-container sm:items-center ${width}`}>
      <label htmlFor={id} className="sm:w-1/2 md:w-1/2 lg:w-1/2">
        {label}
      </label>
      {id === "birthdate" ? (
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
    </div>
  );
};

const ReachMethods = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
  const { shelterReach } = answers.section3;

  const handleChangeShelterReach = (e) => {
    const { id, checked } = e.target;
    const updatedShelterReach = { ...shelterReach, [id]: checked };
    updateAnswer("section3", "shelterReach", updatedShelterReach);
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
            control={
              <CheckboxSmall
                checked={shelterReach.telegram || false}
                onChange={handleChangeShelterReach}
                id="telegram"
              />
            }
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default memo(QSection3);
