import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  Button,
  Paper,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { myPolicy, myTerms } from "../constants/termsAndPolicy";

const TermsAndPrivacyModal = ({ open, onClose, formData }) => {
  const [isChecked, setIsChecked] = useState(false);

 
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinueClick = () => {
    // Redirect the user to another page if the checkbox is checked
    if (isChecked) {
      onClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      // Close the modal only if the backdrop is clicked directly
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={null}
      aria-labelledby="terms-and-privacy-modal-title"
      aria-describedby="terms-and-privacy-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        "& .MuiPaper-root": {
          width: "50%",
          maxHeight: "80vh", // Set the maximum height to 80% of the viewport height
          overflowY: "auto", // Enable vertical scrolling if the content exceeds the height
        },
      }}
      onClick={handleBackdropClick}
    >
      <Paper sx={{ width: "50%", bgcolor: "background.paper", px: 6, py: 4 }}>
        <Typography variant="h6" gutterBottom>
          Terms of Service and Privacy Policy
        </Typography>
        <Box>
          <Typography gutterBottom textAlign="center">
            Terms and Services
          </Typography>
          {myTerms.map((term, index) => (
            <>
              {typeof term === "string" ? (
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: term }}
                />
              ) : (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{term.item}</strong>
                  </p>
                  <ul className="list-disc pl-[1.8rem]">
                    {term.content.map((paragraph, idx) => (
                      <li key={idx}>
                        <p>{paragraph}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ))}
          <br />
          <Typography gutterBottom textAlign="center">
            Privacy Policy
          </Typography>
          {myPolicy.map((policy, index) => (
            <>
              {typeof policy === "string" ? (
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: policy }}
                />
              ) : (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{policy.item}</strong>
                  </p>
                  <ul className="list-disc pl-[1.8rem]">
                    {policy.content.map((paragraph, idx) => (
                      <li key={idx}>
                        <p>{paragraph}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ))}
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              color="primary"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the <span className="font-bold">Terms of Service</span>{" "}
              and <span className="font-bold">Privacy Policy</span>
            </Typography>
          }
          sx={{ marginBottom: "1rem" }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => onClose()}
            size="small"
            sx={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleContinueClick}
            disabled={!isChecked}
            size="small"
            sx={{ color: "white" }}
          >
            Continue
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default TermsAndPrivacyModal;
