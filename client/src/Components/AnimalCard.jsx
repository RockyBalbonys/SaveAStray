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

const AnimalCard = ({ animals, height, width }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
      }}
    >
      <CardActionArea
        onClick={() => {
          console.log("Card clicked! show modal");
          setOpen(true);
        }}
      >
        <CardMedia
          image={animals.image}
          sx={{ height: "220px", objectFit: "contain" }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography
            textAlign="center"
            variant="h6"
            fontWeight={600}
            color="primary"
          >
            {animals.name}
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
          }}
          onClick={() => {
            console.log("Update clicked");
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
          }}
          onClick={() => {
            console.log("Adopted clicked");
          }}
        >
          Adopted
        </Button>
      </CardActions>
      <AnimalModal open={open} onClose={handleClose} animal={animals} />
    </Card>
  );
};

export default AnimalCard;
