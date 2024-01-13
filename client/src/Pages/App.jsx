import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Content from '../Components/Content'
import axios from 'axios';

function App() {
  // Function to send a ping to the server
  const sendPing = async () => {
      try {
          // Make a POST request using Axios
          const response = await axios.post('http://localhost:3001/api/ping', {
              key1: 'value1',
              key2: 'value2',
              // Add other data properties as needed
          });

          // Handle the response from the server (optional)
          console.log('Server response:', response.data);
      } catch (error) {
          // Handle errors
          console.error('Error sending ping:', error);
      }
  };

  return (
      <div>
          {/* Trigger the sendPing function on a button click */}
          <button type="button" onClick={sendPing}>
              Send Ping
          </button>
      </div>
  );
}

export default App;