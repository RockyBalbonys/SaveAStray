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
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(placeholder);

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
        }}
      >
        {/* <IconButton
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
        </IconButton> */}
        <div>
          <img
            src={placeholder}
            alt="placeholder"
            className="min-h-[200px] bg-cover bg-center"
          />
        </div>

        <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
          <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
          <Button
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
