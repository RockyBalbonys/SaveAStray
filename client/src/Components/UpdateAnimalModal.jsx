import { Modal, Paper, Typography, Box, Icon, Grid } from "@mui/material";
import { AnimalImageCarousel } from "./CustomCarousel";
import animalPaw from "../assets/icons/animalPaw.svg";
import { InputField } from "./InputField";
import { useState } from "react";
import { animalProps } from "../constants/animals";
import { AnimalProp } from "./AnimalProp";

const UpdateAnimalModal = ({ open, onClose, animal }) => {
  const [animalInfo, setAnimalInfo] = useState(animal);

  console.log({ animalInfo });

  const handleChange = (e) => {
    setAnimalInfo((a) => ({
      ...a,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="animal-update-modal-title"
        aria-describedby="animal-update-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          "& .MuiPaper-root": {
            width: {
              xs: "90%",
              sm: "80%",
              md: "70%",
              lg: "70%",
              xl: "50%",
            },
            overflowY: "auto",
            scrollbarWidth: "none", // Hide the scrollbar for firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
            "&-ms-overflow-style:": {
              display: "none", // Hide the scrollbar for IE
            },
            maxHeight: "80%",
          },
        }}
      >
        <Paper>
          <Box sx={{ padding: "32px 48px 0px 48px" }}>
            <Grid container spacing={3} mb="32px">
              <Grid item xs={12} sm={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box>
                  <InputField onChange={handleChange} data={animalInfo} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} order={{ xs: 1, md: 2 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    bgcolor: "gray",
                  }}
                >
                  <Typography>Image Placeholder</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} pb="32px">
              {animalProps.map((property, idx) => (
                <Grid key={idx} xs={12} sm={4} item>
                  <AnimalProp
                    prop={property.propType}
                    options={property.options}
                    onChange={handleChange}
                    formData={animalInfo}
                    setFormData={setAnimalInfo}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default UpdateAnimalModal;
