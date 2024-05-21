import React, { useMemo } from "react";
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
import { DotLoader } from "react-spinners";

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

  console.log(adoptionRequests);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (request) => {
    const chatId = generateChatId(user, request.respondent);
    console.log("chatId " + chatId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/createChat`,
        {
          chatId: chatId,
          user: user,
          respondent: request.respondent,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "8888",
          },
        }
      );
      // Navigate if success
      navigate(`/messages/t/${chatId}`);
    } catch (error) {
      // Handle errors if any
      console.error("Error creating chat:", error);
      // Navigate if success
      navigate(`/messages/t/${chatId}`);
    }
  };

  function generateChatId(senderId, receiverId) {
    if (senderId < receiverId) {
      return `${senderId}_${receiverId}`;
    } else {
      return `${receiverId}_${senderId}`;
    }
  }

  // Compute a dependency value based on approval statuses
  const approvalStatuses = useMemo(
    () => adoptionRequests.map((request) => request.approvalStatus).join(","),
    [adoptionRequests]
  );

  useEffect(() => {
    fetchRequests();
  }, [approvalStatuses]);

  const fetchRequests = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/fetchRequests`, { user })
      .then(function (response) {
        const { allAnswers, respondent, answerKeys } = response.data;
        if (!respondent) {
          setAdoptionRequests(0); // Update state with transformed data
          console.log("No requests at the moment");
        } else {
          const transformedRequests = allAnswers.map(function (answer, index) {
            const notificationCreatedAt = new Date(answer.timestamp);
            const formattedTime = formatDistanceToNow(notificationCreatedAt, {
              addSuffix: true,
            });
            // Extract answers object from answerKeys using the index
            const answersObjId = answerKeys[index]._id;

            return {
              name: answer.firstName,
              time: formattedTime,
              requestId: answer.id,
              approvalStatus: answer.approvalStatus,
              respondent: answer.respondent,
              toShelter: answer.toShelter,
              imageURL: answer.dp,
              answerId: answersObjId,
            };
          });
          setAdoptionRequests(transformedRequests); // Update state with transformed data
          console.log(transformedRequests);
        }
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleAcceptButton = (request) => {
    const { requestId, approvalStatus } = request;
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updateApproval`, {
        requestId,
        approvalStatus: "approved",
      })
      .then(function (response) {
        console.log("response: ", response);
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/notifPawrent`, {
            response,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        fetchRequests();
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Approval Accepted: ", request);
  };

  const handleRejectButton = (request) => {
    const { requestId, approvalStatus } = request;
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/updateApproval`, {
        requestId,
        approvalStatus: "rejected",
      })
      .then(function (response) {
        console.log(response);
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/notifPawrent`, {
            response,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        fetchRequests();
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log("Approval Denied: ", request);
  };

  return (
    <div
      style={{
        overflowY: "auto",
        width: "100vw",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      <div className="bg-[#FAFAFB] h-[60vh] flex w-full">
        {isLoading && (
          <div className="loader-container">
            <DotLoader
              color="orange"
              cssOverride={{ position: "absolute", zIndex: 1000 }}
            />
          </div>
        )}
        <Container sx={{ padding: "1rem", paddingY: "5rem" }}>
          {adoptionRequests.length > 0 ? (
            adoptionRequests.map((request, index) => (
              /*      request.approvalStatus == 'pending' ? ( */
              <Box
                key={index}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  background:
                    index % 2 === 0
                      ? request.approvalStatus !== "pending"
                        ? "#cfcfcf"
                        : "#FFF"
                      : "#FFF0DE",
                  padding: "16px",
                  borderBottom: "1px solid #EE7200",
                  borderRadius: "7px",
                  width: "100%",
                  marginBottom: "8px",
                }}
                component={RouterLink}
                to={`/questionnaireAnswers/${request.answerId}`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexGrow: 1,
                  }}
                >
                  <img src={request.imageURL} alt="" style={imageStyle} />
                  <div>
                    {request.approvalStatus === "pending" && (
                      <Typography>
                        <strong>{request.name}</strong> requested an adoption
                      </Typography>
                    )}
                    {request.approvalStatus === "approved" && (
                      <Typography>
                        <strong>{request.name}</strong> adoption request has
                        been approved
                      </Typography>
                    )}
                    {request.approvalStatus === "rejected" && (
                      <Typography>
                        <strong>{request.name}</strong> adoption request has
                        been rejected
                      </Typography>
                    )}

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
                        xs: "flex",
                      },
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "10px",
                      position: "absolute",
                    }}
                  >
                    <Tooltip title="Accept">
                      <Button
                        variant="contained"
                        onClick={() => handleAcceptButton(request)}
                        sx={{
                          padding: "10px",
                          minWidth: "auto",
                          height: "100%",
                          backgroundColor: "#EE7200",
                        }}
                      >
                        <CheckIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Reject">
                      <Button
                        variant="contained"
                        onClick={() => handleRejectButton(request)}
                        sx={{
                          padding: "10px",
                          minWidth: "auto",
                          height: "100%",
                          backgroundColor: "#EE7200",
                        }}
                      >
                        <ClearIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>

                    {/* TODO: Reroute current user to chat page */}
                    <Tooltip title="Send Message">
                      <Button
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => handleSendMessage(request)}
                      >
                        <img
                          src={Frame200Send}
                          alt="Send"
                          style={{ minWidth: "24px", minHeight: "24px" }}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Print">
                      <Button
                        variant="contained"
                        style={buttonStyle}
                        component={RouterLink}
                        to={"/about"}
                      >
                        <GetAppIcon style={{ color: "#FFFFFF" }} />
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              /*             ) : null */
            ))
          ) : (
            <>
              <Typography textAlign={"center"} variant="h6">
                No Request Found
              </Typography>
            </>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default RequestShelter;
