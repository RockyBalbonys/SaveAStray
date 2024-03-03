import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import AnimalModal from "./AnimalModal";
import UpdateAnimalModal from "./UpdateAnimalModal";
import placeholder from "../assets/icons/SAS_Logo4.png";
import InformationModal from "./InformationModal";

const AnimalCard = ({ animals, height, width }) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  return (
    <Card
      sx={{
        height: height,
        width: width,
        background: "hsl(28, 77%, 88%)",
        padding: "12px",
        border: "2px solid #EE7200",
        borderRadius: "7px",
        "&:hover": {},
      }}
    >
      <CardActionArea
        onClick={() => {
          console.log("Card clicked! show modal");
          setOpen(true);
        }}
        disableTouchRipple
        disableRipple
      >
        <CardMedia
          image={animals.photos[0]}
          sx={{ height: "220px", objectFit: "contain" }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography
            textAlign="center"
            variant="h6"
            fontWeight={600}
            color="primary"
          >
            {truncateString(
              animals.name.slice(0, 1).toUpperCase() + animals.name.slice(1),
              12
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: "white",
            fontWeight: "300",
            fontSize: "14px",
            paddingX: "25px",
            textTransform: "none",
          }}
          onClick={() => {
            console.log("Update clicked");
            setOpenUpdate(true);
          }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontWeight: "300",
            fontSize: "14px",
            paddingX: "21px",
            background: "white",
            textTransform: "none",
          }}
          // onClick={() => {
          //   console.log("Adopted clicked");
          // }}
        >
          Adopted
        </Button>
      </CardActions>
      <InformationModal open={open} onClose={handleClose} animal={animals} />
      <UpdateAnimalModal
        open={openUpdate}
        onClose={handleClose}
        animal={animals}
      />
    </Card>
  );
};

export default AnimalCard;

function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);
