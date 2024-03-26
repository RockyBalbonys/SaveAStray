import { useState } from "react";

const UseSignup = () => {
  const [formData, setFormData] = useState({
    regEmail: "",
    regPass: "",
    regConfirmPass: "",
    regRole: "",
  });

  const [userExists, setUserExists] = useState(false);

  const [isGoogle, setIsGoogle] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return {
    formData,
    isGoogle,
    setIsGoogle,
    googleResponse,
    setGoogleResponse,
    handleChange,
    userExists,
    setUserExists,
  };
};

export default UseSignup;
