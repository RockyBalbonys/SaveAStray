import { Paper, FormControlLabel, Radio, Input, Button } from "@mui/material";
import RadioGroupWithLabels from "./RadioGroupWithLabels";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { paperStyle } from "../../Pages/Questionnaire";
import { DateTimePicker } from "@mui/x-date-pickers";
import InputField from "./InputField";
import styled from "@emotion/styled";

const QSection6 = () => {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 6 : FINISHING DETAILS</p>
        <p>
          Hi there, you are one step closer to adopting your furry friend. Let's
          finish this with just a few more details. :)
        </p>
        <RadioGroupQuestion
          label="1. What prompted you to adopt from our website - SaveAStray?"
          options={["Friends", "Family", "Internet", "Social Media", "Other"]}
        />
        <InputField label="2. What made you consider adopting a rescue?" />
        <RadioGroupQuestion
          label="3. Select your preferred interview platform"
          options={["Zoom", "Google Meet", "Facebook Messenger"]}
        />
        <DateTimePickerWithLabel label="4. Preferred Date and Time of 1-hour interview. Provide at least 3 options." />
        <div className="input-container">
          <label htmlFor="">
            <span className="font-bold">6. Upload a copy of your valid ID</span>
            <br />
            Please upload a Government-issued ID or any Personal ID with your
            picture and name. Make sure the name you indicated in this
            application form matches the name on your ID. The maximum file size
            is 5mb only.
          </label>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            sx={{ textTransform: "none", width: "163px", alignSelf: "center" }}
            variant="outlined"
            startIcon={<FileUploadIcon />}
          >
            Add File
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
      </div>
    </Paper>
  );
};

const RadioGroupQuestion = ({ label, options }) => {
  return (
    <div className="input-container">
      <label htmlFor={label} className="font-bold">
        {label}
      </label>
      <RadioGroupWithLabels id={label} options={options} />
    </div>
  );
};

const DateTimePickerWithLabel = ({ label }) => {
  return (
    <div className="input-container">
      <label htmlFor="" className="font-bold">
        {label}
      </label>
      <DateTimePicker fullWidth />
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

export default QSection6;
