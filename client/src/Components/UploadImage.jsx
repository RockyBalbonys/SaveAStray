import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import placeholder from "../assets/icons/SAS_Logo4.png";

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

export const UploadImage = ({
  onChange,
  images,
  handleRemoveImage,
  isAddingNew,
  data,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { photos } = data;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "border 0.3s ease",
          border: "2px solid transparent",
          borderRadius: "7px",
          "&:hover": {
            border: `2px solid grey`,
          },
          overflow: "hidden",
        }}
      >
        <div className="flex justify-center items-center overflow-hidden h-full">
          {images.length > 0 ? (
            // Show uploaded image if there are images
            <img
              src={URL.createObjectURL(images[images.length - 1])}
              alt="Uploaded"
              className="h-full object-contain bg-center"
            />
          ) : photos && photos.length > 0 ? (
            // Show existing image if available
            <img
              src={photos[0]}
              alt="Existing"
              className="h-full object-contain bg-center"
            />
          ) : (
            // Show placeholder image if no images
            <img
              src={placeholder}
              alt="Placeholder"
              className="h-full object-contain bg-center"
            />
          )}
        </div>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            columnGap: "5px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: "primary",
              padding: 0,
              fontSize: "14px",
              bgcolor: "white",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "primary",
              padding: 0,
              fontSize: "14px",
              bgcolor: "white",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
          >
            Add
            <VisuallyHiddenInput
              id="fileInput"
              type="file"
              onChange={onChange}
              required
            />
          </Button>
        </Box>
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
