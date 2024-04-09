import React from "react";
import {
  Button,
  Typography,
  Container,
  SpeedDial,
  SpeedDialAction,
  Box,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";
import Frame200Send from "../assets/images/Frame 200Send.svg";
import Footer from "../Components/PageComponent/Footer";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { Link as RouterLink } from "react-router-dom";

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

const buttonStyle = {
  padding: "10px",
  minWidth: "auto",
  height: "100%",
  backgroundColor: "#EE7200",
};

const actions = [
  { icon: <GetAppIcon />, name: "Print" },
  { icon: <ClearIcon />, name: "Reject" },
  { icon: <CheckIcon />, name: "Accept" },
];

function RequestShelter() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/fetchRequests`, {
        user,
      })
      .then(function (response) {
        const { allAnswers, respondent } = response.data;
        if (!respondent) {
          setAdoptionRequests(0); // Update state with transformed data
          console.log(adoptionRequests);
          console.log("No requests at the moment");
        } else {
          const transformedRequests = allAnswers.map(function (answer) {
            const notificationCreatedAt = new Date(answer.timestamp);
            const formattedTime = formatDistanceToNow(notificationCreatedAt, {
              addSuffix: true, 
            });
            return {
              name: answer.firstName,
              time: formattedTime,
              requestId: answer.id,
              approvalStatus: answer.approvalStatus,
              respondent: answer.respondent,
              toShelter: answer.toShelter, 
              imageURL: answer.dp
            };
          });
          setAdoptionRequests(transformedRequests); // Update state with transformed data
          console.log(transformedRequests);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleClick = (redirectTo) => {
    navigate(redirectTo);
  };

  const handleAcceptButton = (request) => {
    const { requestId, approvalStatus } = request;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updateApproval`, {
        requestId,
        approvalStatus: "approved",
      })
      .then(function (response) {
        console.log("response: ",response);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/notifPawrent`, {
          response
        })
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Approval Accepted: ", request);
  };

  const handleRejectButton = (request) => {
    const { requestId, approvalStatus } = request;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updateApproval`, {
        requestId,
        approvalStatus: "rejected",
      })
      .then(function (response) {
        console.log(response);
          axios.post(`${process.env.REACT_APP_SERVER_URL}/api/notifPawrent`, {
            response
          })
          .then(function(response){
            console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Approval Denied: ", request);
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
      <div className="bg-[#FAFAFB] h-full">
        <Container sx={{ padding: "1rem", paddingY: "5rem" }}>
          {adoptionRequests.length > 0 ? (
            adoptionRequests.map((request, index) => (
              /*      request.approvalStatus == 'pending' ? ( */
              <div
                key={index}
                onClick={(event) => {
                  event.preventDefault();
                  handleClick(request.redirectTo);
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  background: index % 2 === 0 ? "#FFF" : "#FFF0DE",
                  padding: "16px",
                  borderBottom: "1px solid #EE7200",
                  borderRadius: "7px",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexGrow: 1,
                  }}
                >
                  <img
                    src={request.imageURL}
                    alt=""
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
                <Box
                  sx={{
                    position: "relative",
                    width: "350px",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                      },
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <Tooltip title="Accept">
                      <Button
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => handleAcceptButton(request)}
                      >
                        <CheckIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Reject">
                      <Button
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => handleRejectButton(request)}
                      >
                        <ClearIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Send Message">
                      <Button
                        variant="contained"
                        style={buttonStyle}
                        component={RouterLink}
                        to="/messages"
                      >
                        <img
                          src={Frame200Send}
                          alt="Send"
                          style={{ minWidth: "24px", minHeight: "24px" }}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Print">
                      <Button variant="contained" style={buttonStyle}>
                        <GetAppIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <SpeedDial
                      direction="left"
                      ariaLabel="SpeedDial basic example"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        display: {
                          xs: "block",
                          sm: "block",
                          md: "none",
                        },
                        width: "100%",
                        height: "100%",
                      }}
                      icon={<SpeedDialIcon sx={{ color: "white" }} />}
                    >
                      {actions.map((action, idx) => (
                        <SpeedDialAction
                          key={idx}
                          icon={action.icon}
                          tooltipTitle={action.name}
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                </Box>
              </div>
              /*             ) : null */
            ))
          ) : (
            <p>No adoption requests found.</p>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default RequestShelter;
