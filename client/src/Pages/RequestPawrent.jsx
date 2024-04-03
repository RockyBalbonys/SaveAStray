import React from "react";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from "react-router-dom";
import actionImage from "../assets/images/Frame 200Send.svg"; 
import Footer from "../Components/PageComponent/Footer";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

const headerStyles = {
  display: "flex",
  padding: "40px 10%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "10px",
  alignSelf: "stretch",
  width: "100%",
};

const imageStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid orange",
};

function RequestPawrent() {
  const { user } = useAuth();
  const [pawrentNotifs, setPawrentNotifs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/fetchNotifs`, {
        user,
      })
      .then(function (response) {
        console.log(response);
        const { mappedNotifs } = response.data
        if (mappedNotifs == null) {
          setPawrentNotifs(0); // Update state with transformed data
          console.log(pawrentNotifs);
          console.log("No requests at the moment");
        } else {
          const mappedPawrentNotifs = mappedNotifs.map((notif) => {
            const notificationReceivedAt = new Date(notif.timestamp); // Replace with actual timestamp or function to get it
            const formattedTime = formatDistanceToNow(notificationReceivedAt, {
              addSuffix: true, 
            });
            return {
              name: notif.from,
              time: formattedTime,
              approvalStatus: notif.approvalStatus,
              imageURL: notif.imageURL
            };
          })
          setPawrentNotifs(mappedPawrentNotifs)
        }
  
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    navigate("/questionnaire");
  };

  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      <style>
        {`
          body {
            overflow-y: auto;
          }
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div
        style={headerStyles}
        className="bg-gradient-to-bl from-amber-500 to-orange-600"
      >
        <Typography variant="h4" style={{ color: "#FFFFFF" }}>
          Animal Request Adoption Information
        </Typography>
        <Typography style={{ color: "#FFFFFF" }}>
          Look about the adoption process and find someone to have a perfect
          furry companion!
        </Typography>
      </div>
      <div className="bg-[#FAFAFB]">
        <Container
          sx={{
            paddingY: "5rem",
          }}
        >
          {pawrentNotifs.length > 0 ? (
          pawrentNotifs.map((request, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: index % 2 === 0 ? "#FFF" : "#FFF0DE",
                padding: "16px",
                borderBottom: "2px solid orange",
                borderRadius: "10px",
                width: "100%",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={request.imageURL}
                    alt=""
                    style={imageStyle}
                  />
                  <div>
                    <Typography>
                      <strong>{request.name}</strong> {request.approvalStatus} your request.
                    </Typography>
                    <Typography variant="caption" color="#2F4858">
                      {request.time}
                    </Typography>
                  </div>
                </div>
                <Tooltip title="Send Message">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EE7200",
                      minWidth: "50px",
                      minHeight: "50px",
                      padding: "10px",
                    }}
                    onClick={handleClick}
                  >
                    <img
                      src={actionImage}
                      alt="Action"
                      style={{
                        minWidth: "24px",
                        minHeight: "24px",
                        color: "#FFFFFF",
                      }}
                    />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))) : (
            <p>No adoption requests found.</p>
          )
          }
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default RequestPawrent;
