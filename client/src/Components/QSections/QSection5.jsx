import { Paper } from "@mui/material";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import InputField from "./InputField";
import { paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { memo, useEffect } from "react";

const QSection5 = ({ isAnswer }) => {
  const { section5, updateSection5 } = useQuestionnaireContext();
  const {
    rescueName,
    isWillingToChoose,
    adoptedBefore,
    agePreference,
    energyLevel,
    isWillingToSpecialNeeds,
    responsibleForCaring,
    responsibleForFinance,
    emergency,
    listOfPets,
  } = section5;

  const handleValueChange = (id, value) => {
    updateSection5({ [id]: value });
  };

  useEffect(() => {
    console.table(section5);
  }, [section5]);

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format">
        <p className="q-section-text">
          SECTION 5 : ADOPTION AND PET CARE INFORMATION
        </p>
        <p>
          In an effort to help the process go smoothly, please be as detailed as
          possible with your responses to the questions below.
        </p>

        <InputField
          id={"rescueName"}
          value={rescueName}
          onChange={handleValueChange}
          label="1. Name of rescue you want to adopt"
          sublabel="Write 'N/A' if you don't have a specific rescue in mind"
          isAnswer={isAnswer}
        />
        <RadioGroupQuestion
          id={"isWillingToChoose"}
          value={isWillingToChoose}
          onChange={handleValueChange}
          label="2. If the rescue you indicated above is no longer available, are you open to choosing another rescue?"
          options={[
            "Yes, I will adopt another rescue",
            "No, I will just cancel my application",
          ]}
          isAnswer={isAnswer}
        />
        <RadioGroupQuestion
          id={"adoptedBefore"}
          value={adoptedBefore}
          onChange={handleValueChange}
          label="3. Have you adopted pets before?"
          options={["Yes", "No"]}
          isAnswer={isAnswer}
        />
        <RadioGroupQuestion
          id={"agePreference"}
          value={agePreference}
          onChange={handleValueChange}
          label="4. Age Preference:"
          options={["Kitten/Puppy", "Adolescent", "Adult", "Senior"]}
          isAnswer={isAnswer}
        />
        <RadioGroupQuestion
          id={"energyLevel"}
          value={energyLevel}
          onChange={handleValueChange}
          label="5. Energy Level:"
          options={["High", "Moderate", "Low"]}
          isAnswer={isAnswer}
        />
        <RadioGroupQuestion
          id={"isWillingToSpecialNeeds"}
          value={isWillingToSpecialNeeds}
          onChange={handleValueChange}
          label="6. Are you open to adopting pets with special needs?"
          options={["Yes", "No"]}
          isAnswer={isAnswer}
        />
        <InputField
          id={"responsibleForCaring"}
          value={responsibleForCaring}
          onChange={handleValueChange}
          label="7. Who will be responsible for feeding, grooming, and generally caring for your pet?"
          isAnswer={isAnswer}
        />
        <InputField
          id={"responsibleForFinance"}
          value={responsibleForFinance}
          onChange={handleValueChange}
          label="8. Who will be financially responsible for your pet’s needs (i.e. food, vet bills, etc.)?"
          isAnswer={isAnswer}
        />
        <InputField
          id={"emergency"}
          value={emergency}
          onChange={handleValueChange}
          label="9. Who will look after your pet if you go on vacation or in case of emergency?"
          isAnswer={isAnswer}
        />
        <InputField
          id={"listOfPets"}
          value={listOfPets}
          onChange={handleValueChange}
          label="10. List all pets you have had in the past 5 years."
          sublabel="Follow this format: Total Number and Breed (3 Aspin, 2 PusPin, 1 Corgi). Put N/A if none"
          isAnswer={isAnswer}
        />
      </div>
    </Paper>
  );
};

const RadioGroupQuestion = ({ id, label, options, onChange, isAnswer }) => {
  return (
    <div className="input-container w-full sm:flex-col sm:items-start">
      <label htmlFor={label} className="font-bold">
        {label}
      </label>
      <RadioGroupWithLabels
        id={id}
        options={options}
        onChange={onChange}
        isAnswer={isAnswer}
      />
    </div>
  );
};

export default memo(QSection5);
