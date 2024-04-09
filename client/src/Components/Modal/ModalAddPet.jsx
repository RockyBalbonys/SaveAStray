import {
  Box,
  Grid,
  IconButton,
  Modal,
  Paper,
  Button,
  Snackbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState, useEffect } from "react";
import { animalProps } from "../../constants/animals";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { InputField } from "../Input/InputField";
import { AnimalProp } from "../AnimalProp";
import { UploadImage } from "../UploadImage";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarAnimal from "../Snackbar/SnackbarAnimal";
import useAuth from "../../hooks/useAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAOyv2nyCcsDK0avw1qurZW1dapftwz5TA",
  authDomain: "save-a-stray-40e56.firebaseapp.com",
  projectId: "save-a-stray-40e56",
  storageBucket: "save-a-stray-40e56.appspot.com",
  messagingSenderId: "767492186893",
  appId: "1:767492186893:web:e9e9ef6c165e144c9a4644",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ModalAddPet = ({
  open,
  onClose,
  defaultAnimal,
  defaultImage,
  setAnimals,
}) => {
  const [animalData, setAnimalData] = useState(defaultAnimal);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { isLoggedIn, user, role } = useAuth();

  useEffect(() => {
    if (!open) {
      setAnimalData(defaultAnimal);
      setUploadedImages(defaultImage);
    }
  }, [open, defaultAnimal, defaultImage]);

  const handleSubmitAnimal = async (event) => {
    event.preventDefault();

    const { name, description, species, breed, sex, age, color, size } =
      animalData;
    const shelter = user
    try {
      setLoadingButton(true);
      const animalDataWithImages = {
        name,
        description,
        species,
        breed,
        sex,
        age,
        color,
        size,
        photos: [],
        shelter
      };

      // Upload images and get download URLs
      await Promise.all(
        uploadedImages.map(async (imageFile) => {
          const storageRef = ref(storage, `pets/${imageFile.name}`);
          try {
            const snapshot = await uploadBytes(storageRef, imageFile);
            console.log("Uploaded a blob or file!", snapshot);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(downloadURL);
            animalDataWithImages.photos.push(downloadURL);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        })
      );

      console.log("Animal Data with Images:", animalDataWithImages);
      // Send data and images in a single request
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/addAnimal`,
          animalDataWithImages
      );

      // After successfully adding the new pet, fetch the updated list of pets
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getPet/${user}`,{
        params: {
          user: user
        }
      });
      const allPets = response.data.allPets;
      setAnimals(allPets);

      setOpenSnackbar(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoadingButton(false);
      handleCloseSnackbar();
    } catch (error) {
      console.error(error);
    }
  };

  const [uploadedImages, setUploadedImages] = useState(defaultImage);

  const handleChange = (e) => {
    setAnimalData((a) => ({
      ...a,
      [e.target.name]: e.target.value,
    }));
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
  const isAnimalDataEmpty = Object.values(animalData).some(
    (value) => value === ""
  );
  const isImagesEmpty = uploadedImages.length === 0;

  // Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-animal-modal-title"
      aria-describedby="add-animal-modal-description"
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
      <Paper sx={{ position: "relative" }}>
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
        <Box sx={{ p: "32px 48px 0px 48px" }}>
          <Grid container spacing={3} mb="32px">
            <Grid item xs={12} sm={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box>
                <InputField onChange={handleChange} data={animalData} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} order={{ xs: 1, md: 2 }}>
              <UploadImage
                onChange={handleUpload}
                images={uploadedImages}
                handleRemoveImage={handleRemoveImage}
                data={animalData}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} pb="32px">
            {animalProps.map((property, idx) => (
              <Grid key={idx} xs={12} sm={4} item>
                <AnimalProp
                  prop={property.propType}
                  options={property.options}
                  onChange={handleChange}
                  formData={animalData}
                  setFormData={setAnimalData}
                  isAdd={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Button Submit */}
        <LoadingButton
          disabled={!!isAnimalDataEmpty}
          type="submit"
          loading={!!loadingButton}
          onClick={handleSubmitAnimal}
          variant="contained"
          sx={{
            color: "white",
            width: "100%",
            borderRadius: 0,
            py: "12px",
            textTransform: "none",
          }}
        >
          Add Animal
        </LoadingButton>
        <SnackbarAnimal
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={"New pet has been successfully added."}
        />
      </Paper>
    </Modal>
  );
};

export default ModalAddPet;
