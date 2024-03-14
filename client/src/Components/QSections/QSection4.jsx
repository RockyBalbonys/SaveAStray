import { Paper, FormControl, FormGroup, FormControlLabel } from "@mui/material";
import CheckboxGroupWithLabels from "./CheckboxGroupWithLabels";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import { paperStyle } from "../../Pages/Questionnaire";
import InputField from "./InputField";

const QSection4 = () => {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 4 : HOUSEHOLD INFORMATION</p>
        <p>
          In an effort to help the process go smoothly, please be as detailed as
          possible with your responses to the questions below.
        </p>
        <BuildingTypeQuestion />
        <RentQuestion />
        <PetsAllowedQuestion />
        <LiveWithQuestion />
        <HouseholdMembersQuestion />
        <PetsAllergicQuestion />
        <SupportiveQuestion />
        <InputField label="8. What will happen to your pets if or when you moved?" />
      </div>
    </Paper>
  );
};

const BuildingTypeQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="building-type" className="font-bold">
        1. What type of building do you live in?
      </label>
      <RadioGroupWithLabels
        id="building-type"
        options={["House", "Condo", "Apartment", "Other"]}
      />
    </FormControl>
  );
};

const RentQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="rent" className="font-bold">
        2. Do you rent?
      </label>
      <RadioGroupWithLabels id="rent" options={["Yes", "No"]} />
    </FormControl>
  );
};

//TODO: Define other questions similarly...
const PetsAllowedQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="pet-allowed" className="font-bold">
        3. If you are renting, have you confirmed that pets are allowed by the
        owner or the condo admin?
      </label>
      <RadioGroupWithLabels
        id="pet-allowed"
        options={["Yes", "No", "N/A (We are not renting)"]}
      />
    </FormControl>
  );
};

const LiveWithQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="household-member" className="font-bold">
        4. Who do you live with?
      </label>
      <CheckboxGroupWithLabels
        id="household-member"
        options={[
          "Living Alone",
          "With children over 18 years old",
          "With children below 18 years old",
          "Spouse",
          "Roomate(s)",
          "Parents",
          "Relatives (Grandparents, Uncle, Aunties, Cousins)",
        ]}
      />
    </FormControl>
  );
};

const HouseholdMembersQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="many-members" className="font-bold">
        5. How many household members? (Including you)
      </label>
      <RadioGroupWithLabels
        id="many-members"
        options={["1", "2", "3", "4", "5", "6", "7", "8", "9 and above"]}
      />
    </FormControl>
  );
};

const PetsAllergicQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="allergic-to-pet" className="font-bold">
        6. Are any members of your household allergic to animals?
      </label>
      <RadioGroupWithLabels id="allergic-to-pet" options={["Yes", "No"]} />
    </FormControl>
  );
};

const SupportiveQuestion = () => {
  return (
    <FormControl>
      <label htmlFor="supportive" className="font-bold">
        7. Are all the members of your household supportive of adopting?
      </label>
      <RadioGroupWithLabels id="supportive" options={["Yes", "No"]} />
    </FormControl>
  );
};

export default QSection4;
