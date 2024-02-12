import { Container, Typography, Box } from "@mui/material";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100dvh"
        flexDirection="column"
      >
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5">
          Sorry, an unexpected error has occured.
        </Typography>
        <Typography variant="h6" color="grey">
          {error.statusText || error.message}
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
