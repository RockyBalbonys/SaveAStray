// mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// custom components
import Background from "../../Components/Background";

// icons and images
import passive from "../../assets/images/top.png";
import logo from "../../assets/icons/SAS_Logo4.png";
import dogCover from "../../assets/images/DeadEnd2.webp";

// react router
import { Link as RouterLink } from "react-router-dom";

function DeadEnd2() {
  return (
    <>
      <Background display={"flex"} align={"center"}>
        <Container sx={{ py: 10, width: "100%" }} maxWidth="lg">
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
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    height: "100%",
                    rowGap: "24px",
                    color: "#2F4858",
                    ml: "32px",
                    width: "398px",
                  }}
                >
                  <Typography
                    sx={{ color: "#FF7A00", fontWeight: 700, fontSize: "48px" }}
                  >
                    Yes, You Did It!
                  </Typography>
                  <Typography fontWeight={300}>
                    You’ve successfully,  
                    <span className="font-semibold">
                      submit an adoption questionnaire form
                    </span>{" "}
                    to the respected shelter. Kindly wait for their response!
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      width: "fit-content",
                      border: "7px",
                      textTransform: "none",
                    }}
                    component={RouterLink}
                    to="/animals"
                  >
                    Go Back To Dashboard
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={0} sm={6}>
                <Box
                  display={{
                    xs: "none",
                    sm: "block",
                  }}
                >
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
                      loading={"lazy"}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Background>
    </>
  );
}

export default DeadEnd2;
