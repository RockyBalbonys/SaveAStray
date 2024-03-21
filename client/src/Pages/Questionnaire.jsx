import React from "react";
import top from "../assets/images/top.png";
import {
  Paper,
  Radio,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
  Container,
} from "@mui/material";
import logo from "../assets/icons/SAS_Logo4.png";
import formIcon from "../assets/icons/formIcon.svg";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import useScroll from "../hooks/useScroll";
import QSection1 from "../Components/QSections/QSection1";
import QSection2 from "../Components/QSections/QSection2";
import QSection3 from "../Components/QSections/QSection3";
import QSection4 from "../Components/QSections/QSection4";
import QSection5 from "../Components/QSections/QSection5";
import QSection6 from "../Components/QSections/QSection6";
import {
  QuestionnaireProvider,
  useQuestionnaireContext,
} from "../hooks/useQuestionnaire.jsx";

const Questionnaire = () => {
  const showButton = useScroll(500);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="background-questionnaire flex-col">
        <Container maxWidth="lg" className="space-y-6">
          <QHeader />
          <QWelcome />
          <QuestionnaireProvider>
            <QSection1 />
            <QSection2 />
            <QSection3 />
            <QSection4 />
            <QSection5 />
            <QSection6 />
            <SubmitButton />
          </QuestionnaireProvider>
          {/* Button to go back to the top */}
          {showButton && (
            <Tooltip title="Back to top">
              <IconButton
                sx={{
                  position: "fixed",
                  backgroundColor: "hsl(203, 30%, 26%, 0.7)",
                  color: "white",
                  bottom: 20,
                  right: 20,
                  width: "60px",
                  height: "60px",
                  border: "2px solid white",
                }}
                variant="contained"
                onClick={scrollToTop}
              >
                <KeyboardArrowUpRoundedIcon
                  sx={{ opacity: 1, fontSize: "2rem" }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Container>
      </div>
    </>
  );
};

export default Questionnaire;

export const paperStyle = {
  p: {
    xs: "12px 14px",
    sm: "18px 22px",
    md: "32px 40px",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  boxShadow: "none",
  borderRadius: "7px",
};

export function RadioSmall(props) {
  return <Radio {...props} size="small" sx={{ color: "#EE7200" }} />;
}
export function CheckboxSmall(props) {
  return <Checkbox {...props} size="small" sx={{ color: "#EE7200" }} />;
}

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
    </>
  );
}

function SubmitButton() {
  const { submitAnswers } = useQuestionnaireContext();
  return (
    // <Paper
    //   sx={{
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "center",
    //     p: "16px 32px",
    //   }}
    // >
    <Button
      onClick={submitAnswers}
      sx={{
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: "white",
        width: "100%",
        p: "16px 0",
        color: "#EE7200",
        fontWeight: "700",
        "&:hover": {
          backgroundColor: "#F8DFC9",
          boxShadow: "none",
        },
      }}
      variant="contained"
    >
      Submit Questionnaire Form
    </Button>
    // </Paper>
  );
}
