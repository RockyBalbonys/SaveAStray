import React, { useState } from "react";
import "/src/index.css";

// Mui Components
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import FormControlLabel from "@mui/material/FormControlLabel";

// constants static data
import { myPolicy, myTerms } from "../constants/termsAndPolicy";

// react functions
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";

const TermsAndPrivacyModal = ({
  open,
  onClose,
  formData,
  setUserExists,
  googleResponse,
  isGoogle,
}) => {
  const navigate = useNavigate();

  // state for checkbox
  const [isChecked, setIsChecked] = useState(false);

  // state for snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
              axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/googleSignup`, {
                  data,
                })
                .then(function (res) {
                  console.log(res);
                })
                .catch(function (err) {
                  console.log(err);
                });
              onClose();
              navigate("/deadend");
              console.log("Noooooooooo!");
            } else if (res.data.status == 409) {
              console.log(res.data);
              setOpenSnackbar(true);
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
            console.log("Open snackbar: " + openSnackbar);
            setOpenSnackbar(true);
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
          width: {
            xs: "90%",
            sm: "80%",
            md: "50%",
          },
          maxHeight: "80vh", // Set the maximum height to 80% of the viewport height
          overflowY: "auto", // Enable vertical scrolling if the content exceeds the height
        },
      }}
      onClick={handleBackdropClick}
    >
      <Paper
        className="custom-scrollbar "
        sx={{
          width: "50%",
          bgcolor: "background.paper",
          px: {
            xs: "18px",
            sm: "22px",
            md: "32px",
          },
          py: {
            xs: "18px",
            sm: "22px",
            md: "32px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Terms of Service and Privacy Policy
        </Typography>

        <Box>
          {/* Terms of Services */}
          <div class="inline-flex items-center justify-center w-full my-3">
            <hr class="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <Typography
              className="px-3"
              variant="h6"
              gutterBottom
              textAlign="center"
              color="secondary.main"
              mt={1}
              fontWeight={600}
            >
              Terms of Services
            </Typography>
            <hr class="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          {myTerms.map((term, index) => (
            <React.Fragment key={index}>
              {typeof term === "string" ? (
                <p
                  className="mb-4 text-[#2F4858]"
                  dangerouslySetInnerHTML={{ __html: term }}
                />
              ) : (
                <div className="mb-2">
                  <p>
                    <strong className="text-orange-400">{term.item}</strong>
                  </p>
                  <ul className="list-disc pl-[1.8rem] font-normal text-[#2F4858]">
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

          {/* Privacy Policy */}
          <div class="inline-flex items-center justify-center w-full my-3">
            <hr class="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <Typography
              className="px-3"
              variant="h6"
              gutterBottom
              textAlign="center"
              color="secondary.main"
              mt={1}
              fontWeight={600}
            >
              Privacy Policy
            </Typography>
            <hr class="w-40 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          {myPolicy.map((policy, index) => (
            <React.Fragment key={index}>
              {typeof policy === "string" ? (
                <p
                  className="mb-4 text-[#2F4858]"
                  dangerouslySetInnerHTML={{ __html: policy }}
                />
              ) : (
                <div className="mb-2">
                  <p>
                    <strong className="text-orange-400">{policy.item}</strong>
                  </p>
                  <ul className="list-disc pl-[1.8rem] text-[#2F4858]">
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
            <Typography fontWeight={300} color="primary.main">
              I agree to the <span className="font-bold">Terms of Service</span>{" "}
              and <span className="font-bold">Privacy Policy</span>
            </Typography>
          }
          sx={{ marginBottom: "1rem" }}
        />
        <br />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => onClose()}
            size="medium"
            sx={{ color: "white", borderRadius: "7px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleContinueClick}
            disabled={!isChecked}
            size="medium"
            sx={{ color: "white", borderRadius: "7px" }}
          >
            Continue
          </Button>
        </Stack>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(!openSnackbar)}
          message="User already exists"
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        ></Snackbar>
      </Paper>
    </Modal>
  );
};

export default TermsAndPrivacyModal;
