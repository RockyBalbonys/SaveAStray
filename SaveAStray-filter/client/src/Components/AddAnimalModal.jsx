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
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import animalPaw from "../assets/icons/animalPaw.svg";
import { animalProps } from "../constants/animals";
import { AnimalNameInput, AnimalDescInput } from "./CustomInput";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

//TODO: add image structure
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

const AddAnimalModal = ({ open, onClose }) => {
  const [animalData, setAnimalData] = useState({
    name: "",
    description: "",
    species: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    size: "",
  });

  // TODO: uploading images
  const handleSubmitAnimal = async (event) => {
    event.preventDefault();

    const { name, description, species, breed, sex, age, color, size } =
      animalData;
    try {
      const response = await axios.post("http://localhost:3001/api/addAnimal", {
        name,
        description,
        species,
        breed,
        sex,
        age,
        color,
        size,
      });
      const petId = response.data.petId;
      if (petId) {
        uploadedImages.forEach(async (imageFile) => {
          const storageRef = ref(storage, `pets/${petId}/${imageFile.name}`);
          try {
            const snapshot = await uploadBytes(storageRef, imageFile);
            console.log("Uploaded a blob or file!", snapshot);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Data of images - array
  const [uploadedImages, setUploadedImages] = useState([]);

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
      <Paper>
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
          sx={{ color: "white", width: "100%", borderRadius: 0, py: "12px" }}
        >
          Add Animal
        </Button>
      </Paper>
    </Modal>
  );
};

export default AddAnimalModal;

const InputField = ({ onChange }) => {
  return (
    <>
      <Stack direction="column">
        <AnimalNameInput
          name="name"
          onChange={onChange}
          placeholder="Animal Name"
          aria-label="animal name"
          inputProps={{ maxLength: 150 }}
          required
        />
        <AnimalDescInput
          name="description"
          onChange={onChange}
          placeholder="Add description here... (600 characters max including whitespace)"
          aria-label="animal description"
          multiline
          rows={15}
          inputProps={{ maxLength: 600 }}
          required
        />
      </Stack>
    </>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadImage = ({ onChange, images, handleRemoveImage }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <IconButton
          component="label"
          aria-label="upload image"
          sx={{
            tabIndex: -1,
            border: "1px solid",
            width: "100%",
            height: "100%",
            borderRadius: "7px",
            border: "1px solid #FF8210",
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "5rem" }} />
          <VisuallyHiddenInput type="file" onChange={onChange} required />
        </IconButton>
        <Button
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          onClick={() => setIsDialogOpen(true)}
        >
          Edit
        </Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Box
          sx={{
            p: "1rem",
            width: {
              xs: "90vw",
              sm: "50vw",
              md: "30vw",
            },
            height: "50vh",
          }}
        >
          <Typography fontWeight={600}>Files Uploaded</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80%",
            }}
          >
            {images.length === 0 ? (
              <Typography textAlign="center" justifySelf="center" width="100%">
                None
              </Typography>
            ) : (
              <List>
                {images.map((image, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="body2">{image.name}</Typography>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const AnimalProp = ({ prop, options, setFormData, formData }) => {
  return (
    <>
      <Box
        sx={{
          p: "16px",
          border: "1px solid rgba(238, 114, 0, 0.50)",
          borderRadius: "7px",
        }}
      >
        <Icon>
          <img src={animalPaw} alt="icon" />
        </Icon>
        <Typography variant="body2" fontWeight={700}>
          {prop}
        </Typography>
        {renderInputOrSelection(prop, options, setFormData, formData)}
      </Box>
    </>
  );
};

const renderInputOrSelection = (prop, options, setFormData, formData) => {
  if (prop === "Breed" || prop === "Color") {
    const handleInputPropChange = (e) => {
      setFormData((a) => ({
        ...a,
        [e.target.name]: e.target.value,
      }));
    };
    return (
      <InputBase
        required
        value={formData[prop.toLowerCase()]}
        name={prop.toLowerCase()}
        onChange={handleInputPropChange}
        sx={{
          fontSize: "16px",
          "& .MuiInputBase-input": {
            pr: 0,
          },
        }}
        placeholder={`Enter ${prop}`}
        fullWidth
      />
    );
  } else {
    return (
      <SelectionProp
        propName={prop}
        menuItems={options}
        setFormData={setFormData}
        formData={formData}
      />
    );
  }
};

function SelectionProp({ menuItems, setFormData, formData, propName }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectPropChange = (e) => {
    setSelectedValue(e.target.value);
    setFormData((a) => ({
      ...a,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        value={selectedValue}
        required
        name={propName === "Pet Type" ? "species" : propName.toLowerCase()}
        displayEmpty
        onChange={handleSelectPropChange}
        input={<InputBase />}
        notched="true"
        sx={{ fontSize: "16px", fontWeight: 300 }}
      >
        <MenuItem disabled value="" sx={{ fontSize: "14px" }}>
          Select
        </MenuItem>
        {menuItems.map((item, idx) => (
          <MenuItem value={item} key={idx} sx={{ fontSize: "14px" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
