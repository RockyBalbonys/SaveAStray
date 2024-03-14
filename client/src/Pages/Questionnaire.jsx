import React, { useEffect, useState } from "react";
import top from "../assets/images/top.jpg";
import {
  Paper,
  Typography,
  Input,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormGroup,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import logo from "../assets/icons/SAS_Logo4.png";
import formIcon from "../assets/icons/formIcon.svg";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import styled from "@emotion/styled";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import useScroll from "../hooks/useScroll";

const paperStyle = {
  p: {
    xs: "12px 14px",
    sm: "18px 22px",
    md: "32px 40px",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

function RadioSmall(props) {
  return <Radio {...props} size="small" sx={{ color: "#EE7200" }} />;
}
function CheckboxSmall(props) {
  return <Checkbox {...props} size="small" sx={{ color: "#EE7200" }} />;
}

const Questionnaire = () => {
  const showButton = useScroll();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="background-questionnaire flex-col">
        <QHeader />
        <QWelcome />
        <QSection1 />
        <QSection2 />
        <QSection3 />
        <QSection4 />
        <QSection5 />
        <QSection6 />
        <Paper
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button sx={{ textTransform: "none" }}>
            Submit Questionnaire Form
          </Button>
        </Paper>
        {/* Button to go back to the top */}
        {showButton && (
          <Tooltip title="Back to top">
            <IconButton
              sx={{
                position: "fixed",
                backgroundColor: "#2F4858",
                color: "white",
                bottom: 20,
                right: 20,
              }}
              variant="contained"
              onClick={scrollToTop}
            >
              <KeyboardArrowUpRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default Questionnaire;

function QHeader() {
  return (
    <>
      <div
        className="container relative lg:h-[12vh] flex justify-center items-center bg-cover bg-no-repeat  border-[5px] rounded-[7px]"
        style={{ backgroundImage: `url(${top})` }}
      >
        <img
          src={logo}
          alt="logo"
          className="h-[32px] w-[32px] lg:h-[91px] lg:w-[91px]"
        />
        <p
          variant="h3"
          ml="22px"
          color="white"
          className="ml-6 text-white lg:text-5xl font-bold"
        >
          SaveAStray
        </p>
      </div>
    </>
  );
}

function QWelcome() {
  return (
    <>
      <Paper sx={paperStyle}>
        <img src={formIcon} alt="form icon" className="w-[55px] h-[77px]" />
        <div className="flex items-center w-full">
          <hr className="border border-[#FF8210] lg:w-[30%]" />
          <p className="font-bold lg:text-[2rem] text-[#FF8210] flex-1 text-center">
            ADOPTION QUESTIONNAIRE FORM
          </p>
          <hr className="border border-[#FF8210] lg:w-[30%]" />
        </div>
        <div className="lg:px-12 mt-6 text-[#2F4858] space-y-6 font-light">
          <div>
            <p className="text-highlight">
              Welcome to Your Next Furry Adventure!
            </p>
            <p>
              Are you ready to open your heart and home to a loving animal
              companion? We're thrilled you're considering adoption! This
              questionnaire will help us match you with the perfect furry friend
              who complements your lifestyle and brings joy to your life.
            </p>
          </div>
          <div>
            <p className="text-highlight">What to Expect:</p>
            <ul className="list-disc list-inside ">
              <li>Completing this form takes about 10-15 minutes.</li>
              <li>
                Your answers are confidential and will only be used to find the
                best match for you and an animal in need.
              </li>
              <li>
                Be honest and thorough! The more information you provide, the
                better we can understand your needs and preferences.
              </li>
              <li>All questions are required to answer</li>
            </ul>
          </div>
          <div>
            <p className="text-highlight">Adoption Process:</p>
            <p>Step 1: Fill out this form</p>
            <p>
              Step 2: Wait for the confirmation from the shelter’s response if
              you pass from this form.
            </p>
            <p>
              Step 3: Go through an interview via Zoom, Google Meet, or Facebook
              Messenger with one of shelter's volunteers
            </p>
            <p>
              Step 4: Visit the shelter, pay the adoption fee, and bring home
              your new best fur friend
            </p>
          </div>
          <p className="text-highlight">
            Ready to begin? Let's embark on this exciting journey together!
          </p>
        </div>
      </Paper>
      ;
    </>
  );
}

function QSection1() {
  return (
    <>
      <Paper sx={paperStyle}>
        <div className="paper-format">
          <p className="q-section-text">SECTION 1 : INTRODUCTION</p>
          <div className="input-container">
            <label htmlFor="email" className="font-bold lg:w-1/5">
              1. Enter your Email:
            </label>
            <Input id="email" type="email" fullWidth></Input>
          </div>
          <div className="flex flex-col">
            <FormControl>
              <label htmlFor="best-describe" className="font-bold">
                2. Which of the following best describes why you're filling out
                this form?
              </label>
              <RadioGroup
                id="best-describe"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel
                  label="I want to adopt a dog"
                  control={<RadioSmall />}
                />
                <FormControlLabel
                  label="I want to adopt a cat"
                  control={<RadioSmall />}
                />
                <FormControlLabel
                  label="I would like to adopt a pet, but I am unsure which type would be best suited for me"
                  control={<RadioSmall />}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </Paper>
    </>
  );
}

function QSection2() {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 2 : ADOPTION FEE</p>
        <p>
          To ensure the well-being of rescued animals, and maintain shelter's
          environment, rescue shelters ask for an adoption fee. This fee helps
          cover the costs of care, treatment, and upkeep, including everything
          from food and medical bills to shelter maintenance. But it's more than
          just funding; it serves as a symbol of commitment. We want to know our
          beloved animals find forever homes with individuals truly prepared to
          provide the love and care they deserve.
        </p>
        <p className="font-bold">
          I am aware that there's an ADOPTION FEE and fully agree to pay it (if
          only Adoption Process continues)
        </p>
        <FormControl>
          <FormControlLabel
            sx={{ color: "#FF8210" }}
            label="Yes, I am fully aware about adoption fee and willing to pay it."
            control={<RadioSmall />}
          />
        </FormControl>
      </div>
    </Paper>
  );
}

function QSection3() {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 3 : PERSONAL INFORMATION</p>
        <p>
          At SaveAStray, your privacy is our top priority. We keep all your
          personal information confidential and secure. It's used solely for
          processing your pet adoption application and never shared with third
          parties or for any other purpose. Trust us to safeguard your data
          while you find your furry soulmate!
        </p>
        <div className="input-container font-bold">
          <label htmlFor="full-name" className="sm:w-1/2">
            1. Full Name (First Name, M.I., Last Name):
          </label>
          <Input id="full-name" fullWidth />
        </div>
        <div className="input-container font-bold">
          <div className="input-container">
            <label htmlFor="birthdate" className="md:w-1/2 lg:w-1/5">
              2. Birthdate:
            </label>
            <DatePicker id="birthdate" fullWidth className="md:w-1/3" />
          </div>
          <div className="input-container lg:ml-6 lg:mt-0 mt-6">
            <label htmlFor="phone-num" className="lg:w-1/3">
              3. Phone Number:
            </label>
            <Input id="phone-num" fullWidth />
          </div>
          <div className="input-container lg:ml-6 lg:mt-0 mt-6">
            <label htmlFor="full-address">4. Full Address</label>
            <p>
              Follow This Format: Unit, Building Name, House Number, Street,
              Barangay, City, Region, Zip Code
            </p>
            <Input id="full-address" fullWidth />
          </div>
          <div className="input-container lg:ml-6 lg:mt-0 mt-6">
            <label htmlFor="fb-profile-link">5. Facebook Profile Link:</label>
            <Input id="fb-profile-link" fullWidth />
          </div>
          <div className="input-container lg:ml-6 lg:mt-0 mt-6">
            <label htmlFor="fb-profile-link">
              6. Occupation or Income (Type N/A if unemployed):
            </label>
            <Input id="fb-profile-link" fullWidth />
          </div>
          <div className="input-container lg:ml-6 lg:mt-0 mt-6">
            <FormControl>
              <label htmlFor="reach-methods">
                7. How will the shelters reach you aside from this website?
              </label>
              <FormGroup
                id="reach-methods"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel
                  label="Call and SMS"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel label="Email" control={<CheckboxSmall />} />
                <FormControlLabel
                  label="Facebook Messenger"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel
                  label="Telegram"
                  control={<CheckboxSmall />}
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </Paper>
  );
}

function QSection4() {
  return (
    <>
      <Paper sx={paperStyle}>
        <div className="paper-format font-light">
          <p className="q-section-text">SECTION 4 : HOUSEHOLD INFORMATION</p>
          <p>
            In an effort to help the process go smoothly, please be as detailed
            as possible with your responses to the questions below.
          </p>
          <div className="flex flex-col">
            <FormControl>
              <label htmlFor="best-describe" className="font-bold">
                1. What type of building did you live in?
              </label>
              <RadioGroup
                id="best-describe"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="House" control={<RadioSmall />} />
                <FormControlLabel label="Condo" control={<RadioSmall />} />
                <FormControlLabel label="Apartment" control={<RadioSmall />} />
                <FormControlLabel label="Other" control={<RadioSmall />} />
              </RadioGroup>
              <label htmlFor="rent" className="font-bold">
                2. Do you rent?
              </label>
              <RadioGroup
                id="rent"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="Yes" control={<RadioSmall />} />
                <FormControlLabel label="No" control={<RadioSmall />} />
              </RadioGroup>
              <label htmlFor="rent" className="font-bold">
                3. If you are renting, have you confirmed that pets are allowed
                by the owner or the condo admin?
              </label>
              <RadioGroup
                id="rent"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="Yes" control={<RadioSmall />} />
                <FormControlLabel label="No" control={<RadioSmall />} />
                <FormControlLabel
                  label="N/A (We are not renting)"
                  control={<RadioSmall />}
                />
              </RadioGroup>

              <label htmlFor="reach-methods" className="font-bold">
                4. Who do you live with?
              </label>
              <FormGroup
                id="reach-methods"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel
                  label="Living Alone"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel
                  label="With children over 18 years old"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel
                  label="With children below 18 years old"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel label="Spouse" control={<CheckboxSmall />} />
                <FormControlLabel
                  label="Roomate(s)"
                  control={<CheckboxSmall />}
                />
                <FormControlLabel label="Email" control={<CheckboxSmall />} />
                <FormControlLabel label="Parents" control={<CheckboxSmall />} />
                <FormControlLabel
                  label="Relatives (Grandparents, Uncle, Aunties, Cousins)"
                  control={<CheckboxSmall />}
                />
              </FormGroup>
              <label htmlFor="rent" className="font-bold">
                5. If you are renting, have you confirmed that pets are allowed
                by the owner or the condo admin?
              </label>
              <RadioGroup
                id="rent"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="1" control={<RadioSmall />} />
                <FormControlLabel label="2" control={<RadioSmall />} />
                <FormControlLabel label="3" control={<RadioSmall />} />
                <FormControlLabel label="4" control={<RadioSmall />} />
                <FormControlLabel label="5" control={<RadioSmall />} />
                <FormControlLabel label="6" control={<RadioSmall />} />
                <FormControlLabel label="7" control={<RadioSmall />} />
                <FormControlLabel label="8" control={<RadioSmall />} />
                <FormControlLabel
                  label="9 and above"
                  control={<RadioSmall />}
                />
              </RadioGroup>
              <label htmlFor="rent" className="font-bold">
                6. Are any members of your household allergic to animals?
              </label>
              <RadioGroup
                id="rent"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="Yes" control={<RadioSmall />} />
                <FormControlLabel label="No" control={<RadioSmall />} />
              </RadioGroup>
              <label htmlFor="rent" className="font-bold">
                7. Are all the members of your household supportive of adopting?
              </label>
              <RadioGroup
                id="rent"
                sx={{
                  color: "#FF8210",
                  ".MuiFormControlLabel-label": {
                    fontWeight: "300",
                  },
                }}
              >
                <FormControlLabel label="Yes" control={<RadioSmall />} />
                <FormControlLabel label="No" control={<RadioSmall />} />
              </RadioGroup>
              <div className="input-container font-bold">
                <label htmlFor="moved">
                  8. What will happen to your pets if or when you moved?
                </label>
                <Input id="moved" fullWidth type="text" />
              </div>
            </FormControl>
          </div>
        </div>
      </Paper>
    </>
  );
}

function QSection5() {
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
        <div className="input-container">
          <label htmlFor="name-of-rescue">
            <span className="font-bold">
              1. Name of rescue you want to adopt.
            </span>
            <br />
            Write 'N/A' if you don't have a specific rescue in mind and/or want
            to pick and decide when you visit the shelter.
          </label>
          <Input id="name-of-rescue" fullWidth />
        </div>
        <div className="input-container">
          <label htmlFor="not-availble" className="font-bold">
            2. If the rescue you indicated above is no longer available, are you
            open to choosing another rescue?
          </label>
          <RadioGroup
            id="not-availble"
            sx={{
              color: "#EE7200",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel
              label="Yes, I will adopt other rescue"
              control={<RadioSmall />}
            />
            <FormControlLabel
              label="No, I will just cancel my application"
              control={<RadioSmall />}
            />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="adopted-before" className="font-bold">
            3. Have you adopted pets before?
          </label>
          <RadioGroup
            id="adopted-before"
            sx={{
              color: "#EE7200",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="Yes" control={<RadioSmall />} />
            <FormControlLabel label="No" control={<RadioSmall />} />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="age-prefer" className="font-bold">
            4. Age Preference:
          </label>
          <RadioGroup
            id="adopted-before"
            sx={{
              color: "#EE7200",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="Kitten/Puppy" control={<RadioSmall />} />
            <FormControlLabel label="Adolescent" control={<RadioSmall />} />
            <FormControlLabel label="Adult" control={<RadioSmall />} />
            <FormControlLabel label="Secnior" control={<RadioSmall />} />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="age-prefer" className="font-bold">
            5. Energy Level:
          </label>
          <RadioGroup
            id="adopted-before"
            sx={{
              color: "#EE7200",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="High" control={<RadioSmall />} />
            <FormControlLabel label="Moderate" control={<RadioSmall />} />
            <FormControlLabel label="Low" control={<RadioSmall />} />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="special-needs" className="font-bold">
            6. Are you open to adopting pets with special needs?
          </label>
          <RadioGroup
            id="special-needs"
            sx={{
              color: "#EE7200",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="Yes" control={<RadioSmall />} />
            <FormControlLabel label="No" control={<RadioSmall />} />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="responsible-feeding" className="font-bold">
            7. Who will be responsible for feeding, grooming, and generally
            caring for your pet?
          </label>
          <Input id="responsible-feeding" />
        </div>
        <div className="input-container">
          <label htmlFor="responsible-financially" className="font-bold">
            8.Who will be financially responsible for your pet’s needs (i.e.
            food, vet bills, etc.)?
          </label>
          <Input id="responsible-financially" />
        </div>
        <div className="input-container">
          <label htmlFor="emergency" className="font-bold">
            9. Who will look after your pet if you go on vacation or in case of
            emergency?
          </label>
          <Input id="emergency" />
        </div>
        <div className="input-container">
          <label htmlFor="list-of-pets">
            <span className="font-bold">
              10. List all pets you have in past 5 years.
            </span>
            <br />
            Follow this format: Total Number and Breed (3 Aspin, 2 PusPin, 1
            Corgi). Put N/A if none
          </label>
          <Input id="list-of-pets" />
        </div>
      </div>
    </Paper>
  );
}

function QSection6() {
  return (
    <Paper sx={paperStyle}>
      <div className="paper-format font-light">
        <p className="q-section-text">SECTION 6 : FINISHING DETAILS</p>
        <p>
          Hi there, you are one step closer to adopting your furry friend. Let's
          finish this with just few more details. :)
        </p>
        <div className="input-container">
          <label htmlFor="prompted" className="font-bold">
            1. What prompted you to adopt from our website - SaveAStray?
          </label>
          <RadioGroup
            id="prompted"
            sx={{
              color: "#FF8210",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="Friends" control={<RadioSmall />} />
            <FormControlLabel label="Family" control={<RadioSmall />} />
            <FormControlLabel label="Internet" control={<RadioSmall />} />
            <FormControlLabel label="Social Media" control={<RadioSmall />} />
            <FormControlLabel label="Other" control={<RadioSmall />} />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="consider" className="font-bold">
            2. What made you consider adopting a rescue?
          </label>
          <Input id="consider" fullWidth />
        </div>
        <div className="input-container">
          <label htmlFor="prefer-interview" className="font-bold">
            3. Select your preferred interview platform
          </label>
          <RadioGroup
            id="prefer-interview"
            sx={{
              color: "#FF8210",
              ".MuiFormControlLabel-label": {
                fontWeight: "300",
              },
            }}
          >
            <FormControlLabel label="Zoom" control={<RadioSmall />} />
            <FormControlLabel label="Google Meet" control={<RadioSmall />} />
            <FormControlLabel
              label="Facebook Messenger"
              control={<RadioSmall />}
            />
          </RadioGroup>
        </div>
        <div className="input-container">
          <label htmlFor="prefer-date-time">
            <span className="font-bold">
              4. Preferred Date and Time of 1-hour interview. Provide at least 3
              options.
            </span>
            <br />
            Follow this Format: Month & Date at Time <br />
            Ex/ (January 1 at 3pm - 4pm) (January 9 at 10am - 11am) (February 5
            at 7pm - 8pm )
          </label>
          <DateTimePicker id="prefer-date-time" fullWidth />
        </div>
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
}

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
