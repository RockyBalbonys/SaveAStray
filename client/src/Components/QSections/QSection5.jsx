import { Paper } from "@mui/material";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import InputField from "./InputField";
import { paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";

const QSection5 = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
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
  } = answers.section5;

  const section = "section5";

  const handleValueChange = (id, value) => {
    updateAnswer(section, id, value);
  };

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
        />
        <RadioGroupQuestion
          id={"adoptedBefore"}
          value={adoptedBefore}
          onChange={handleValueChange}
          label="3. Have you adopted pets before?"
          options={["Yes", "No"]}
        />
        <RadioGroupQuestion
          id={"agePreference"}
          value={agePreference}
          onChange={handleValueChange}
          label="4. Age Preference:"
          options={["Kitten/Puppy", "Adolescent", "Adult", "Senior"]}
        />
        <RadioGroupQuestion
          id={"energyLevel"}
          value={energyLevel}
          onChange={handleValueChange}
          label="5. Energy Level:"
          options={["High", "Moderate", "Low"]}
        />
        <RadioGroupQuestion
          id={"isWillingToSpecialNeeds"}
          value={isWillingToSpecialNeeds}
          onChange={handleValueChange}
          label="6. Are you open to adopting pets with special needs?"
          options={["Yes", "No"]}
        />
        <InputField
          id={"responsibleForCaring"}
          value={responsibleForCaring}
          onChange={handleValueChange}
          label="7. Who will be responsible for feeding, grooming, and generally caring for your pet?"
        />
        <InputField
          id={"responsibleForFinance"}
          value={responsibleForFinance}
          onChange={handleValueChange}
          label="8. Who will be financially responsible for your pet’s needs (i.e. food, vet bills, etc.)?"
        />
        <InputField
          id={"emergency"}
          value={emergency}
          onChange={handleValueChange}
          label="9. Who will look after your pet if you go on vacation or in case of emergency?"
        />
        <InputField
          id={"listOfPets"}
          value={listOfPets}
          onChange={handleValueChange}
          label="10. List all pets you have had in the past 5 years."
          sublabel="Follow this format: Total Number and Breed (3 Aspin, 2 PusPin, 1 Corgi). Put N/A if none"
        />
      </div>
    </Paper>
  );
};

const RadioGroupQuestion = ({ label, options }) => {
  return (
    <div className="input-container w-full sm:flex-col sm:items-start">
      <label htmlFor={label} className="font-bold">
        {label}
      </label>
      <RadioGroupWithLabels id={label} options={options} />
    </div>
  );
};

export default QSection5;
