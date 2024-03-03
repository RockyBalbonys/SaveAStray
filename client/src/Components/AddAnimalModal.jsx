import {
  Box,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { animalProps } from "../constants/animals";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { InputField } from "./InputField";
import { AnimalProp } from "./AnimalProp";
import { UploadImage } from "./UploadImage";
import CloseIcon from "@mui/icons-material/Close";

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

const AddAnimalModal = ({ open, onClose, defaultAnimal, defaultImage }) => {
  const [animalData, setAnimalData] = useState(defaultAnimal);
  const [downloadURLs, setDownloadURLs] = useState([]);

  useEffect(() => {
    if (!open) {
      setAnimalData(defaultAnimal);
      setUploadedImages(defaultImage);
    }
  }, [open, defaultAnimal, defaultImage]);
  
 const handleSubmitAnimal = async (event) => {
    event.preventDefault();
  
    const { name, description, species, breed, sex, age, color, size } = animalData;
    
    try {
        const animalDataWithImages = {
            name,
            description,
            species,
            breed,
            sex,
            age,
            color,
            size,
            photos: []
        };
  
        // Upload images and get download URLs
        await Promise.all(uploadedImages.map(async (imageFile) => {
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
        }));
        
        console.log("Animal Data with Images:", animalDataWithImages);
        
        // Send data and images in a single request
        await axios.post("http://localhost:3001/api/addAnimal", animalDataWithImages);
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

  console.log({ animalData, uploadedImages });

  // Validation
  const isAnimalDataEmpty = Object.values(animalData).some(
    (value) => value === ""
  );
  const isImagesEmpty = uploadedImages.length === 0;

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
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Button Submit */}
        <Button
          disabled={isAnimalDataEmpty || isImagesEmpty}
          type="submit"
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
        </Button>
      </Paper>
    </Modal>
  );
};

export default AddAnimalModal;
