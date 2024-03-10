import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import Background from "../Components/Background";
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import topImage from "../assets/images/passive2.png";
import logo from "../assets/icons/SAS_Logo4.png";
import { VerifyButton } from "../Components/Button/CustomButton";
import SvgIcon from "@mui/material/SvgIcon";
import { StyledPaper } from "../Components/Paper/StyledPaper";
import { Link as RouterLink } from "react-router-dom";

function PawrentIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg
        width="98"
        height="98"
        viewBox="0 0 98 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M79.1713 51.3018L52.5185 77.6988C50.5698 79.6287 47.4302 79.6287 45.4816 77.6988L18.8288 51.3018C16.8387 49.3653 15.2712 47.0377 14.2248 44.4656C13.1785 41.8935 12.6761 39.1326 12.7492 36.3567C12.8223 33.5809 13.4694 30.8503 14.6497 28.3368C15.83 25.8234 17.5179 23.5815 19.6071 21.7524C21.6964 19.9234 24.1418 18.5467 26.7892 17.7091C29.4367 16.8715 32.2289 16.5912 34.99 16.8857C37.7511 17.1802 40.4213 18.0433 42.8325 19.4205C43.3001 19.6875 43.7559 19.9728 44.1991 20.2754C46.9572 22.1588 51.058 22.1702 53.8266 20.3022C54.2644 20.0069 54.7143 19.7284 55.1755 19.4676C57.585 18.105 60.2499 17.2544 63.0032 16.969C65.7566 16.6837 68.5393 16.9698 71.177 17.8093C73.8147 18.6488 76.2508 20.0238 78.3327 21.8481C80.4146 23.6724 82.0976 25.9068 83.2763 28.4115C84.4549 30.9161 85.1039 33.6371 85.1826 36.4041C85.2613 39.1711 84.7681 41.9246 83.7337 44.4922C82.6993 47.0598 81.1461 49.3863 79.1713 51.326"
          stroke="#EE7200"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M49 24.863L35.7528 38.1102C34.9987 38.8646 34.575 39.8877 34.575 40.9544C34.575 42.0211 34.9987 43.0441 35.7528 43.7985L37.9372 45.9829C40.713 48.7587 45.2186 48.7587 47.9943 45.9829L52.0172 41.9601C54.4177 39.5595 57.6736 38.2109 61.0685 38.2109C64.4635 38.2109 67.7193 39.5595 70.1199 41.9601L79.1713 51.0115"
          stroke="#EE7200"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51.0114 63.0801L59.0571 71.1257"
          stroke="#EE7200"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M61.0685 53.0229L69.1142 61.0686"
          stroke="#EE7200"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

function ShelterIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg
        width="56"
        height="62"
        viewBox="0 0 56 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector"
          d="M52.4444 18.851L34.1112 2.82721C32.4305 1.32854 30.2549 0.5 28.0001 0.5C25.7453 0.5 23.5696 1.32854 21.889 2.82721L3.55582 18.851C2.58529 19.7164 1.81081 20.778 1.28395 21.9652C0.757088 23.1523 0.489939 24.4377 0.50029 25.7358V52.3609C0.50029 54.7848 1.46605 57.1093 3.18513 58.8232C4.9042 60.5371 7.23576 61.5 9.66689 61.5H46.3333C48.7644 61.5 51.096 60.5371 52.8151 58.8232C54.5341 57.1093 55.4999 54.7848 55.4999 52.3609V25.7053C55.5059 24.4123 55.2367 23.1328 54.7099 21.9513C54.1832 20.7697 53.411 19.713 52.4444 18.851ZM34.1112 55.4073H21.889V40.1755C21.889 39.3676 22.2109 38.5927 22.784 38.0214C23.357 37.4501 24.1342 37.1292 24.9446 37.1292H31.0556C31.866 37.1292 32.6432 37.4501 33.2162 38.0214C33.7892 38.5927 34.1112 39.3676 34.1112 40.1755V55.4073ZM49.3888 52.3609C49.3888 53.1689 49.0669 53.9437 48.4939 54.515C47.9209 55.0863 47.1437 55.4073 46.3333 55.4073H40.2222V40.1755C40.2222 37.7517 39.2565 35.4271 37.5374 33.7132C35.8183 31.9993 33.4868 31.0365 31.0556 31.0365H24.9446C22.5134 31.0365 20.1819 31.9993 18.4628 33.7132C16.7437 35.4271 15.778 37.7517 15.778 40.1755V55.4073H9.66689C8.85651 55.4073 8.07933 55.0863 7.5063 54.515C6.93328 53.9437 6.61136 53.1689 6.61136 52.3609V25.7053C6.61191 25.2728 6.70484 24.8453 6.88396 24.4514C7.06309 24.0574 7.32431 23.706 7.65024 23.4206L25.9834 7.4272C26.541 6.93881 27.2579 6.66947 28.0001 6.66947C28.7423 6.66947 29.4591 6.93881 30.0167 7.4272L48.3499 23.4206C48.6759 23.706 48.9371 24.0574 49.1162 24.4514C49.2953 24.8453 49.3883 25.2728 49.3888 25.7053V52.3609Z"
          fill="#EE7200"
        />
      </svg>
    </SvgIcon>
  );
}

export default function Verify() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  axios
    .get(`http://localhost:3001/verify?token=${token}`)
    .then(function (res) {
      console.log(res.data, token);
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

  //TOD: Logic for role submit
  const handleRoleSubmit = () => {
    axios.post(`http://localhost:3001/verify?token=${token}`, {
      role
    })
        .then(response => {
          console.log('Response from POST request:', response.data);
        })
        .catch(error => {
          console.error('Error in POST request:', error);
        });
  };

  return (
    <>
      <Background display={"flex"} align={"center"}>
        <Container sx={{ py: 10 }}>
          <div className="h-[12vh] relative border-[5px] rounded-[7px]">
            <img
              src={topImage}
              alt="top image"
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <img src={logo} alt="logo" className="h-[91px] w-[91px]" />
              <Typography component="div" variant="h3" ml="22px" color="white">
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
                We're excited to have you onboard! Just one last question - what
                describes your role on our website?
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
      </Background>
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
