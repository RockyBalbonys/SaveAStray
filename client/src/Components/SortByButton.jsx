import { FormControl, MenuItem, Select } from "@mui/material";

export function SortByButton({ value, onChange }) {
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
          Sort By
        </MenuItem>
        <MenuItem value="Ascending" sx={{ fontSize: "14px" }}>
          Ascending (A-Z)
        </MenuItem>
        <MenuItem value="Descending" sx={{ fontSize: "14px" }}>
          Descending (Z-A)
        </MenuItem>
      </Select>
    </FormControl>
  );
}
