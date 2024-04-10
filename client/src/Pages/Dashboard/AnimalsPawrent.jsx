// react and other functions
import React, { useEffect, useState } from "react";
import axios from "axios";

// mui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// constant datas
import { filteredOptions } from "../../constants/animals";

// sorting logic
import { ascendingPets, descendingPets } from "../../constants/sortLogic";

// custom components
import { FilterOptions } from "../../Components/FilterOptions";
import { SelectShelter } from "../../Components/SelectShelter";
import Footer from "../../Components/PageComponent/Footer";
import PawrentCard from "../../Components/Card/PawrentCard";
import { SortByButton } from "../../Components/SortByButton";
import { SearchInput } from "../../Components/SearchInput";

// icons and images
import animalHero from "../assets/images/animals/animalHero.png";

const AnimalsPawrent = () => {
  const { isLoggedIn, user, role } = useAuth();
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
      .get(`${process.env.REACT_APP_SERVER_URL}/getPet/${user}`,{
        params: {
          user: user
        }})
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
        `${process.env.REACT_APP_SERVER_URL}/api/filteredPets`,
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

  // Select shelter
  const [shelter, setShelter] = useState("");

  const handleChangeShelter = (e) => {
    const selectedShelter = e.target.value;

    // TODO: Shelter change logic
    setShelter(selectedShelter);
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
        <Content />
        <OptionSection
          sortBy={sortBy}
          handleChangeSortBy={handleChangeSortBy}
          searchValue={searchValue}
          handleSearchInputChange={handleSearchInputChange}
          shelter={shelter}
          handleChangeShelter={handleChangeShelter}
        />
        <FilterOptions
          filters={filteredOptions}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
        />
        <DisplayAnimalCards
          currentAnimals={currentAnimals}
          setAnimals={setAnimals}
        />
      </Container>
      <Footer />
    </>
  );
};

export default AnimalsPawrent;

const Content = () => {
  return (
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
        Here is the list of animals in your shelter. You can add another rescue,
        update some of their information, or remove adopted pets
      </Typography>
    </Container>
  );
};

// TODO: Select shelter
const OptionSection = ({
  sortBy,
  handleChangeSortBy,
  searchValue,
  handleSearchInputChange,
  shelter,
  handleChangeShelter,
}) => {
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
        <SelectShelter value={shelter} onChange={handleChangeShelter} />
      </Grid>
    </Grid>
  );
};

const DisplayAnimalCards = ({ currentAnimals, setAnimals }) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={4} mt={4} alignItems="center">
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
