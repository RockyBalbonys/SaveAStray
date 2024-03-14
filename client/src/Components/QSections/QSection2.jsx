import { Paper, FormControl, FormControlLabel } from "@mui/material";
import {
  CheckboxSmall,
  RadioSmall,
  paperStyle,
} from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";

const QSection2 = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
  const { awareAdoptionFee } = answers.section2;

  console.log(answers);

  const handleRadioChange = (e) => {
    updateAnswer("section2", "awareAdoptionFee", !awareAdoptionFee);
  };

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 2 : ADOPTION FEE</p>
        <Introduction />
        <Awareness value={awareAdoptionFee} onChange={handleRadioChange} />
      </div>
    </Paper>
  );
};

const Introduction = () => {
  return (
    <p>
      To ensure the well-being of rescued animals, and maintain shelter's
      environment, rescue shelters ask for an adoption fee. This fee helps cover
      the costs of care, treatment, and upkeep, including everything from food
      and medical bills to shelter maintenance. But it's more than just funding;
      it serves as a symbol of commitment. We want to know our beloved animals
      find forever homes with individuals truly prepared to provide the love and
      care they deserve.
    </p>
  );
};

const Awareness = ({ value, onChange }) => {
  return (
    <>
      <p className="font-bold">
        I am aware that there's an ADOPTION FEE and fully agree to pay it (if
        only Adoption Process continues)
      </p>
      <FormControl>
        <FormControlLabel
          checked={value}
          onChange={onChange}
          sx={{ color: "#FF8210" }}
          label="Yes, I am fully aware about adoption fee and willing to pay it."
          control={<CheckboxSmall />}
        />
      </FormControl>
    </>
  );
};

export default QSection2;
