import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Badge,
  Box,
} from "@mui/material";
import { useState } from "react";
import placeholder from "../../assets/icons/SAS_Logo4.png";
import ModalInfoPet from "../Modal/ModalInfoPet";
import ModalUpdatePet from "../Modal/ModalUpdatePet";
import BadgeAnimal from "../Badge/BadgeAnimal";

const AnimalCard = ({ animals, height, width, setAnimals }) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  console.log(animals);

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          "&:hover": {
            "& .MuiBadge-badge": {
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
            },
          },
        }}
      >
        <BadgeAnimal status={animals.status} />
        <Card
          sx={{
            height: height,
            width: width,
            background: "hsl(28, 77%, 88%)",
            padding: "12px",
            border: "2px solid #EE7200",
            borderRadius: "7px",
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
            },
          }}
          elevation={0}
        >
          <CardActionArea
            onClick={() => {
              setOpen(true);
            }}
            disableTouchRipple
            disableRipple
            sx={{
              "& .MuiCardActionArea-focusHighlight": {
                background: "transparent",
              },
            }}
          >
            <CardMedia
              image={
                !animals.photos || animals.photos.length === 0
                  ? placeholder
                  : animals.photos[0]
              }
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
                  animals.name.slice(0, 1).toUpperCase() +
                    animals.name.slice(1),
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
                width: "100%",
              }}
              onClick={() => {
                setOpenUpdate(true);
              }}
            >
              Update
            </Button>
          </CardActions>
          <ModalInfoPet open={open} onClose={handleClose} animal={animals} />
          <ModalUpdatePet
            open={openUpdate}
            onClose={handleClose}
            animal={animals}
            setAnimals={setAnimals}
          />
        </Card>
      </Box>
    </>
  );
};

export default AnimalCard;

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
