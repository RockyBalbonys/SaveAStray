import React, { createContext, useContext, useState } from "react";

const QuestionnaireContext = createContext();

const useQuestionnaire = () => {
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
      preferTime: "",
      validID: "",
    },
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

  //TODO: Function to submit answers to the database
  const submitAnswers = () => {
    console.log("answers submitted");
  };

  // Return the state, update function, and submit function for external use
  return {
    answers,
    updateAnswer,
    submitAnswers,
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
