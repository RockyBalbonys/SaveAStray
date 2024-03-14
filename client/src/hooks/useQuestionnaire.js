import { useState } from "react";

// Custom hook to manage user answers and handle database interactions
const useQuestionnaire = () => {
  // State to store user answers
  const [answers, setAnswers] = useState({
    // Initialize answers object with default values
    // You can define default values for each question here
    section1: {
      email: "",
      bestDescribe: "",
    },
    section2: {
      awareAdoptionFee: false,
    },
    // Define more sections and questions as needed
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

  // Function to submit answers to the database
  const submitAnswers = () => {
    // Implement logic to send answers to the database
    // You can use fetch, axios, or any other method to make a network request
    // Example:
    fetch("https://api.example.com/submit-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Answers submitted successfully");
          // Optionally, you can clear the answers state after successful submission
          // setAnswers({ ... }); // Update with default values or clear the state
        } else {
          console.error("Failed to submit answers");
        }
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
  };

  // Return the state, update function, and submit function for external use
  return {
    answers,
    updateAnswer,
    submitAnswers,
  };
};

export default useQuestionnaire;
