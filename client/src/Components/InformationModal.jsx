import { Modal, Paper, Typography, Box, Icon, FormControl, InputLabel, Select, MenuItem, Button, Grid, IconButton } from "@mui/material";
import { AnimalImageCarousel } from "./CustomCarousel";
import animalPaw from "../assets/icons/animalPaw.svg";
import { useState } from "react";
import placeholder from "../assets/icons/SAS_Logo4.png";
import CloseIcon from "@mui/icons-material/Close";

const InformationModal = ({ open, onClose, animal }) => {
  const { imageCollection } = animal;

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
        "& .MuiPaper-root": {
          width: {
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "70%",
            xl: "50%",
          },
          overflowY: "auto",
          scrollbarWidth: "none", 
          "&::-webkit-scrollbar": {
            display: "none", 
          },
          "&-ms-overflow-style:": {
            display: "none", 
          },
          maxHeight: "80%",
        },
      }}
    >
      <Paper sx={{position: 'relative'}}>
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
        <Box sx={{padding: '32px 48px 0px 48px'}}>
          <Grid container spacing={3} mb={4} justifyContent='center'>
            {/* xs = flip phone, sm = mobile, md = tablet, lg = desktop, xl = widescreen */}
            <Grid item xs={12} md={6} order={{xs: 2, md: 1 }}>
              <Box>
                  <Typography variant="h6" fontWeight={600} component="p">
                    {animal.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={300}>
                    {animal.description}
                  </Typography>
                  {/* Adoption Fee */}
                  <Paper sx={{ marginTop: '16px', textAlign: 'center', padding: '16px', width: '100%'}}>
                    <Typography variant="body2" fontWeight={300}>
                      Adoption Fee
                    </Typography>
                    <Typography variant="h6" fontWeight={600} component="p">
                      PHP {animal.price}.00
                    </Typography>
                  </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{xs: 1, md: 2 }}>
              {/* Animal Image */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  
              
                }}
              >
                <div>
                  <img
                    src={placeholder}
                    alt="placeholder"
                    className="min-h_[200px] bg-cover bg-center"
                  />
                </div>
              </Box>
            </Grid>
          </Grid>

          {/* Animal Properties */}
          <Grid container spacing={2}>
            {animalProperties.map((property, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AnimalFoo property={property} values={animal[isPetTypeTernary(property)]} />
              </Grid>
            ))}
          </Grid>
        </Box>
  

        {/* Close Button */}
        <Button variant="contained" onClick={onClose} sx={{ width: '100%', marginTop: '16px',py:'12px', color: 'white'}}>Close Animal Information</Button>
      </Paper>
    </Modal>
  );
};

export default InformationModal;

const isPetTypeTernary = (property) => property  === 'Pet Type' ? 'species' : property.toLowerCase();

const animalProperties = ["Pet Type", "Breed", "Sex", "Age", "Color", "Size"];

function AnimalFoo({ property, values }) {

  return (
    <Box sx={{ width: '100%', padding: '16px', border: '1px solid #EE7200', borderRadius: '7px' }}>
     
        <Icon>
          <img src={animalPaw} />
        </Icon>
        {/* Animal Property value */}
        <Typography variant="body1" fontWeight={600} component="p">
          {property}
        </Typography>
        <Typography variant="body1" fontWeight={300}>
          {values}
        </Typography>
      
    </Box>
  );
}

