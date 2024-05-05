import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Grid } from "@mui/material";

const CustomCarousel = ({ itemList }) => {
  const [sliderItems, setSliderItems] = useState(getInitialSliderItems());

  useEffect(() => {
    function handleResize() {
      setSliderItems(getInitialSliderItems());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getInitialSliderItems() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      // Mobile
      return 1;
    } else if (screenWidth < 960) {
      // Tablet
      return 2;
    } else {
      // Desktop and wide screens
      return 3;
    }
  }

  const items = [];

  for (let i = 0; i < itemList.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Box key={i.toString()}>
          <Grid
            container
            spacing={2}
            className="BannerGrid"
            justifyContent="center"
            alignItems="center"
            padding={4}
            flexWrap="no-wrap"
            display="flex"
            height="100%"
            sx={{
              cursor: "pointer",
            }}
          >
            {itemList.slice(i, i + sliderItems).map((da, index) => {
              return <Item key={index.toString()} item={da} />;
            })}
          </Grid>
        </Box>
      );
    }
  }
  return (
    <Carousel
      animation="slide"
      autoPlay={true}
      cycleNavigation
      timeout={300}
      swipe={true}
      navButtonsAlwaysVisible
      height="45vh"
    >
      {items}
    </Carousel>
  );
};

export default CustomCarousel;

function Item({ item }) {
  return (
    <Grid item xs={12} sm={4} md={4} height="100%">
      <Paper elevation={6}>
        <img src={item.image} alt={item.title} />
      </Paper>
    </Grid>
  );
}

export function AnimalImageCarousel({ animalImages }) {
  const sliderItems = animalImages.length > 3 ? 3 : animalImages.length;
  const items = [];

  for (let i = 0; i < animalImages.length; i++) {
    if (i % sliderItems === 0) {
      items.push(
        <div key={i.toString()} className="flex ">
          {animalImages.slice(i, i + sliderItems).map((da, index) => {
            return (
              <div className="min-h-[35vh] overflow-hidden" key={index}>
                <img
                  key={index.toString()}
                  src={da}
                  alt={da}
                  className="object-contain h-full"
                />
              </div>
            );
          })}
        </div>
      );
    }
  }
  return (
    <>
      <Carousel
        autoPlay={false}
        animation="slide"
        cycleNavigation={true}
        indicators={false}
        height="30vh"
      >
        {items}
      </Carousel>
    </>
  );
}
