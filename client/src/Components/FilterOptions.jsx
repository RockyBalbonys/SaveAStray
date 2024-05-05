import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MyFormControlLabel } from "../Components/MyFormControlLabel";

export function FilterOptions({
  filters,
  handleFilterChange,
  handleApplyFilters,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    filters.map(() => null)
  );

  console.log(filters);

  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    if (filtersApplied) {
      handleApplyFilters();
      setFiltersApplied(false); // Reset to false after applying filters
    }
  }, [filtersApplied]);

  const handleApplyFiltersClick = () => {
    setFiltersApplied(true);
  };

  const handleOptionChange = (filterIndex, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[filterIndex] = option;
      return newSelectedOptions;
    });
    handleFilterChange(filters[filterIndex].propType.toLowerCase(), option);
    console.log(filters[filterIndex].propType.toLowerCase(), option);
  };

  const handleClearFilters = () => {
    setSelectedOptions(filters.map(() => null));
    filters.forEach((filter) => {
      handleFilterChange(filter.propType.toLowerCase(), null);
    });
    setFiltersApplied(true);
  };

  const theme = useTheme();

  return (
    <Grid
      container
      width="100%"
      sx={{
        p: "24px 24px 32px 24px",
        backgroundColor: theme.palette.common.white,
        borderRadius: "7px",
        my: "32px",
      }}
      rowSpacing={3}
    >
      {filters.map((filter, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={2.4} item>
          <FormControl>
            <FormLabel
              sx={{ fontSize: "16px", color: "#EE7200", fontWeight: "600" }}
            >
              {filter.propType}
            </FormLabel>
            <RadioGroup
              value={selectedOptions[index]}
              onChange={(event) =>
                handleOptionChange(index, event.target.value)
              }
              sx={{
                fontSize: "16px",
                color: "#EE7200",
                rowGap: "4px",
                pl: "16px",
              }}
            >
              {filter.options.map((option, idx) => (
                <MyFormControlLabel
                  control={<Radio sx={{ color: "#EE7200" }} />}
                  key={idx}
                  value={option}
                  label={<Typography fontSize="16px">{option}</Typography>}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      ))}
      <Box width="100%" sx={{ display: "flex", columnGap: "32px", mt: "32px" }}>
        <Button
          variant="outlined"
          width="100%"
          sx={{
            flexGrow: 1,
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "7px",
          }}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
        <Button
          onClick={handleApplyFiltersClick}
          variant="contained"
          sx={{
            color: "white",
            flexGrow: 1,
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "7px",
          }}
          width="100%"
        >
          Apply Filters
        </Button>
      </Box>
    </Grid>
  );
}
