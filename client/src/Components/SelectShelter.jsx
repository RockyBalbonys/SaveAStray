import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export const SelectShelter = ({ value, onChange, shelters }) => {
  return (
    <FormControl>
      <Select
        onChange={onChange}
        displayEmpty
        value={value}
        variant="outlined"
        sx={{
          border: "1px solid hsl(29, 100%, 47%, 0.5)",
          fontSize: "16px",
          textAlign: "center",
          color: "#FF8210",
          fontWeight: "600",
          width: "215px",
          transition: "background border 300ms ease-out",
          "&:hover": {
            background: "hsl(29, 100%, 47%, 0.02)",
            border: "1px solid hsl(29, 100%, 47%, 1)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-input": {
            padding: "8px 32px",
          },
        }}
      >
        <MenuItem value="" sx={{ fontSize: "14px" }} disabled>
          Select A Shelter
        </MenuItem>
        {/* TODO:  1. Display menu items of shelters using map method
         2. Show shelter icons or color
        */}
        <MenuItem value="Shelter A" sx={{ fontSize: "14px" }}>
          Shelter A
        </MenuItem>
        <MenuItem value="Shelter B" sx={{ fontSize: "14px" }}>
          Shelter B
        </MenuItem>
      </Select>
    </FormControl>
  );
};
