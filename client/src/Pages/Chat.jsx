import React, { useEffect, useState, useRef } from "react";
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
import { formatDistanceToNow } from "date-fns";


const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const { isLoggedIn, user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  axios.get(`${process.env.REACT_APP_SERVER_URL}/api/fetchContacts/${user}`, 
            {
              params: {
                user,
              },
            }).then(function(response) {
              const { messages } = response.data;
              function setTimestamp(timestamp) {
                const notificationReceivedAt = new Date(timestamp);
                const formattedTime = formatDistanceToNow(notificationReceivedAt, {
                  addSuffix: true,
                });
                return formattedTime;
              }
              
              const mappedMessages = messages.map(message => ({
                name: message.receiverName,
                chatId: message.chatId,
                timestamp: setTimestamp(message.conversation[message.conversation.length - 1].timestamp),
                conversation: message.conversation,
                dp: message.dp
              }));
              
              setContacts(mappedMessages)
              setLoading(false)
            }).catch(function(error){
              console.log(error);
              setLoading(false)
            })

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/fetchContacts/${user}`,
          {
            params: { user },
          }
        );
        const { messages } = response.data;
        const mappedMessages = messages.map((message) => ({
          name: message.receiverName,
          chatId: message.chatId,
          timestamp: "sample timestamp" /* message.timestamp */,
          conversation: message.conversation,
          dp: message.dp,
        }));
        setContacts(mappedMessages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="bgLogin h-screen w-screen mt-[-64px]">
        {loading ? (
          <div>Loading...</div>
        ) : (
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
                <Chatbox contacts={contacts} loading={loading} />
              </Grid>
            </Grid>
          </Container>
        )}
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
                  <Avatar src={contact.dp} />
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
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    async function fetchContactInfo() {
      console.log("chatId " + chatId);
      const foundContact = contacts.find(
        (contact) => contact?.chatId === chatId
      );
      console.log("contact info", foundContact);
      setContactInfo(foundContact);
    }

    fetchContactInfo();
  }, [chatId, contacts]);

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

function Messages({ contactInfo, inputMessage /* , loading */ }) {
  const { user } = useAuth(); // Assuming useAuth provides user info
  const { name, online, chatId, conversation, dp, timestamp } = contactInfo;
  // Ensure convo state updates when conversation changes
  const [convo, setConvo] = useState(conversation);
  const [userMessage, setUserMessage] = useState({
    timestamp: Date.now(),
    chatId,
    messageSender: user,
    content: "",
  });

  const socketRef = useRef(null); // Create a mutable ref for the socket object

  useEffect(() => {
    setUserMessage((prevUserMessage) => ({
      ...prevUserMessage,
      chatId: contactInfo.chatId, // Update chatId when contactInfo changes
    }));
    // Update convo state when conversation changes
    setConvo(conversation);
  }, [chatId]);

  useEffect(() => {
    try {
      socketRef.current = io(process.env.REACT_APP_SERVER_URL, {
        transports: ["websocket"],
        query: { user },
      });

      // Socket event handlers
      socketRef.current.on("connect", () => {
        console.log("Socket connected!");
      });

      socketRef.current.on("broadcast-message", (broadcastedMessage) => {
        console.log("Broadcasted message:", broadcastedMessage);
        // Update convo state with new message
        setConvo((prevConvo) => [...prevConvo, broadcastedMessage]);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      return () => {
        socketRef.current.disconnect();
      };
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }, [user, chatId]); // Include user and chatId in the dependency array

  // functions

  const changeHandler = (e) => {
    setUserMessage({ ...userMessage, content: e.target.value });
  };

  function sendMessage() {
    // Send the updated message to the server using the socketRef.current object
    socketRef.current.emit("send-message", userMessage);
    setUserMessage({ ...userMessage, content: "" });
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
              <Avatar src={dp} />
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
            {convo.map((message, idx) => (
              <React.Fragment key={idx}>
                {message.messageSender === user ? (
                  <Box sx={{ textAlign: "end" }}>{message.content}</Box>
                ) : (
                  <Box sx={{ textAlign: "start" }}>{message.content}</Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <input
            className="w-full rounded-lg border-gray-100 focus:border-orange-300 focus:ring-orange-300 border-2 mr-4 p-2.5"
            type="text"
            value={userMessage.content}
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
