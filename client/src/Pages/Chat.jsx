import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

// mui components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
// icons and images
import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import avatar_placeholder from "../assets/images/avatar_placeholder.png";
import Navbar from "../Components/PageComponent/Navbar";

import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import axios from "axios"



const Chat = () => {
  // hard coded contacts
  const [contacts, setContacts] = useState([])
  const { isLoggedIn, user, role } = useAuth();
  axios.get(`${process.env.REACT_APP_SERVER_URL}/api/fetchContacts/${user}`, 
            {
              params: {
                user,
              },
            }).then(function(response) {
              const { messages } = response.data
              const mappedMessages = messages.map(message => (
                {
                  name: "sample name",
                  chatId: message.chatId,
                  conversation: message.conversation
                }
              ))
              setContacts(mappedMessages)
            }).catch(function(error){
              console.log(error);
            })


  return (
    <>
      <Navbar />
      <div className="bgLogin h-screen w-screen mt-[-64px]">
        <Container sx={{ height: "70%" }}>
          <Grid
            container
            component={Paper}
            sx={{ height: "100%", borderRadius: "7px" }}
          >
            {/* Contact List */}
            <Grid item xs={4} sx={{ height: "100%", width: "100%" }}>
              <ContactListContainer contacts={contacts} />
            </Grid>

            {/* Chatbox */}
            <Grid item xs={8} sx={{ height: "100%" }}>
              <Chatbox contacts={contacts} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Chat;

// Create component for showing list of contacts
function ContactListContainer({ contacts }) {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          maxWidth: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: "16px",
        }}
      >
        <p className="mb-6 text-lg font-bold text-[#FF8210]">
          List of Contacts
        </p>

        {/* Search Bar for contacts */}
        <input
          className="w-[90%] rounded-lg border-gray-100 border-2 p-1.5 mb-2"
          type="text"
          placeholder="Search Contact"
        />

        {/* List of Contacts */}
        {contacts.map((contact, idx) => (
          <React.Fragment key={idx}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "16px",
                "&:hover": {
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                },
              }}
              component={RouterLink}
              to={`/messages/t/${contact.chatId}`} //pass userId to url
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  columnGap: "16px",
                  alignItems: "center",
                }}
              >
                <Badge
                  variant="dot"
                  color={contact.online ? "success" : undefined}
                >
                  <Avatar src={avatar_placeholder} />
                </Badge>

                {/* Contact info container */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#FF8210" }}>
                    {contact.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    {contact.message}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    {contact.timestamp}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

// Create component for chat based system
function Chatbox({ contacts }) {
  const { chatId } = useParams();
  const contactInfo = contacts.find((contact) => contact.chatId === chatId);
  return (
    <>
      <Box sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {!chatId ? (
            "No chat selected"
          ) : (
            <Messages contactInfo={contactInfo} />
          )}
        </Box>
      </Box>
    </>
  );
}

function Messages({ contactInfo, inputMessage }) {
  const { isLoggedIn, user, role } = useAuth();
const { name, online, conversation, chatId } = contactInfo;
const [userMessage, setUserMessage] = useState({   
    timestamp: Date.now(),
    chatId,
    messageSender: user,
    content: inputMessage,
})
//console.log(userMessage);

const socket = io(process.env.REACT_APP_SERVER_URL, { query: { user } }); // Connect to the server
// socket events

socket.on('connect', () => {
  console.log('Socket connected!'); // Log here after successful connection
}); 

socket.on('broadcast-message', (broadcastedMessage) => {
  console.log('Broadcasted message:', broadcastedMessage);
});



// functions

const changeHandler = (e) => {
  setUserMessage({...userMessage, content: e.target.value});
};

function sendMessage() {
    socket.emit('send-message', userMessage); // Send the updated message to the server
}

function generateChatId(senderId, receiverId) {
  if (senderId < receiverId) {
    return `${senderId}_${receiverId}`;
  } else {
    return `${receiverId}_${senderId}`;
  }
}



  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: "16px",
        }}
      >
        {/* Chatbox messages content container */}
        <Box sx={{ flexGrow: 1, height: "90%" }}>
          {/* Chatbox header */}
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "16px" }}
          >
            <Badge variant="dot" color={"success"}>
              <Avatar src={avatar_placeholder} />
            </Badge>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <p className="text-2xl font-bold text-[#FF8210]">{name}</p>
              <p className="text-sm mb-2">
                {online ? "Active Right Now" : "Active Before"}
              </p>
            </Box>
          </Box>
          <Divider />

          {/* Chatbox messages content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "90%",
              overflow: "auto",
            }}
          >
            {conversation.map((message, idx) => (
              <React.Fragment key={idx}>
                <Box sx={{ textAlign: "end" }}>{message.content}</Box>
                <Box sx={{ textAlign: "start" }}>{message.content}</Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <input
            className="w-full rounded-lg border-gray-100 focus:border-orange-300 focus:ring-orange-300 border-2 mr-4 p-2.5"
            type="text"
            value={inputMessage}
            placeholder="Type your message..."
            onChange={changeHandler}
          />
          <IconButton onClick={sendMessage}>
            <Tooltip title="Send Message">
              <SendRoundedIcon sx={{ color: "#FF8210" }} />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
