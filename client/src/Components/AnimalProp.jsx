import {
  Box,
  Card,
  FormControl,
  Icon,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import animalPaw from "../assets/icons/animalPaw.svg";
import { useState } from "react";

export const AnimalProp = ({ prop, options, setFormData, formData, isAdd }) => {
  return (
    <>
      {isAdd && prop === "Status" ? null : (
        <Box
          sx={{
            p: "16px",
            border: "0.5px solid rgba(238, 114, 0, 0.50)",
            borderRadius: "7px",
            color: "#2F4858",
            backgroundColor: "#FFFFFF",
            transition: "box-shadow 0.3s ease",
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            "&:hover": {
              boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Icon>
            <img src={animalPaw} alt="icon" />
          </Icon>
          <Typography variant="body2" fontWeight={700}>
            {prop}
          </Typography>
          {renderInputOrSelection(prop, options, setFormData, formData, isAdd)}
        </Box>
      )}
    </>
  );
};

const renderInputOrSelection = (
  prop,
  options,
  setFormData,
  formData,
  isAdd
) => {
  if (prop === "Breed" || prop === "Color") {
    const handleInputPropChange = (e) => {
      setFormData((a) => ({
        ...a,
        [e.target.name]: e.target.value,
      }));
    };
    return (
      <InputBase
        required
        value={formData[prop.toLowerCase()]}
        name={prop.toLowerCase()}
        onChange={handleInputPropChange}
        sx={{
          fontSize: "16px",
          "& .MuiInputBase-input": {
            pr: 0,
          },
        }}
        placeholder={`Enter ${prop}`}
        fullWidth
      />
    );
  } else {
    return (
      <SelectionProp
        propName={prop}
        menuItems={options}
        setFormData={setFormData}
        formData={formData}
        isAdd={isAdd}
      />
    );
  }
};

function SelectionProp({ menuItems, setFormData, formData, propName, isAdd }) {
  const noStatusSelect = isAdd && propName === "Status" ? "false" : "true";
  const propertyName =
    propName === "Pet Type" ? "species" : propName.toLowerCase();
  const [selectedValue, setSelectedValue] = useState(formData[propertyName]);

  const handleSelectPropChange = (e) => {
    setSelectedValue(e.target.value);
    setFormData((a) => ({
      ...a,
      [e.target.name]: e.target.value,
    }));
  };

  if (isAdd && propName === "Status") {
    return null; // Don't render the Select component if isAdd is true and propName is 'Status'
  }
  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        value={selectedValue}
        required
        name={propertyName}
        displayEmpty
        onChange={handleSelectPropChange}
        input={<InputBase />}
        notched="true"
        sx={{ fontSize: "16px", fontWeight: 300 }}
      >
        <MenuItem disabled value="" sx={{ fontSize: "14px" }}>
          Select
        </MenuItem>
        {menuItems.map((item, idx) => (
          <MenuItem value={item} key={idx} sx={{ fontSize: "14px" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
