import { Paper, FormControl, FormHelperText } from "@mui/material";
import CheckboxGroupWithLabels from "./CheckboxGroupWithLabels";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import { paperStyle } from "../../Pages/Questionnaire";
import InputField from "./InputField";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { memo, useEffect } from "react";

const optionLabels = {
  livingAlone: "Living Alone",
  withChildrenOver18: "With Children Over 18",
  withChildrenOBelow18: "With Children Below 18",
  spouse: "Spouse",
  roomates: "Roomate(s)",
  parents: "Parents",
  relatives: "Relatives (Grandparents, Uncle, Aunties, Cousins)",
};

const validOptions = [
  "livingAlone",
  "withChildrenOver18",
  "withChildrenOBelow18",
  "spouse",
  "roomates",
  "parents",
  "relatives",
];

const QSection4 = () => {
  const { section4, updateSection4 } = useQuestionnaireContext();
  const {
    building,
    rent,
    confirmedPets,
    liveWith,
    householdMembers,
    isAllergic,
    isSupportive,
    moved,
  } = section4;

  const handleValueChange = (id, value) => {
    updateSection4({ [id]: value });
  };

  const handleChangeLiveWith = (option) => {
    const camelCaseOption = Object.keys(optionLabels).find(
      (key) => optionLabels[key] === option
    );

    if (validOptions.includes(camelCaseOption)) {
      updateSection4({
        liveWith: {
          ...liveWith,
          [camelCaseOption]: !liveWith[camelCaseOption], // Toggle the selected option
        },
      });
    } else {
      console.error(`Invalid option: ${option}`);
    }
  };

  useEffect(() => {
    console.table(section4);
  }, [section4]);

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
          handleCheckboxChange={handleChangeLiveWith}
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
        options={validOptions.map((option) => optionLabels[option])}
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

export default memo(QSection4);
