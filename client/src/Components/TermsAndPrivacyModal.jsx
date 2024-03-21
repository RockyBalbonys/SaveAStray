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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TermsAndPrivacyModal = ({
  open,
  onClose,
  formData,
  setUserExists,
  googleResponse,
  isGoogle,
}) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  console.log(isGoogle);

  const handleContinueClick = async () => {
    // Redirect the user to another page if the checkbox is checked
    if (isChecked) {
      // google sign up
      if (isGoogle) {
        const response = googleResponse;
        const cred = response.credential;
        console.log("Encoded JWT ID token: " + response.credential);
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/googleAccVerify`, {
            cred,
          })
          .then(function (res) {
            const data = res.data;
            console.log(data);
            if (res.data.status == 200) {
                  axios.post(`${process.env.REACT_APP_SERVER_URL}/api/googleSignup`, {
                    data
                  })
                  .then(function(res){
                    console.log(res);
                  })
                  .catch(function(err){
                    console.log(err);
                  })
                onClose();
                navigate("/deadend");
              } else if (res.data.status == 409){
                console.log(res.data);
              }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        //local sign up
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/register`,
            {
              userID: "",
              email: formData.regEmail,
              pass: formData.regPass,
              role: formData.regRole,
              verified: false,
            }
          );
          if (response.data.status === 409) {
            setUserExists(true);
            onClose();
          } else {
            console.log("Response:", response.data);
            onClose();
            navigate("/deadend");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
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
        height: "100%",
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
            <React.Fragment key={index}>
              {typeof term === "string" ? (
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: term }}
                />
              ) : (
                <div className="mb-2">
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
            </React.Fragment>
          ))}
          <br />
          <Typography gutterBottom textAlign="center">
            Privacy Policy
          </Typography>
          {myPolicy.map((policy, index) => (
            <React.Fragment key={index}>
              {typeof policy === "string" ? (
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: policy }}
                />
              ) : (
                <div className="mb-2">
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
            </React.Fragment>
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
