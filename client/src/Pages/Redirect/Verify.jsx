// react and other components
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// custom components
import { VerifyButton } from "../../Components/Button/CustomButton";
import { StyledPaper } from "../../Components/Paper/StyledPaper";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

// icons and images
import topImage from "../../assets/images/top.png";
import logo from "../../assets/icons/SAS_Logo4.png";
import { PawrentIcon } from "../../assets/icons/RoleIcons/PawrentIcon";
import ShelterIcon from "../../assets/icons/RoleIcons/ShelterIcon";
import { loginSuccess } from "../../tools/authActions";
import { useDispatch } from "react-redux";

export default function Verify() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  axios
    .get(`${process.env.SERVER_URL}/verify?token=${token}`)
    .then(function (res) {
      console.log(res, token);
    })
    .catch(function (err) {
      console.log(err);
    });

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [role, setRole] = useState("");

  const handleClickOpen = (role) => {
    if (role === "Adoptive Pawrent") {
      setRole("Adoptive Pawrent");
    }
    if (role === "Rescue Shelter") {
      setRole("Rescue Shelter");
    }

    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // navigate router
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  const handleRoleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/verify?token=${token}`, {
        role,
      })
      .then((response) => {
        console.log("Response from POST request:", response.data);
        const splitString = response.data.updatedUser.role.split(" ");
        const role = splitString[1].toLowerCase();
        console.log(role);
        console.log(response.data.updatedUser);
        dispatch(
          loginSuccess(
            response.data.updatedUser.role,
            response.data.updatedUser._id
          )
        );
        console.log("login success");
        navigate(`/manage/${role}`);
      })
      .catch((error) => {
        console.error("Error in POST request:", error);
        navigate(`/login?role=${role}`);
      });
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-amber-500 to-orange-600 flex justify-center items-center relative h-screen">
        <div className="absolute">
          <Container sx={{ py: 10 }}>
            <div className="h-[12vh] relative border-[5px] rounded-[7px]">
              <img
                src={topImage}
                alt="top image"
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <img src={logo} alt="logo" className="h-[91px] w-[91px]" />
                <Typography
                  component="div"
                  variant="h3"
                  ml="22px"
                  color="white"
                >
                  SaveAStray
                </Typography>
              </div>
            </div>
            <StyledPaper sx={{ mt: 2 }}>
              <Typography variant="h3">
                Your Account Has Been Verified!
              </Typography>
              <Box width="600px">
                <Typography>
                  We're excited to have you onboard! Just one last question -
                  what describes your role on our website?
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "32px",
                }}
              >
                {/* Redirect user to login page with the role value */}
                <VerifyButton
                  onClick={() => handleClickOpen("Adoptive Pawrent")}
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      "& path": {
                        fill: "#EE7200",
                        stroke: "white",
                        strokeWidth: "4.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      },
                    },
                  }}
                >
                  <PawrentIcon sx={{ fontSize: "4.5rem" }} />
                  <Typography variant="body1Bold">Adoptive Pawrent</Typography>
                  <Typography variant="body1">
                    Adopts and cares for a pet from shelters
                  </Typography>
                </VerifyButton>
                <VerifyButton
                  onClick={() => handleClickOpen("Rescue Shelter")}
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      "& path": {
                        fill: "white",
                      },
                    },
                  }}
                >
                  <ShelterIcon
                    sx={{
                      fontSize: "4.5rem",
                    }}
                  />
                  <Typography variant="body1Bold">Rescue Shelter</Typography>
                  <Typography variant="body1">
                    Provides home and care to stray animals
                  </Typography>
                </VerifyButton>
              </Box>
              <RoleDialog
                open={openDialog}
                handleClose={handleClose}
                handleSubmit={handleRoleSubmit}
                role={role}
              />
            </StyledPaper>
          </Container>
        </div>
      </div>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoleDialog = ({ open, handleClose, handleSubmit, role }) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h5">{"Confirm Role Selection"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to select the role of {role}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
