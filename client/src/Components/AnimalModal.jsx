import { Modal, Paper, Typography, Box, Icon } from "@mui/material";
import { AnimalImageCarousel } from "./CustomCarousel";
import animalPaw from "../assets/icons/animalPaw.svg";

const AnimalModal = ({ open, onClose, animal }) => {
  const { imageCollection } = animal;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="animal-modal-title"
        aria-describedby="animal-modal-description"
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
          <AnimalImageCarousel animalImages={imageCollection} />
          <Box sx={{ padding: "32px 48px" }}>
            <Typography variant="h6" fontWeight={600} component="p">
              {animal.name}
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {animal.description}
            </Typography>
          </Box>

          {/* TODO: Create boxes of animal properties and apply 
          DRY (do not repeat yourself), use map method and iterate animalProperties */}
          <AnimalFoo />
        </Paper>
      </Modal>
    </>
  );
};

export default AnimalModal;

const animalProperties = ["Pet Type", "Breed", "Sex", "Age", "Color", "Size"];

function AnimalFoo(props) {
  return (
    // TODO: Spacing between icon and animal property
    <Paper sx={{ p: "16px" }}>
      <Icon>
        <img src={animalPaw} />
      </Icon>
      {/* Animal Property */}
      <Typography></Typography>

      {/* Animal Property value */}
      <Typography></Typography>
    </Paper>
  );
}
