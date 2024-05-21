// react and other functions
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

// custom components
import AnimalCard from "../../Components/Card/AnimalCard";
import Footer from "../../Components/PageComponent/Footer";
import { SortByButton } from "../../Components/SortByButton";
import { FilterOptions } from "../../Components/FilterOptions";
import ModalAddPet from "../../Components/Modal/ModalAddPet";
import { SearchInput } from "../../Components/SearchInput";
import PawrentCard from "../../Components/Card/PawrentCard";
import { SelectShelter } from "../../Components/SelectShelter";

// mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

// constant datas
import {
  defaultUploadedImages,
  filteredOptions,
  defaultAnimalData,
} from "../../constants/animals";

// sorting logic
import { ascendingPets, descendingPets } from "../../constants/sortLogic";

// icons and images
import animalHero from "../../assets/images/animals/animalHero.png";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";

const AnimalsPawrent = () => {
  const [animals, setAnimals] = useState([]);
  const { isLoggedIn, user, role } = useAuth();
  const isShelter = role === "Rescue Shelter";
  const [shelter, setShelter] = useState("");
  // Sorting by names
  const [sortBy, setSortBy] = useState("");
  console.log(animals);
  console.log(shelter);

  console.table(role);

  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    age: null,
    size: null,
    status: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getPet/${user ?? ""}`, {
        // Use nullish coalescing for user ID
        headers: {
          "ngrok-skip-browser-warning": "8888",
        },
        params: {
          user: user, // Include user ID for potential filtering on server-side
        },
      })
      .then(function (response) {
        const allPets = response.data.allPets;
        setAnimals(allPets);
        console.log(allPets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //etits
  const fetchFilteredPets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/filteredPets`,
        {
          headers: {
            "ngrok-skip-browser-warning": "8888",
          },
          params: {
            filters,
            shelterId: shelter,
          },
        }
      );

      let filteredPets = response.data.filteredPets;

      if (sortBy === "Ascending") {
        filteredPets = filteredPets.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sortBy === "Descending") {
        filteredPets = filteredPets.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      setAnimals(response.data.filteredPets);
    } catch (error) {
      console.error("Error fetching filtered pets:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "pet type") {
      filterType = "species";
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    fetchFilteredPets();
  }, [shelter, sortBy]);

  const handleApplyFilters = () => {
    fetchFilteredPets();
  };

  const handleChangeSortBy = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy((prevSortBy) => {
      if (selectedSortBy === "Ascending") {
        setAnimals(ascendingPets(animals));
      } else if (selectedSortBy === "Descending") {
        setAnimals(descendingPets(animals));
      }
      return selectedSortBy;
    });
  };

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

  const handleChangeShelter = (e) => {
    const selectedShelter = e.target.value;

    // TODO: Shelter change logic
    setShelter(selectedShelter);
    console.log(selectedShelter);
  };

  useEffect(() => {
    window.scrollTo(150, 1300);
  }, [currentPage]);

  // theme
  const theme = useTheme();

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
      <Box
        sx={{
          bgcolor: theme.palette.common.dirtyWhite,
          width: "100%",
          height: "100%",
          py: "64px",
        }}
      >
        <Container maxWidth="lg">
          <Container
            maxWidth="md"
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "32px",
              color: theme.palette.secondary.main,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              It’s My Pawssion!
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              Here is the list of animals in your shelter. You can add another
              rescue, update some of their information, or remove adopted pets
            </Typography>
          </Container>

          {/* Sort by, search, add / shelter component */}
          <OptionSection
            isShelter={isShelter}
            isLoggedIn={isLoggedIn}
            setAnimals={setAnimals}
            sortBy={sortBy}
            handleChangeSortBy={handleChangeSortBy}
            searchValue={searchValue}
            handleSearchInputChange={handleSearchInputChange}
            shelter={shelter}
            handleChangeShelter={handleChangeShelter}
          />

          {/* Filter Component */}
          <FilterOptions
            filters={filteredOptions}
            handleFilterChange={handleFilterChange}
            handleApplyFilters={handleApplyFilters}
          />

          {/* Display animal cards */}
          <DisplayAnimalCards
            isShelter={isShelter}
            isLoggedIn={isLoggedIn}
            currentAnimals={currentAnimals}
            setAnimals={setAnimals}
          />

          {/* Page Component */}
          <PageComponent
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AnimalsPawrent;

const OptionSection = ({
  sortBy,
  handleChangeSortBy,
  searchValue,
  handleSearchInputChange,
  shelter,
  handleChangeShelter,
}) => {
  const [allShelterOption, setAllShelterOption] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getShelterFilter`, {
        headers: {
          "ngrok-skip-browser-warning": "8888",
        },
      })
      .then(function (response) {
        const allShelter = response.data.allShelter;
        setAllShelterOption(allShelter);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
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
      <Grid
        item
        order={{ xs: 1, sm: 1, md: 1, lg: 2 }}
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchInput value={searchValue} onChange={handleSearchInputChange} />
      </Grid>
      <Grid item order={{ xs: 2, sm: 3, md: 3, lg: 3 }}>
        <SelectShelter
          shelters={allShelterOption}
          value={shelter}
          onChange={handleChangeShelter}
        />
      </Grid>
    </Grid>
  );
};

const DisplayAnimalCards = ({ currentAnimals, setAnimals }) => {
  return (
    <Grid
      container
      columnSpacing={3}
      rowGap={4}
      mt={4}
      sx={{
        alignItems: "center",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },
      }}
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
            md={4}
            lg={3}
            sx={{
              minWidth: "257px",
            }}
            component={motion.div}
            initial={{ opacity: 0, translateY: "100px" }}
            whileInView={{
              opacity: 1,
              translateY: 0,
              transition: {
                type: "fade",
                bounce: 0.4,
                duration: 0.8,
              },
            }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <PawrentCard
              animals={animal}
              height="auto"
              width="257px"
              setAnimals={setAnimals}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

const PageComponent = ({ count, page, onChange }) => {
  return (
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
        count={count}
        page={page}
        onChange={onChange}
        size="large"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        sx={{ mt: 2, justifyContent: "center" }}
      />
    </Box>
  );
};