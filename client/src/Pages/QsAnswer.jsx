import React, { useEffect } from "react";
import { QHeader, QWelcome, SubmitButton } from "./Questionnaire";
import QSection1 from "../Components/QSections/QSection1";
import QSection2 from "../Components/QSections/QSection2";
import QSection3 from "../Components/QSections/QSection3";
import QSection4 from "../Components/QSections/QSection4";
import QSection5 from "../Components/QSections/QSection5";
import QSection6 from "../Components/QSections/QSection6";
import useScroll from "../hooks/useScroll";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Button, Container, IconButton, Tooltip } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuestionnaireContext } from "../hooks/useQuestionnaire";

const QsAnswer = () => {
  const showButton = useScroll(500);
  const { fetchAnswer } = useQuestionnaireContext();

  const { answerId } = useParams();
  console.log(answerId);

  useEffect(() => {
    fetchAnswer(answerId);
  }, []);

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
          <QSection1 isAnswer={true} />
          <QSection2 isAnswer={true} />
          <QSection3 isAnswer={true} />
          <QSection4 isAnswer={true} />
          <QSection5 isAnswer={true} />
          <QSection6 isAnswer={true} />
          <CloseQuestionnaireAnswer />
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

export default QsAnswer;

function CloseQuestionnaireAnswer() {
  const { role } = useAuth();
  const requestLink = role === "Adoptive Pawrent" ? "pawrent" : "shelter";
  return (
    <Button
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
      component={RouterLink}
      to={`/request/${requestLink}`}
    >
      Go back to Request Page
    </Button>
  );
}
