import React from 'react';
import { Modal, Paper, Typography, Box, IconButton, Button, Grid, Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import animalPaw from '../../assets/icons/animalPaw.svg';
import placeholder from '../../assets/icons/SAS_Logo4.png';

const ModalInfoPet = ({ open, onClose, animal }) => {
  const navigate = useNavigate();

  const handleInquireAdoptionClick = () => {
    console.log('Inquire Adoption button clicked');
    if (PawrentIsLoggedIn) {
      console.log('Pawrent is logged in, navigating to /questionnaire');
      navigate("/questionnaire");
    } else if (ShelterIsLoggedIn) {
      console.log('Shelter is logged in, hiding the Inquire Adoption button');
      // The button will be hidden by not rendering it in the return statement
    } else {
      console.log('No one is logged in, navigating to /login');
      navigate("/login");
    }
  };

  const { imageCollection } = animal;

  const PawrentIsLoggedIn = true;
  const ShelterIsLoggedIn = false;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="animal-modal-title"
      aria-describedby="animal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          position: "relative",
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
          backgroundColor: "#FAFAFB",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            bgcolor: "rgba(238, 114, 0, 0.50)",
            borderRadius: 0,
            color: "#FFFFFF",
          }}
          disableFocusRipple
          disableRipple
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ padding: "32px 48px 0px 48px" }}>
          <Grid container spacing={3} mb={4} justifyContent="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box sx={{ color: "#2F4858" }}>
                <Typography variant="h6" fontWeight={600} component="p">
                  {animal.name.slice(0, 1).toUpperCase() + animal.name.slice(1)}
                </Typography>
                <Typography variant="body2" fontWeight={300}>
                  {animal.description}
                </Typography>
                <Paper
                  sx={{
                    marginTop: "16px",
                    textAlign: "center",
                    padding: "16px",
                    borderRadius: "7px",
                    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={300}
                    sx={{ color: "#2F4858" }}
                  >
                    Adoption Fee
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    component="p"
                    sx={{ color: "#2F4858" }}
                  >
                    PHP {animal.price}.00
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleInquireAdoptionClick}
                    sx={{ width: "100%", maxWidth: "120%", marginTop: "16px", py: "12px", color: "white", backgroundColor: "#EA7200" }}
                  >
                    Inquire Adoption
                  </Button>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={
                      !animal.photos || animal.photos.length === 0
                        ? placeholder
                        : animal.photos[0]
                    }
                    alt="placeholder"
                    className="min-h_[200px] bg-cover bg-center"
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {animalProperties.map((property, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AnimalFoo
                  property={property}
                  values={animal[isPetTypeTernary(property)]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ width: "100%", marginTop: "16px", py: "12px", color: "white" }}
        >
          Close Animal Information
        </Button>
      </Paper>
    </Modal>
  );
};

const isPetTypeTernary = (property) =>
  property === "Pet Type" ? "species" : property.toLowerCase();

const animalProperties = ["Pet Type", "Breed", "Sex", "Age", "Color", "Size"];

function AnimalFoo({ property, values }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        border: "0.5px solid rgba(238, 114, 0, 0.50)",
        borderRadius: "7px",
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
      }}
    >
      <Icon>
        <img src={animalPaw} alt="Animal Paw" />
      </Icon>
      <Typography variant="body1" fontWeight={600} component="p">
        {property}
      </Typography>
      <Typography variant="body1" fontWeight={300}>
        {values}
      </Typography>
    </Box>
  );
}

export default ModalInfoPet;
