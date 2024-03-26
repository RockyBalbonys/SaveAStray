import React, { createContext, useContext, useState } from "react";
import { store, persistor } from "../tools/store";
import { connect } from "react-redux";
import useAuth from "./useAuth";
import axios from "axios";

const QuestionnaireContext = createContext();

const useQuestionnaire = () => {
  const { isLoggedIn, role, user } = useAuth();
  // State to store user answers
  const [answers, setAnswers] = useState({
    // Initial value of answers
    section1: {
      email: "",
      bestDescribe: "",
    },
    section2: {
      awareAdoptionFee: false,
    },
    section3: {
      fullName: "",
      birthdate: "",
      phoneNum: "",
      fullAddress: "",
      fbProfLink: "",
      occupation: "",
      shelterReach: [],
    },
    section4: {
      building: "",
      rent: "",
      confirmedPets: "",
      liveWith: [],
      householdMembers: "",
      isAllergic: "",
      isSupportive: "",
      moved: "",
    },
    section5: {
      rescueName: "",
      isWillingToChoose: "",
      adoptedBefore: "",
      agePreference: "",
      energyLevel: "",
      isWillingToSpecialNeeds: "",
      responsibleForCaring: "",
      responsibleForFinance: "",
      emergency: "",
      listOfPets: "",
    },
    section6: {
      prompted: "",
      considerToAdopt: "",
      preferInterview: "",
      preferTime: [],
      validID: "",
    },
    toShelter: "",
  });

  // Function to update user answers
  const updateAnswer = (section, question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [section]: {
        ...prevAnswers[section],
        [question]: value,
      },
    }));
  };

  const handleShelterId = (toShelter, shelterId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      toShelter: shelterId,
    }));
  };

  //TODO: Function to submit answers to the database
  const submitAnswers = () => {
    console.log("current state: ", store.getState());
    console.log("Current User: ", user);

    const respondent = user;
    const section1 = answers.section1;
    const section2 = answers.section2;
    const section3 = answers.section3;
    const section4 = answers.section4;
    const section5 = answers.section5;
    const section6 = answers.section6;
    const toShelter = answers.toShelter;

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/sendAnswers`, {
        respondent,
        section1,
        section2,
        section3,
        section4,
        section5,
        section6,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Return the state, update function, and submit function for external use
  return {
    answers,
    updateAnswer,
    submitAnswers,
    handleShelterId,
  };
};

// Provider component to wrap around the application
export const QuestionnaireProvider = ({ children }) => {
  const questionnaire = useQuestionnaire();

  return (
    <QuestionnaireContext.Provider value={questionnaire}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

// Custom hook to access the questionnaire context
export const useQuestionnaireContext = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireContext must be used within a QuestionnaireProvider"
    );
  }
  return context;
};
