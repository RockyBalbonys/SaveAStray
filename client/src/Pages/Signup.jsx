import React from 'react';
import {useState} from 'react';
import axios from 'axios';


//mga dinagdag: 
//change handlers, 
//post requests using axios,
//changed tag name for convenience
// -confirm password function (inaantay ko na lang yung ayos) / 
// -other datas / 
// -isave sa database /
// include roles to the post request /
// hashing/salting /
// bcrypt compare /

// mga gagawin pa: 
// sign in from google aralin - google oauth
// disabled effect sa button
// role optimization
// test



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
        userID: "",
        email: formData.regEmail,
        pass: formData.regPass,
        role: formData.regRole,
        verified: false
      });

      // Handle the response if needed
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const passwordsMatch = formData.regPass === formData.regConfirmPass;

  

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="border-2 border-black p-10 rounded-lg">
        <h1 className="text-2xl">Create Account</h1>
        
        <form onSubmit={regSubmit} className="flex flex-col mt-10 space-y-5">
        <div className="flex space-x-4 mt-8">
          <input type="radio" name="regRole" id="adoptiveParent" value="Adoptive Parent" onChange={handleChange}/>
          <label htmlFor="adoptiveParent">Adoptive Parent</label>
          <input type="radio" name="regRole" id="rescueShelter" value="Rescue Shelter"onChange={handleChange}/>
          <label htmlFor="rescueShelter">Rescue Shelter</label>
        </div>
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
            value={formData.regPass} 
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="regConfirmPass"
            className="border-2 p-2"
            value={formData.regConfirmPass} 
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl"
            disabled={!passwordsMatch}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
