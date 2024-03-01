import {
  Box,
  FormControl,
  Icon,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import animalPaw from "../assets/icons/animalPaw.svg";
import { useState } from "react";

export const AnimalProp = ({ prop, options, setFormData, formData }) => {
  return (
    <>
      <Box
        sx={{
          p: "16px",
          border: "1px solid rgba(238, 114, 0, 0.50)",
          borderRadius: "7px",
        }}
      >
        <Icon>
          <img src={animalPaw} alt="icon" />
        </Icon>
        <Typography variant="body2" fontWeight={700}>
          {prop}
        </Typography>
        {renderInputOrSelection(prop, options, setFormData, formData)}
      </Box>
    </>
  );
};

const renderInputOrSelection = (prop, options, setFormData, formData) => {
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
      />
    );
  }
};

function SelectionProp({ menuItems, setFormData, formData, propName }) {
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
