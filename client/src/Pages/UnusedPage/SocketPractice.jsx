import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";

function SocketPractice() {

  const { isLoggedIn, user, role } = useAuth();

  const socket = io(process.env.REACT_APP_SERVER_URL, { query: { user } }); // Connect to the server

  socket.on('connect', () => {
    console.log('Socket connected!'); // Log here after successful connection
  });

  socket.on('broadcast-message', (broadcastedMessage) => {
    console.log('Broadcasted message:', broadcastedMessage);
  });

  const [userMessage, setUserMessage] = useState()

  function sendMessage () {
      socket.emit('send-message', userMessage)
      console.log(user);
  }

  const handleChange = (e) => {
    setUserMessage(e.target.value);
};
  

  return (
    <>
          <input type="text" name='message' onChange={handleChange}/>
          <button type="button" onClick={sendMessage}>submit</button>
    </>
  );
}

export default SocketPractice;
