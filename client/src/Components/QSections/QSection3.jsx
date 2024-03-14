import {
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Input,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CheckboxSmall, paperStyle } from "../../Pages/Questionnaire";

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
  return (
    <div className="input-container font-bold">
      <InputField
        label="1. Full Name (First Name, M.I., Last Name):"
        id="full-name"
        width="sm:w-1/2"
      />
      <InputField label="2. Birthdate:" id="birthdate" width="md:w-1/3" />
      <InputField label="3. Phone Number:" id="phone-num" />
      <InputField label="4. Full Address:" id="full-address" />
      <InputField label="5. Facebook Profile Link:" id="fb-profile-link" />
      <InputField
        label="6. Occupation or Income (Type N/A if unemployed):"
        id="occupation"
      />
    </div>
  );
};

const InputField = ({ label, id, width }) => {
  return (
    <div className={`input-container ${width}`}>
      <label htmlFor={id}>{label}</label>
      {id === "birthdate" ? (
        <DatePicker id={id} />
      ) : (
        <Input id={id} fullWidth />
      )}
    </div>
  );
};

const ReachMethods = () => {
  return (
    <div className="input-container lg:ml-6 lg:mt-0 mt-6">
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
          <FormControlLabel label="Call and SMS" control={<CheckboxSmall />} />
          <FormControlLabel label="Email" control={<CheckboxSmall />} />
          <FormControlLabel
            label="Facebook Messenger"
            control={<CheckboxSmall />}
          />
          <FormControlLabel label="Telegram" control={<CheckboxSmall />} />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default QSection3;
