import styled from "@emotion/styled";
import { Badge } from "@mui/material";
import React from "react";

const StyledBadge = styled(Badge)(({ theme, status }) => ({
  // Use this style if the status is Available
  "& .MuiBadge-badge": {
    backgroundColor: getStatusColor(status).background,
    color: getStatusColor(status).text,
    border: `1px solid ${getStatusColor(status).border}`,
    borderRadius: "7px",
    padding: "12px 10px",
    fontSize: "1rem",
    fontWeight: "400",
  },
}));

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return {
        background: "#DAFFCD",
        text: "#299B01",
        border: "#299B01",
      };
    case "On Process":
      return {
        background: "#FFCC80",
        text: "#FF6F00",
        border: "#FF6F00",
      };
    case "Adopted":
      return {
        background: "#FF8A65",
        text: "#BF360C",
        border: "#BF360C",
      };
    default:
      return {
        background: "transparent",
        text: "black",
        border: "transparent",
      };
  }
};

const BadgeAnimal = ({ status }) => {
  return (
    <StyledBadge
      sx={{
        position: "absolute",
        top: "8px",
        left: "40px",
      }}
      badgeContent={status}
      status={status}
    />
  );
};

export default BadgeAnimal;
