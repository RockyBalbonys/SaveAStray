import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchInput({ value, onChange }) {
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        id="search-item"
        aria-label="Search pet name"
        placeholder="Search"
        sx={{ width: "90%", px: "36px" }}
        variant="outlined"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </>
  );
}
