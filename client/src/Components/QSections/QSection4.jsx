import { Paper, FormControl } from "@mui/material";
import CheckboxGroupWithLabels from "./CheckboxGroupWithLabels";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import { paperStyle } from "../../Pages/Questionnaire";
import InputField from "./InputField";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";

const QSection4 = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
  const {
    building,
    rent,
    confirmedPets,
    liveWith,
    householdMembers,
    isAllergic,
    isSupportive,
    moved,
  } = answers.section4;

  const section = "section4";

  const handleValueChange = (id, value) => {
    updateAnswer(section, id, value);
  };

  const handleCheckboxChange = (option, id, value) => {
    try {
      const updatedLiveWith = value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option];
      updateAnswer(section, id, updatedLiveWith);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 4 : HOUSEHOLD INFORMATION</p>
        <p>
          In an effort to help the process go smoothly, please be as detailed as
          possible with your responses to the questions below.
        </p>
        <BuildingTypeQuestion
          id={"building"}
          building={building}
          handleRadioChange={handleValueChange}
        />
        <RentQuestion id={"rent"} value={rent} onChange={handleValueChange} />
        <PetsAllowedQuestion
          id={"confirmedPets"}
          value={confirmedPets}
          onChange={handleValueChange}
        />

        <LiveWithQuestion
          id={"liveWith"}
          liveWith={liveWith}
          handleCheckboxChange={handleCheckboxChange}
        />

        <HouseholdMembersQuestion
          id={"householdMembers"}
          value={householdMembers}
          onChange={handleValueChange}
        />
        <PetsAllergicQuestion
          id={"isAllergic"}
          value={isAllergic}
          onChange={handleValueChange}
        />
        <SupportiveQuestion
          id={"isSupportive"}
          value={isSupportive}
          onChange={handleValueChange}
        />
        <InputField
          id={"moved"}
          value={moved}
          onChange={handleValueChange}
          label="8. What will happen to your pets if or when you moved?"
        />
      </div>
    </Paper>
  );
};

const BuildingTypeQuestion = ({ id, building, handleRadioChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        1. What type of building do you live in?
      </label>
      <RadioGroupWithLabels
        value={building}
        onChange={handleRadioChange}
        id={id}
        options={["House", "Condo", "Apartment", "Other"]}
      />
    </FormControl>
  );
};

const RentQuestion = ({ value, onChange }) => {
  return (
    <FormControl>
      <label htmlFor="rent" className="font-bold">
        2. Do you rent?
      </label>
      <RadioGroupWithLabels
        value={value}
        onChange={onChange}
        id="rent"
        options={["Yes", "No"]}
      />
    </FormControl>
  );
};

const PetsAllowedQuestion = ({ id, value, onChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        3. If you are renting, have you confirmed that pets are allowed by the
        owner or the condo admin?
      </label>
      <RadioGroupWithLabels
        value={value}
        onChange={onChange}
        id={id}
        options={["Yes", "No", "N/A (We are not renting)"]}
      />
    </FormControl>
  );
};

const LiveWithQuestion = ({ id, liveWith, handleCheckboxChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        4. Who do you live with?
      </label>
      <CheckboxGroupWithLabels
        value={liveWith}
        onChange={handleCheckboxChange}
        id={id}
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

const HouseholdMembersQuestion = ({ id, value, onChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        5. How many household members? (Including you)
      </label>
      <RadioGroupWithLabels
        value={value}
        onChange={onChange}
        id={id}
        options={["1", "2", "3", "4", "5", "6", "7", "8", "9 and above"]}
      />
    </FormControl>
  );
};

const PetsAllergicQuestion = ({ id, value, onChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        6. Are any members of your household allergic to animals?
      </label>
      <RadioGroupWithLabels
        value={value}
        onChange={onChange}
        id={id}
        options={["Yes", "No"]}
      />
    </FormControl>
  );
};

const SupportiveQuestion = ({ id, value, onChange }) => {
  return (
    <FormControl>
      <label htmlFor={id} className="font-bold">
        7. Are all the members of your household supportive of adopting?
      </label>
      <RadioGroupWithLabels
        value={value}
        onChange={onChange}
        id={id}
        options={["Yes", "No"]}
      />
    </FormControl>
  );
};

export default QSection4;
