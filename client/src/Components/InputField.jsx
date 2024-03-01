import { Stack } from "@mui/material";
import { AnimalNameInput, AnimalDescInput } from "./CustomInput";

export const InputField = ({ onChange, data }) => {
  return (
    <>
      <Stack direction="column">
        <AnimalNameInput
          value={data.name}
          name="name"
          onChange={onChange}
          placeholder="Animal Name"
          aria-label="animal name"
          inputProps={{ maxLength: 150 }}
          required
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
        />
      </Stack>
    </>
  );
};
