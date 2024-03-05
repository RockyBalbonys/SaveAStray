import { Stack } from "@mui/material";
import { AnimalNameInput, AnimalDescInput } from "./Input/CustomInput";

export const InputField = ({ onChange, data }) => {
  return (
    <>
      <Stack direction="column">
        <AnimalNameInput
          value={data.name.slice(0, 1).toUpperCase() + data.name.slice(1)}
          name="name"
          onChange={onChange}
          placeholder="Animal Name"
          aria-label="animal name"
          inputProps={{ maxLength: 150 }}
          required
          sx={{ fontSize: "24px", color: "#2F4858", fontWeight: "600" }}
        />
        <AnimalDescInput
          value={data.description}
          name="description"
          onChange={onChange}
          placeholder="Add description here... (600 characters max including whitespace)"
          aria-label="animal description"
          multiline
          rows={15}
          inputProps={{ maxLength: 600 }}
          required
          sx={{ fontSize: "14px", color: "#2F4858", fontWeight: "300" }}
        />
      </Stack>
    </>
  );
};
