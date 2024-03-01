import React, { useEffect, useState } from "react";
import animalHero from "../assets/images/animals/animalHero.png";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useRadioGroup,
} from "@mui/material";
import AnimalCard from "../Components/AnimalCard";
import { mockAnimals, animalProps } from "../constants/animals";
import Footer from "../Components/Footer";
import AddIcon from "@mui/icons-material/Add";
import AddAnimalModal from "../Components/AddAnimalModal";
import axios from "axios";
import styled from "@emotion/styled";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    age: null,
    size: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPet")
      .then(function (response) {
        const allPets = response.data.allPets;
        console.log(allPets);
        setAnimals(allPets);
        allPets.forEach((pet) => {
          console.log(pet.name);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const fetchFilteredPets = async () => {
    try {
      const response = await axios.get("/api/filteredPets", { params: filters });
      setAnimals(response.data.filteredPets);
    } catch (error) {
      console.error("Error fetching filtered pets:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: null,
      sex: null,
      age: null,
      size: null,
    });
  };

  const handleApplyFilters = () => {
    fetchFilteredPets();
  };

  const filteredOptions = [
    { propType: "Pet Type", options: ["Dog", "Cat"] },
    { propType: "Sex", options: ["Male", "Female"] },
    { propType: "Age", options: ["Young", "Adolescent", "Adult", "Senior"] },
    { propType: "Size", options: ["Small", "Medium", "Large", "Giant"] }
  ];

  const [sortBy, setSortBy] = useState("");

  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-orange-500 to-orange-300  h-[40vh] w-full flex justify-end items-center">
        <div className="absolute left-0 z-10 w-full">
          <Container maxWidth="md">
            <Typography variant="h2" className="text-white">
              Rescue. <br /> <span className="text-[#2F4858]">Adopt.</span>{" "}
              <br /> Love. <br /> Spread.
            </Typography>
          </Container>
        </div>
        <div
          style={{
            backgroundImage: `url(${animalHero})`,
          }}
          className="absolute h-full bg-no-repeat bg-contain w-full bg-right"
        ></div>
      </div>
      <Container maxWidth="lg" sx={{ my: "64px" }}>
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            It’s My Pawssion!
          </Typography>
          <Typography variant="body2" fontWeight={300} width="600px">
            Here is the list of animals in your shelter. You can add another
            rescue, update some of their information, or remove adopted pets
          </Typography>
        </Container>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <SortByButton value={sortBy} onChange={handleChangeSortBy} />
          <Box sx={{ flexGrow: 1 }} /> {/* Search bar place */}
          <AddAnimal />
        </Box>

        <FilterOptions filters={filteredOptions} handleFilterChange={handleFilterChange} handleApplyFilters={handleApplyFilters} />

        <Grid
          container
          columnSpacing={3}
          rowSpacing={4}
          mt={4}
          justifyContent="center"
          alignItems="center"
        >
          {animals && animals.map((animal, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={3}>
              <AnimalCard animals={animal} height="auto" width="257px" />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Animals;

function AddAnimal() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleClose = () => setOpenAddModal(false);
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<AddIcon />}
        onClick={() => setOpenAddModal(true)}
        sx={{ textTransform: "none" }}
      >
        Add New Pet
      </Button>
      <AddAnimalModal open={openAddModal} onClose={handleClose} />
    </>
  );
}

function SortByButton({ value, onChange }) {
  return (
    <FormControl width="195px">
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
          width: "195px",
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
        <MenuItem value="Available" sx={{ fontSize: "14px" }}>
          Available
        </MenuItem>
        <MenuItem value="Adopted" sx={{ fontSize: "14px" }}>
          Adopted
        </MenuItem>
        <MenuItem value="On Process" sx={{ fontSize: "14px" }}>
          On Process
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function FilterOptions({ filters, handleFilterChange, handleApplyFilters }) {
  const [selectedOptions, setSelectedOptions] = useState(
    filters.map(() => null)
  );

  const handleOptionChange = (filterIndex, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[filterIndex] = option;
      return newSelectedOptions;
    });
    handleFilterChange(filters[filterIndex].propType.toLowerCase(), option);
  };

  const handleClearFilters = () => {
    setSelectedOptions(filters.map(() => null));
    filters.forEach((filter) => {
      handleFilterChange(filter.propType.toLowerCase(), null);
    });
  };

  return (
    <Grid
      container
      width="100%"
      sx={{ p: "24px 24px 32px 24px" }}
      rowSpacing={3}
    >
      {filters.map((filter, index) => (
        <Grid key={index} xs={12} sm={6} md={3} item>
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
          variant="contained"
          sx={{
            color: "white",
            flexGrow: 1,
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "7px",
          }}
          width="100%"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </Box>
    </Grid>
  );
}

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  fontSize: "16px",
  width: "152px",
  border: "1.2px solid transparent",
  fontWeight: "300",
  transition: "background-color border 1s ease",
  "&:hover": {
    background: "#FAFAFB",
    borderRadius: "40px",
    border: "1.2px solid rgba(238, 114, 0, 0.80)",
    paddingRight: "16px",
  },
  ...(checked && {
    // Conditional background style when checked
    background: "rgba(238, 114, 0, 0.15)",
    borderRadius: "40px",
    border: "1.2px solid transparent",
    paddingRight: "16px",
  }),
}));

function MyFormControlLabel(props) {
  // MUI UseRadio Group
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}
