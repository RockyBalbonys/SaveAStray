import { Modal, Paper, Typography, Box, Icon } from "@mui/material";
import { AnimalImageCarousel } from "./CustomCarousel";
import animalPaw from "../assets/icons/animalPaw.svg";

const UpdateAnimalModal = ({ open, onClose, animal }) => {
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
          "& .MuiPaper-root": {
            width: "50%",
            overflowY: "auto",
            maxHeight: "80%",
          },
        }}
      >
        <Paper>
          {/* <AnimalImageCarousel animalImages={imageCollection} /> */}
          <Box sx={{ padding: "32px 48px" }}>
            <Typography variant="h6" fontWeight={600} component="p">
              {animal.name}
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {animal.description}
            </Typography>
          </Box>
          {/* <AnimalFoo /> */}
        </Paper>
      </Modal>
    </>
  );
};

export default UpdateAnimalModal;
