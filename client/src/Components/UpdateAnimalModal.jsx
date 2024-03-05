import {
  Modal,
  Paper,
  Typography,
  Box,
  Icon,
  Grid,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
} from "@mui/material";
import { AnimalImageCarousel } from "./CustomCarousel";
import animalPaw from "../assets/icons/animalPaw.svg";
import { InputField } from "./InputField";
import { useState, useEffect } from "react";
import { animalProps } from "../constants/animals";
import { AnimalProp } from "./AnimalProp";
import { UploadImage } from "./UploadImage";
import { AdoptionFeeInput } from "./CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const UpdateAnimalModal = ({ open, onClose, animal }) => {
  const [animalInfo, setAnimalInfo] = useState(animal);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (!open) {
      setAnimalInfo(animal);
      setUploadedImages([]);
    }
  }, [open, animal]);

  const handleChange = (e) => {
    setAnimalInfo((a) => ({
      ...a,
      [e.target.name]: e.target.value,
    }));
  };

  // TODO: Create logic for updating animal information
  const handleUpdateSaveAnimal = () => {
    console.log("Animal Updated");
    console.log(animal.name);
    console.log(animalInfo);
    const { _id, name, description, species, breed, sex, age, color, size, photos, price } = animalInfo
    axios.post('http://localhost:3001/api/updatePet', {
            _id,
            name,
            description,
            species,
            breed,
            sex,
            age,
            color,
            size,
            price
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    // Ensure only images are uploaded
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    // Ensure maximum of 4 images are uploaded
    const selectedImages = imageFiles.slice(0, 4 - uploadedImages.length);
    setUploadedImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  // Validation
  const isAnimalDataEmpty = Object.values(animalInfo).some(
    (value) => value === ""
  );
  const isImagesEmpty = uploadedImages.length === 0;
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
            <Grid container spacing={3} mb="32px">
              <Grid item xs={12} sm={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box>
                  <InputField onChange={handleChange} data={animalInfo} />
                  <AdoptionFee
                    value={animalInfo.price}
                    onChange={handleChange}
                    setAnimalInfo={setAnimalInfo}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} order={{ xs: 1, md: 2 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <UploadImage
                    onChange={handleUpload}
                    images={uploadedImages}
                    handleRemoveImage={handleRemoveImage}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} pb="32px">
              {animalProps.map((property, idx) => (
                <Grid item key={idx} xs={12} sm={4}>
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

          {/* Button Submit */}
          <Button
            disabled={isAnimalDataEmpty || isImagesEmpty}
            type="submit"
            onClick={handleUpdateSaveAnimal}
            variant="contained"
            sx={{
              color: "white",
              width: "100%",
              borderRadius: 0,
              py: "12px",
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default UpdateAnimalModal;

function AdoptionFee({ value, setAnimalInfo }) {
  const handleChangePrice = (e) => {
    const newPrice = e.target.value.trim(); // Remove leading and trailing whitespace

    // If the new price is empty or not a number, set it to 0
    if (newPrice === "" || isNaN(newPrice)) {
      setAnimalInfo((prevAnimalInfo) => ({
        ...prevAnimalInfo,
        price: 0,
      }));
    } else {
      // Remove leading zeros if present
      const formattedPrice = parseFloat(newPrice).toString();
      setAnimalInfo((prevAnimalInfo) => ({
        ...prevAnimalInfo,
        price: formattedPrice,
      }));
    }
  };
  return (
    <>
      <Paper
        sx={{
          bgColor: "#FFFFFF",
          borderRadius: "7px",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "16px",
          }}
        >
          <InputLabel htmlFor="adoption-fee" sx={{ color: "#2F4858" }}>
            Adoption Fee
          </InputLabel>
          <Input
            id="adoption-fee"
            value={value}
            onChange={handleChangePrice}
            name="price"
            startAdornment={
              <InputAdornment position="start">PHP</InputAdornment>
            }
            sx={{
              width: "40%",
              "& .MuiInputBase-input[type='text']": {
                paddingRight: 0,
              },
              fontWeight: "700",
              fontSize: "24px",
              color: "#2F4858",
            }}
          />
        </Box>
      </Paper>
    </>
  );
}
