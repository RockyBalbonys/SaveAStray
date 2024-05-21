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
import Navbar from "../Components/PageComponent/OldNavbar";
import AddIcon from "@mui/icons-material/Add";

import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import {
  FormControl,
  FormLabel,
  Modal,
  useTheme,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

// loader
import { DotLoader } from "react-spinners";

// framer motion
import { motion } from "framer-motion";

const Chat = () => {
  // state for contacts
  const [contacts, setContacts] = useState([]);

  const { isLoggedIn, user, role } = useAuth();

  const [loading, setLoading] = useState(false);

  // state for adding events
  // const [event, setEvent] = useState({
  //   date: "",
  //   time: "",
  //   petName: "",
  //   pawrent: "",
  //   pawrent_id: "",
  // });

  // handle onChange for event inputs
  // const handleEventInputChange = (field, value) => {
  //   if (field === "date") {
  //     const formattedDate = format(value, "eee MMM d yyyy");
  //     setEvent((prevEvent) => ({
  //       ...prevEvent,
  //       [field]: formattedDate,
  //     }));
  //   } else if (field === "time") {
  //     const formattedTime = format(value, "h:mm a");
  //     setEvent((prevEvent) => ({
  //       ...prevEvent,
  //       [field]: formattedTime,
  //     }));
  //   } else {
  //     setEvent((prevEvent) => ({
  //       ...prevEvent,
  //       [field]: value,
  //     }));
  //   }
  // };

  // modal state and functions
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // TODO: handle submit / add event
  // const handleSubmitEvent = (e) => {
  //   axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/api/addEvent`, { event })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log("event submit");
  //   handleClose();
  // };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/fetchContacts/${user}`, {
        headers: {
          "ngrok-skip-browser-warning": "8888",
        },
        params: {
          user,
        },
      })
      .then(function (response) {
        const { messages } = response.data;
        const sortedMessages = messages?.sort((a, b) => {
          // Get the last chat of each conversation
          const lastChatA = a.conversation[a.conversation.length - 1];
          const lastChatB = b.conversation[b.conversation.length - 1];

          // Compare the timestamps of the last chats
          return new Date(lastChatB.timestamp) - new Date(lastChatA.timestamp);
        });

        function setTimestamp(timestamp) {
          const notificationReceivedAt = new Date(timestamp);
          const formattedTime = formatDistanceToNow(notificationReceivedAt, {
            addSuffix: true,
          });
          return formattedTime;
        }

        const mappedMessages = messages.map((message) => {
          const lastMessage = message.conversation
            ? message.conversation[message.conversation.length - 1]
            : null;
          return {
            name: message.receiverName,
            chatId: message.chatId,
            timestamp: lastMessage ? setTimestamp(lastMessage.timestamp) : null,
            conversation: message.conversation,
            dp: message.dp,
          };
        });

        setContacts(mappedMessages);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bgLogin h-screen w-screen mt-[-64px]">
        {loading ? (
          <>
            <div className="flex flex-col items-center space-y-2">
              <DotLoader color="orange" />
              <Typography
                component={motion.div}
                variant="subtitle2"
                color={"white"}
                animate={{
                  x: [0, -10, 10, 0], // Animation sequence for x position
                  transition: { duration: 2, repeat: Infinity }, // Animation duration and repetition
                }}
              >
                Setting up the Chat Room...
              </Typography>
            </div>
          </>
        ) : (
          <Box sx={{ height: "70%", width: "90%", display: "flex" }}>
            <Grid
              container
              component={Paper}
              sx={{
                height: "100%",
                borderRadius: "7px",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Contact List */}
              <Grid item xs={3} sx={{ height: "100%", width: "100%" }}>
                <ContactListContainer contacts={contacts} />
              </Grid>

              {/* Chatbox */}
              <Grid item xs={9} sx={{ height: "100%" }}>
                <Chatbox
                  contacts={contacts}
                  loading={loading}
                  // eventData={event}
                  // onChange={handleEventInputChange}
                  // handleSubmitEvent={handleSubmitEvent}
                  // open={open}
                  // handleClose={handleClose}
                  // handleOpen={handleOpen}
                />
              </Grid>
              {/* Event Viewer */}
            </Grid>
            {/*<Events
              eventData={event}
              onChange={handleEventInputChange}
              setEventData={setEvent}
            />*/}
          </Box>
        )}
      </div>
    </>
  );
};

export default Chat;

// Create component for showing list of contacts
function ContactListContainer({ contacts }) {
  const theme = useTheme();

  // Sort contacts by timestamp in descending order
  let sortedContact = contacts?.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
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
          bgcolor: theme.palette.common.dirtyWhite,
        }}
      >
        <p className="mb-6 text-lg font-bold text-[#FF8210]">
          List of Contacts
        </p>

        {/* Search Bar for contacts */}
        {/* <input
          className="w-[90%] rounded-lg border-gray-100 border-2 p-1.5 mb-2"
          type="text"
          placeholder="Search Contact"
        /> */}

        {/* List of Contacts */}
        {contacts?.map((contact, idx) => (
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
function Chatbox({
  contacts,
  eventData,
  onChange,
  handleSubmitEvent,
  open,
  handleOpen,
  handleClose,
}) {
  const { chatId } = useParams();
  const contactInfo = contacts.find((contact) => contact.chatId === chatId);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {!chatId ? (
          "No chat selected"
        ) : (
          <Messages
            contactInfo={contactInfo}
            // eventData={eventData}
            // onChange={onChange}
            // handleSubmitEvent={handleSubmitEvent}
            // open={open}
            // handleOpen={handleOpen}
            // handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
}

function Messages({
  contactInfo,
  inputMessage,
  eventData,
  onChange,
  handleSubmitEvent,
  open,
  handleOpen,
  handleClose,
}) {
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

  const theme = useTheme();

  const { role } = useAuth();

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
        <Box
          sx={{
            flexGrow: 1,
            height: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chatbox header */}
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "16px" }}
          >
            <Badge variant="dot" color={"success"}>
              <Avatar src={dp} />
            </Badge>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <p className="text-2xl font-bold text-[#FF8210]">{name}</p>
              <p className="text-sm mb-2">
                {online ? "Active Right Now" : "Active Before"}
              </p>
            </Box>

            {/* Add event button */}
            {/* {role === "Rescue Shelter" && (
              <Button
                sx={{
                  textTransform: "none",
                  color: theme.palette.common.white,
                  borderRadius: "7px",
                }}
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add Event
              </Button>
            )} */}
            {/* <AppointmentForm
              open={open}
              handleClose={handleClose}
              eventData={eventData}
              handleChange={onChange}
              handleSubmitEvent={handleSubmitEvent}
            /> */}
          </Box>
          <Divider />

          {/* Chatbox messages content */}
          <Box
            x
            sx={{
              flexGrow: 1,
              pr: "8px",
              overflowY: "auto",
              mb: "12px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {convo.map((message, idx) => (
                  <React.Fragment key={idx}>
                    {message.messageSender === user ? (
                      <Box
                        sx={{
                          alignSelf: "flex-end",
                          my: "6px",
                          width: "60%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Box
                          sx={{
                            width: "fit-content",
                            background: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            p: "4px 6px",
                            borderRadius: "12px",
                          }}
                        >
                          {message.content}
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          display: "flex",
                          justifyContent: "flex-start",
                          my: "6px",
                          width: "50%",
                        }}
                      >
                        <Box
                          sx={{
                            width: "fit-content",
                            background: "#fcfafa",
                            p: "4px 6px",
                            borderRadius: "12px",
                            border: "0.7px solid #e7e7e7",
                          }}
                        >
                          {message.content}
                        </Box>
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
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

// function Events({ eventData, onChange, setEventData }) {
//   const { user } = useAuth();
//   axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getEvents`, {
//     headers: {
//       "ngrok-skip-browser-warning": "8888",
//     },
//     params: {
//       user: user, // Include user ID for potential filtering on server-side
//     },
//   });
//   const sampleEvents = [
//     {
//       date: "Thu May 16 2024",
//       time: "1:17 PM",
//       petName: "Bakharwal dog",
//       pawrent: "Whitney Nader",
//     },
//     {
//       date: "Fri May 17 2024",
//       time: "3:00 PM",
//       petName: "Small Biggie",
//       pawrent: "Prince Jericho Mabini",
//     },
//     {
//       date: "Thu May 16 2024",
//       time: "1:17 PM",
//       petName: "Bakharwal dog",
//       pawrent: "Whitney Nader",
//     },
//     {
//       date: "Thu May 16 2024",
//       time: "1:17 PM",
//       petName: "Bakharwal dog",
//       pawrent: "Whitney Nader",
//     },
//     {
//       date: "Thu May 16 2024",
//       time: "1:17 PM",
//       petName: "Bakharwal dog",
//       pawrent: "Whitney Nader",
//     },
//   ];
//   const theme = useTheme();

//   return (
//     <>
//       <Box
//         sx={{
//           width: "30%",
//           height: "100%",
//           ml: "16px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           borderRadius: "7px",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             position: "sticky",
//             top: 0,
//           }}
//         >
//           <Typography
//             variant="h6"
//             fontWeight={700}
//             color={theme.palette.common.white}
//             mb={"16px"}
//           >
//             ADOPTION SCHEDULE
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             width: "100%",
//             overflowY: "auto",
//             scrollbarWidth: "none", // Hide the scrollbar for firefox
//             "&::-webkit-scrollbar": {
//               display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
//             },
//             "&-ms-overflow-style:": {
//               display: "none", // Hide the scrollbar for IE
//             },
//             rowGap: "16px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Display events */}
//           {sampleEvents.map((event, idx) => (
//             <Paper sx={paperStyle} key={idx}>
//               <Typography>
//                 <span className="font-black">Date:</span> {event.date}
//               </Typography>
//               <Typography>
//                 <span className="font-black">Time:</span> {event.time}
//               </Typography>
//               <Typography>
//                 <span className="font-black">Pet Name:</span> {event.petName}
//               </Typography>
//               <Typography>
//                 <span className="font-black">Pawrent:</span> {event.pawrent}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// }

// function AppointmentForm({
//   open,
//   handleClose,
//   eventData,
//   handleChange,
//   handleSubmitEvent,
// }) {
//   const { date, time, petName, pawrent } = eventData;

//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//         }}
//       >
//         <Paper
//           sx={{
//             p: "32px",
//             width: {
//               xs: "90%",
//               sm: "80%",
//               md: "70%",
//               lg: "50%",
//             },
//             position: "relative",
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h5" component="h2">
//             Schedule a Pet Appointment
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ my: 2 }}>
//             Please fill out the form below to schedule an appointment for your
//             pet. Ensure all details are accurate to help us provide the best
//             care for your furry friend.
//           </Typography>

//           <Box
//             sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
//           >
//             <Box
//               sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
//             >
//               <Typography>Appointment Details:</Typography>
//               <FormControl>
//                 <DatePicker
//                   label="Set Date"
//                   value={date ? new Date(date) : null}
//                   onChange={(newValue) => handleChange("date", newValue)}
//                 />
//               </FormControl>
//               <FormControl>
//                 <TimePicker
//                   label="Set Time"
//                   value={time ? new Date(`1970-01-01T${time}`) : null}
//                   onChange={(newValue) => handleChange("time", newValue)}
//                 />
//               </FormControl>
//             </Box>

//             <Box
//               sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
//             >
//               <Typography>Pet Information:</Typography>
//               <FormControl>
//                 <TextField
//                   label="Pet Name"
//                   value={petName}
//                   onChange={(e) => handleChange("petName", e.target.value)}
//                 />
//               </FormControl>
//             </Box>

//             <Box
//               sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
//             >
//               <Typography>Owner Information:</Typography>
//               <FormControl>
//                 <TextField
//                   label="Pawrent Name"
//                   value={pawrent}
//                   onChange={(e) => handleChange("pawrent", e.target.value)}
//                 />
//               </FormControl>
//             </Box>
//             <Typography>
//               Once you have completed the form, click "Submit" to confirm your
//               appointment. We look forward to seeing you and your pet!
//             </Typography>
//           </Box>

//           <Button
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               width: "100%",
//               color: "white",
//               mt: "32px",
//             }}
//             variant="contained"
//             onClick={handleSubmitEvent}
//           >
//             Submit
//           </Button>
//         </Paper>
//       </Modal>
//     </>
//   );
// }

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const paperStyle = {
  width: "100%",
  p: "10px",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.07);",
  borderRadius: "0px",
  color: "#2F4858",
};
