import { Container, Typography } from "@mui/material";

export const AccountHeader = () => {
  return (
    <>
      <div className="background-account text-white flex flex-col items-start justify-center">
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: "2.375rem", fontWeight: "600" }}>
            Account Information Management
          </Typography>
          <Typography>
            Manage your account information securely and conveniently.
          </Typography>
        </Container>
      </div>
    </>
  );
};
