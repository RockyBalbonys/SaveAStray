import React from "react";
import animalHero from "../assets/images/animals/animalHero.png";
import { Container, Grid, Typography } from "@mui/material";
import AnimalCard from "../Components/AnimalCard";
import { mockAnimals } from "../constants/animals";
import Footer from "../Components/Footer";

const Animals = () => {
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
      <Container maxWidth="lg" sx={{ my: "64px", border: "1px solid" }}>
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

        <Grid container columnSpacing={3} rowSpacing={4}>
          {mockAnimals.map((animal, idx) => (
            <Grid key={idx} item xs={3}>
              <AnimalCard
                animals={animal}
                height="fit-content"
                width="fit-content"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Animals;
