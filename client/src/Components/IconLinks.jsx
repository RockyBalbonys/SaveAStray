import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Stack, IconButton } from "@mui/material";

const IconLinks = ({ icons }) => {
  return (
    <Stack direction="row" columnGap={3}>
      {icons.map((item, index) => (
        <IconButton key={index} component={RouterLink} to="/Contact">
          <img src={item.icon} alt={item.alt} width="26px" />
        </IconButton>
      ))}
    </Stack>
  );
};

export default IconLinks;
