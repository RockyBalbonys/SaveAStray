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
  Pagination,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import AnimalCard from "../Components/Card/AnimalCard";
import Footer from "../Components/PageComponent/Footer";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { SortByButton } from "../Components/SortByButton";
import { FilterOptions } from "../Components/FilterOptions";
import SearchIcon from "@mui/icons-material/Search";
import ModalAddPet from "../Components/Modal/ModalAddPet";

const AnimalsShelter = () => {
  const [animals, setAnimals] = useState([]);

  console.table(animals);

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
        setAnimals(allPets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const fetchFilteredPets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/filteredPets",
        {
          params: filters,
        }
      );

      let filteredPets = response.data.filteredPets;

      // Apply sorting logic to the filtered subset of animals
      if (sortBy === "Ascending") {
        filteredPets = filteredPets.sort((a, b) => {
          // Sorting logic for ascending order
          // For example, compare the name property of animals
          return a.name.localeCompare(b.name);
        });
      } else if (sortBy === "Descending") {
        filteredPets = filteredPets.sort((a, b) => {
          // Sorting logic for descending order
          // For example, compare the name property of animals
          return b.name.localeCompare(a.name);
        });
      }

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

  const handleApplyFilters = () => {
    fetchFilteredPets();
  };

  const filteredOptions = [
    { propType: "Pet Type", options: ["Dog", "Cat"] },
    { propType: "Sex", options: ["Male", "Female"] },
    { propType: "Age", options: ["Young", "Adolescent", "Adult", "Senior"] },
    { propType: "Size", options: ["Small", "Medium", "Large", "Giant"] },
    { propType: "Status", options: ["Available", "On Process", "Adopted"] },
  ];

  // Sorting by names
  const [sortBy, setSortBy] = useState("");

  const handleChangeSortBy = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy((prevSortBy) => {
      if (selectedSortBy === "Ascending") {
        setAnimals(ascendingPets);
      } else if (selectedSortBy === "Descending") {
        setAnimals(descendingPets);
      }
      return selectedSortBy;
    });
  };

  // Sort Ascending
  const ascendingPets = () => {
    return animals.sort(compareByNameAscending);
  };

  // Sort Descending
  const descendingPets = () => {
    return animals.sort(compareByNameDescending);
  };

  function compareByNameAscending(a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  }

  function compareByNameDescending(a, b) {
    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
  }

  // Search function
  const [searchValue, setSearchValue] = useState("");

  // Filtered animals based on search value
  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(animals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, animals.length);

  const currentAnimals = filteredAnimals.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="relative bg-gradient-to-bl from-amber-500 to-orange-600 h-[65vh] w-full flex justify-end items-center">
        <div className="absolute left-0 z-10 w-full">
          <Container maxWidth="lg">
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
          className="absolute hidden md:block h-full bg-no-repeat bg-contain w-full bg-right"
        ></div>
      </div>
      <Container maxWidth="lg" sx={{ my: "64px", position: "relative" }}>
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

        <Grid
          container
          sx={{
            rowGap: "16px",
            columnGap: "8px",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <Grid item order={{ xs: 2, sm: 2, md: 2, lg: 1 }}>
            <SortByButton value={sortBy} onChange={handleChangeSortBy} />
          </Grid>
          {/* TODO: Search bar */}
          <Grid
            item
            order={{ xs: 1, sm: 1, md: 1, lg: 2 }}
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchInput
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </Grid>
          <Grid item order={{ xs: 2, sm: 3, md: 3, lg: 3 }}>
            <AddAnimal setAnimals={setAnimals} />
          </Grid>
        </Grid>

        {/* Filter Component */}
        <FilterOptions
          filters={filteredOptions}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
        />

        <Grid
          container
          columnSpacing={3}
          rowSpacing={4}
          mt={4}
          alignItems="center"
        >
          {currentAnimals.length === 0 ? (
            <Typography
              variant="h6"
              component="p"
              color="secondary"
              textAlign="center"
              width="100%"
            >
              No pet found
            </Typography>
          ) : (
            currentAnimals.map((animal, idx) => (
              <Grid
                key={idx}
                item
                xs={12}
                sm={6}
                md={3}
                display="flex"
                justifyContent="center"
              >
                <AnimalCard
                  animals={animal}
                  height="auto"
                  width="257px"
                  setAnimals={setAnimals}
                />
              </Grid>
            ))
          )}
        </Grid>
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            mt: 2,
          }}
        >
          <Pagination
            variant="rounded"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
            sx={{ mt: 2, justifyContent: "center" }}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AnimalsShelter;

function SearchInput({ value, onChange }) {
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        id="search-item"
        aria-label="Search pet name"
        placeholder="Search"
        sx={{ width: "500px" }}
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

function AddAnimal({ setAnimals }) {
  const [openAddModal, setOpenAddModal] = useState(false);

  const defaultAnimalData = {
    // Define default animal data
    name: "",
    description: "",
    species: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    size: "",
  };
  const defaultUploadedImages = []; // Define default uploaded images
  const handleModalClose = () => {
    setOpenAddModal(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<AddIcon />}
        onClick={() => {
          setOpenAddModal(true);
        }}
        sx={{ textTransform: "none", padding: "6px 34px" }}
      >
        Add New Pet
      </Button>
      <ModalAddPet
        open={openAddModal}
        onClose={handleModalClose}
        defaultAnimal={defaultAnimalData}
        defaultImage={defaultUploadedImages}
        setAnimals={setAnimals}
      />
    </>
  );
}