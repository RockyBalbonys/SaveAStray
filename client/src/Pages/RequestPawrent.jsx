import React from "react";
import { Button, Typography, Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import actionImage from "../assets/images/Frame 200Send.svg"; // Import actionImage
import jembotImage from "../assets/images/animals/jembot.jpg";
import felixImage from "../assets/images/animals/felix.jpg";
import inibamImage from "../assets/images/animals/inibam.jpg";
import lansImage from "../assets/images/animals/lans.jpg";
import pugdoyImage from "../assets/images/animals/pugdoy.jpg";
import ramboImage from "../assets/images/animals/rambo.jpg";
import Footer from "../Components/PageComponent/Footer";

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

const AdoptionRequests = [
  { name: "Joemen", time: "a few seconds ago", imageUrl: jembotImage },
  { name: "Redeeet", time: "1 minute ago", imageUrl: felixImage },
  { name: "Rokcyyyy :>", time: "1 hour ago", imageUrl: inibamImage },
  { name: "Mateek", time: "2 hours ago", imageUrl: lansImage },
  { name: "Iniba’am", time: "1 day ago", imageUrl: pugdoyImage },
  { name: "Lancer", time: "2 days ago", imageUrl: ramboImage },
];

function RequestPawrent() {
  const navigate = useNavigate();

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
          {AdoptionRequests.map((request, index) => (
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
                    src={request.imageUrl}
                    alt={request.name}
                    style={imageStyle}
                  />
                  <div>
                    <Typography>
                      <strong>{request.name}</strong> requested an adoption
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
          ))}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default RequestPawrent;
