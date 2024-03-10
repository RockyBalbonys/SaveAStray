import { Container, Typography, Box, Paper, Grid, Button } from "@mui/material";
import Background from "../Components/Background";
import passive from "../assets/images/passive2.png";
import logo from "../assets/icons/SAS_Logo4.png";
import dogCover from "../assets/images/dogCover3.png";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Background display={"flex"} align={"center"}>
        <Container sx={{ py: 10 }}>
          <div className="h-[12vh] relative border-[5px] rounded-[7px]">
            <img
              src={passive}
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
          <Paper sx={{ mt: 2, p: "32px 31px", border: "7px" }}>
            <Grid container>
              <Grid item xs={0} sm={6}>
                <Box display={{ xs: "none", sm: "block" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={dogCover}
                      alt="dog cover"
                      width={"403px"}
                      height={"403px"}
                      className="self-center"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    height: "100%",
                    rowGap: "24px",
                    color: "#2F4858",
                  }}
                >
                  <Typography
                    sx={{ color: "#FF7A00", fontWeight: 700, fontSize: "48px" }}
                  >
                    404 Error
                  </Typography>
                  <Typography fontWeight={700} fontSize={"24px"}>
                    Ooppsss! Page Not Found
                  </Typography>
                  <Typography fontWeight={300}>
                    The page you are looking for might have been removed, had
                    its name changed, or temporarily unavailable
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={"/"}
                    variant="contained"
                    sx={{
                      color: "white",
                      width: "fit-content",
                      border: "7px",
                      textTransform: "none",
                    }}
                  >
                    Go To Homepage
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Background>
    </>
  );
};

export default NotFound;
