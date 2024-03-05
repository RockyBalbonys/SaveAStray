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
    <>
      <Box sx={{ position: "relative" }}>
        <Badge
          sx={{ position: "absolute", top: "0px", left: "20px" }}
          badgeContent={animals.status}
          color={animals.status === "Available" ? "success" : "secondary"}
        />
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
              console.log("Card clicked! show modal");
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
              image={placeholder}
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
                console.log("Update clicked");
                setOpenUpdate(true);
              }}
            >
              Update
            </Button>
          </CardActions>
          <InformationModal
            open={open}
            onClose={handleClose}
            animal={animals}
          />
          <UpdateAnimalModal
            open={openUpdate}
            onClose={handleClose}
            animal={animals}
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
