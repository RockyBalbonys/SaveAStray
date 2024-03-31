import {
  Paper,
  FormControlLabel,
  Radio,
  Input,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { paperStyle } from "../../Pages/Questionnaire";
import { DateTimePicker } from "@mui/x-date-pickers";
import InputField from "./InputField";
import styled from "@emotion/styled";
import { useQuestionnaireContext } from "../../hooks/useQuestionnaire";
import { format } from "date-fns";
import { useState, memo } from "react";

const QSection6 = () => {
  const { answers, updateAnswer } = useQuestionnaireContext();
  const { prompted, considerToAdopt, preferInterview, preferTime, validID } =
    answers.section6;

  const section = "section6";

  const handleValueChange = (id, value) => {
    updateAnswer(section, id, value);
  };

  // Image Validation
  const [validId, setValidId] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        // Check if the file size is within the limit (5MB)
        if (file.size <= 5 * 1024 * 1024) {
          // Convert the file to a data URL
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageBase64 = e.target.result;
            setValidId(e.target.result);
            setError(null);

            updateAnswer(section, "validID", imageBase64);
          };
          reader.readAsDataURL(file);
        } else {
          setError("File size exceeds the limit of 5MB.");
        }
      } else {
        setError("Please upload an image file.");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 6 : FINISHING DETAILS</p>
        <p>
          Hi there, you are one step closer to adopting your furry friend. Let's
          finish this with just a few more details. :)
        </p>
        <RadioGroupQuestion
          id={"prompted"}
          value={prompted}
          onChange={handleValueChange}
          label="1. What prompted you to adopt from our website - SaveAStray?"
          options={["Friends", "Family", "Internet", "Social Media", "Other"]}
        />
        <InputField
          id={"considerToAdopt"}
          value={considerToAdopt}
          onChange={handleValueChange}
          label="2. What made you consider adopting a rescue?"
        />
        <RadioGroupQuestion
          id={"preferInterview"}
          value={preferInterview}
          onChange={handleValueChange}
          label="3. Select your preferred interview platform"
          options={["Zoom", "Google Meet", "Facebook Messenger"]}
        />
        <DateTimePickerWithLabel
          id={"preferTime"}
          value={preferTime}
          handleValueChange={handleValueChange}
          label="4. Preferred Date and Time of 1-hour interview. Provide at least 3 options."
        />
        <div className="input-container sm:flex-col space-y-6">
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              {error}
            </Alert>
          </Snackbar>
          <label htmlFor={validID}>
            <span className="font-bold">5. Upload a copy of your valid ID</span>
            <br />
            Please upload a Government-issued ID or any Personal ID with your
            picture and name. Make sure the name you indicated in this
            application form matches the name on your ID. The maximum file size
            is 5mb only.
          </label>
          <Button
            id={validID}
            component="label"
            role={undefined}
            tabIndex={-1}
            sx={{ textTransform: "none", width: "163px", alignSelf: "center" }}
            variant="outlined"
            startIcon={<FileUploadIcon />}
          >
            Add File
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {validId && (
            <div className="mt-2  items-center w-full flex justify-center">
              <img
                src={validId}
                alt="Valid ID"
                className="max-w-96 max-h-96 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

const RadioGroupQuestion = ({ id, value, onChange, label, options }) => {
  return (
    <div className="input-container w-full sm:flex-col sm:items-start">
      <label htmlFor={label} className="font-bold">
        {label}
      </label>
      <RadioGroupWithLabels
        id={id}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

const DateTimePickerWithLabel = ({ id, value, handleValueChange, label }) => {
  const [dv1, setDv1] = useState("");
  const [dv2, setDv2] = useState("");
  const [dv3, setDv3] = useState("");

  const handleDateChange = (date) => {
    const dateString = format(date, "MM/dd/yyyy hh:mm aa");
    handleValueChange(id, dateString);
  };
  return (
    <div className="input-container sm:items-center sm:flex-col md:flex-col md:items-start">
      <label htmlFor={id} className="font-bold w-full mb-4">
        {label}
      </label>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <DateTimePicker
          value={dv1}
          onChange={handleDateChange}
          sx={{ width: "50%" }}
        />
        <DateTimePicker
          value={dv2}
          onChange={handleDateChange}
          sx={{ width: "50%" }}
        />
        <DateTimePicker
          value={dv3}
          onChange={handleDateChange}
          sx={{ width: "50%" }}
        />
      </div>
    </div>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default memo(QSection6);
