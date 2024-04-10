import React from "react";
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

// hard coded contacts
const contacts = [
  {
    name: "Lance",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "12345678",
    online: true,
  },
  {
    name: "Lawrence",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "24681012",
    online: false,
  },
  {
    name: "Jhude",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "36912151",
    online: true,
  },
  {
    name: "An-ghelo",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "48121620",
    online: true,
  },
  {
    name: "Joshua",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "51015202",
    online: true,
  },
  {
    name: "Jericho",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "61218243",
    online: false,
  },
  {
    name: "Jericho",
    message: "Type Text here",
    timestamp: "Today 05:30 PM",
    userId: "81624324",
    online: true,
  },
];

const Chat = () => {
  return (
    <>
      <div className="bgLogin h-screen w-screen">
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
              <Chatbox />
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
              to={`/messages/t/${contact.userId}`} //pass userId to url
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
function Chatbox() {
  const { roomId } = useParams();
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
          {!roomId ? "No chat selected" : <Messages roomId={roomId} />}
        </Box>
      </Box>
    </>
  );
}

function Messages({ roomId }) {
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
        <Box sx={{ flexGrow: 1 }}>
          {/* Chatbox header */}
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "16px" }}
          >
            <Badge variant="dot" color={"success"}>
              <Avatar src={avatar_placeholder} />
            </Badge>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <p className="text-2xl font-bold text-[#FF8210]">Lance</p>
              <p className="text-sm mb-2">Active Right Now</p>
            </Box>
          </Box>
          <Divider />

          {/* Chatbox messages content */}
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <input
            className="w-full rounded-lg border-gray-100 focus:border-orange-300 focus:ring-orange-300 border-2 mr-4 p-2.5"
            type="text"
            placeholder="Type your message..."
          />
          <IconButton>
            <Tooltip title="Send Message">
              <SendRoundedIcon sx={{ color: "#FF8210" }} />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
