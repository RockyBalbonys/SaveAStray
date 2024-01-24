import React from 'react';
import {useState} from 'react';
import axios from 'axios';

//mga dinagdag: 
//change handlers, 
//post requests using axios,
//changed tag name for convenience

// mga gagawin pa: 
// -confirm password function
// -other datas
// -isave sa database

function Signup() {
  const [ formData, setFormData ] = useState({
    regEmail: "",
    regPass: "",
    regConfirmPass: "",
    regRole: ""
  })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const regSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        name: "",
        email: formData.regEmail,
        password: formData.regPassword,
        role: "Adoptive Parent",
        verified: false
      });

      // Handle the response if needed
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="border-2 border-black p-10 rounded-lg">
        <h1 className="text-2xl">Create Account</h1>
        <div className="flex space-x-4 mt-8">
          <input type="radio" name="clientType" id="adoptiveParent" />
          <label htmlFor="adoptiveParent">Adoptive Parent</label>
          <input type="radio" name="clientType" id="rescueShelter" />
          <label htmlFor="rescueShelter">Rescue Shelter</label>
        </div>
        <form onSubmit={regSubmit} className="flex flex-col mt-10 space-y-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="regEmail"
            className="border-2 p-2"
            value={formData.regEmail} 
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="regPass"
            className="border-2 p-2"
            value={formData.regPassword} 
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="regConfirmPass"
            className="border-2 p-2"
            value={formData.regConfirmPassword} 
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
