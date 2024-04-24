import React, { createContext, useCallback, useContext, useState } from "react";
import { store, persistor } from "../tools/store";
import { connect } from "react-redux";
import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionnaireContext = createContext();

const useQuestionnaire = () => {
  const { isLoggedIn, role, user } = useAuth();
  // State to store user answers
  const navigate = useNavigate();

  const [section1, setSection1] = useState({
    email: "",
    bestDescribe: "",
  });

  const [section2, setSection2] = useState({
    awareAdoptionFee: false,
  });

  const [section3, setSection3] = useState({
    fullName: "",
    birthdate: "",
    phoneNum: "",
    fullAddress: "",
    fbProfLink: "",
    occupation: "",
    shelterReach: {
      call: false,
      email: false,
      fbMessenger: false,
      telegram: false,
    },
  });

  const [section4, setSection4] = useState({
    building: "",
    rent: "",
    confirmedPets: "",
    liveWith: {
      livingAlone: false,
      withChildrenOver18: false,
      withChildrenOBelow18: false,
      spouse: false,
      roomates: false,
      parents: false,
      relatives: false,
    },
    householdMembers: "",
    isAllergic: "",
    isSupportive: "",
    moved: "",
  });

  const [section5, setSection5] = useState({
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
  });

  const [section6, setSection6] = useState({
    prompted: "",
    considerToAdopt: "",
    preferInterview: "",
    preferTime: [],
    validID: "",
  });

  const [toShelter, setToShelter] = useState("");

  const updateSection1 = useCallback((newData) => {
    setSection1((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  const updateSection2 = useCallback((newData) => {
    setSection2((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  const updateSection3 = useCallback((newData) => {
    setSection3((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  const updateSection4 = useCallback((newData) => {
    setSection4((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  const updateSection5 = useCallback((newData) => {
    setSection5((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  const updateSection6 = useCallback((newData) => {
    setSection6((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

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

  const handleShelterId = useCallback((newData) => {
    setToShelter(newData);
  });

  const submitAnswers = () => {
    const respondent = user;
    const formData = {
      respondent,
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
      toShelter,
    };

    // Check if any section has empty values
    // const isEmptySection = (section) => {
    //   return Object.values(section).some(
    //     (value) => value === "" || (Array.isArray(value) && value.length === 0)
    //   );
    // };

    // Check if any section is empty
    // if (
    //   isEmptySection(section1) ||
    //   isEmptySection(section2) ||
    //   isEmptySection(section3) ||
    //   isEmptySection(section4) ||
    //   isEmptySection(section5) ||
    //   isEmptySection(section6)
    // ) {
    //   console.log("Error: Some sections have empty values.");
    //   return;
    // }
    console.log(formData);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/sendAnswers`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        console.log(
          "Success adoption request, redirect user to adoption submitted page"
        );
        navigate("/adoptionSubmitted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Return the state, update function, and submit function for external use
  return {
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    toShelter,
    updateSection1,
    updateSection2,
    updateSection3,
    updateSection4,
    updateSection5,
    updateSection6,
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
