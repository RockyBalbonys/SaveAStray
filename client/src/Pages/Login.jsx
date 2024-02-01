import { useState, useEffect } from "react";
import axios from "axios";

//check password if correct
//

const Login = () => {
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPass: "",
    loginRole: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: formData.loginEmail,
        password: formData.loginPass,
        role: "Adoptive Parent",
        verified: false,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id:
        "367854237850-6nomj4kp7i22ikmlcv0n4d0qkj332mhe.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="border-2 border-black p-10 rounded-lg">
        <h1 className="text-2xl">Login Account</h1>
        <div className="flex space-x-4 mt-8">
          <input type="radio" name="clientType" id="adoptiveParent"></input>
          <label htmlFor="adoptiveParent">Adoptive Parent</label>
          <input type="radio" name="clientType" id="rescueShelter"></input>
          <label htmlFor="rescueShelter"> Rescue Shelter</label>
        </div>
        <form
          onSubmit={loginSubmit}
          action=""
          method="POST"
          className="flex flex-col mt-10 space-y-5"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="loginEmail"
            className="border-2 p-2"
            value={formData.loginEmail}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="loginPass"
            value={formData.loginPass}
            onChange={handleChange}
            className="border-2 p-2"
          />

          {/* TODO: insert google oauth api
            Note: Here's the button of google sign in
          */}
          <hr />
          <div className="my-2">
            <div id="signinDiv"></div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
