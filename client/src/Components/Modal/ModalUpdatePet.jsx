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
import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarAnimal from "../Snackbar/SnackbarAnimal";
import { InputField } from "../Input/InputField";
import { useState, useEffect } from "react";
import { animalProps } from "../../constants/animals";
import { AnimalProp } from "../AnimalProp";
import { UploadImage } from "../UploadImage";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ModalUpdatePet = ({ open, onClose, animal, setAnimals }) => {
  const [animalInfo, setAnimalInfo] = useState(animal);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

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

  const handleUpdateSaveAnimal = async () => {
    console.log("Animal Updated");
    console.log(animal.name);
    console.log(animalInfo);
    const {
      _id,
      name,
      description,
      species,
      breed,
      sex,
      age,
      color,
      size,
      photos,
      price,
      status,
    } = animalInfo;

    try {
      setLoadingButton(true);
      // Update the pet information
      const res = await axios.post("http://localhost:3001/api/updatePet", {
        _id,
        name,
        description,
        species,
        breed,
        sex,
        age,
        color,
        size,
        price,
        status,
      });
      console.log(res);

      // After successfully updating the pet, fetch the updated list of pets
      const response = await axios.get("http://localhost:3001/getPet");
      const allPets = response.data.allPets;
      setAnimals(allPets);

      setOpenSnackbar(true);

      // Close the snackbar after 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Reset loading state and close the snackbar
      setLoadingButton(false);
      handleCloseSnackbar();
    } catch (err) {
      console.log(err);
      // Handle error if necessary
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Ensure only images are uploaded
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // Ensure maximum of 4 images are uploaded
    const selectedImages = imageFiles.slice(0, 4 - uploadedImages.length);

    // Resize each selected image and log size before and after resizing
    const resizedImages = await Promise.all(
      selectedImages.map(async (file) => {
        const originalSize = getFileSize(file);
        console.log("Original Size (bytes):", originalSize);

        const resizedImage = await resizeImage(file);
        const resizedSize = getFileSize(resizedImage);
        console.log("Resized Size (bytes):", resizedSize);

        return resizedImage;
      })
    );

    // Update state with resized images
    setUploadedImages((prevImages) => [...prevImages, ...resizedImages]);
  };

  // Function to get file size in bytes
  const getFileSize = (file) => {
    return file.size; // Returns the size of the file in bytes
  };

  // Function to resize an image
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: "image/jpeg", // Adjust the type as needed
            });
            resolve(resizedFile);
          }, "image/jpeg"); // Adjust the format as needed
        };
      };
    });
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

  // Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
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
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <InputField
                    onChange={handleChange}
                    data={animalInfo}
                    sx={{ flexGrow: 1 }}
                  />
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
                    data={animalInfo}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} pb="32px">
              {animalProps.map((property, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
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
          <LoadingButton
            disabled={isAnimalDataEmpty}
            loading={!!loadingButton}
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
          </LoadingButton>
          <SnackbarAnimal
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message={`${animal.name} has been successfully updated.`}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default ModalUpdatePet;

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
