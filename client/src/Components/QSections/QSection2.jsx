import {
  Paper,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { CheckboxSmall, paperStyle } from "../../Pages/Questionnaire";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { memo, useEffect } from "react";

const QSection2 = () => {
  const { section2, updateSection2 } = useQuestionnaireContext();
  const { awareAdoptionFee } = section2;

  const handleCheckboxChange = (e) => {
    const awareAdoptionFeeValue = e.target.checked;
    updateSection2({ awareAdoptionFee: !awareAdoptionFee });
  };

  useEffect(() => {
    console.table(section2);
  }, [section2]);

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 2 : ADOPTION FEE</p>
        <Introduction />
        <Awareness value={awareAdoptionFee} onChange={handleCheckboxChange} />
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
        <FormHelperText sx={{ color: "red", ml: "-.1rem" }}>
          Required*
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default memo(QSection2);
