import {
  FormControl,
  RadioGroup,
  Stack,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  OutlinedInput,
  InputLabel,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = ({ data, onSubmit, onChange }) => {
  return (
    <>
      <FormControl>
        <RadioGroup>
          <Stack direction="row" spacing={2.25}>
            <FormControlLabel
              value="Adoptive Parent"
              control={<Radio />}
              label={
                <Typography sx={{ fontSize: "12px" }}>
                  Adoptive Parent
                </Typography>
              }
            />
            <FormControlLabel
              value="Rescue Shelter"
              control={<Radio />}
              label={
                <Typography sx={{ fontSize: "12px" }}>
                  Rescue Shelter
                </Typography>
              }
            />
          </Stack>
        </RadioGroup>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          rowGap: "22px",
        }}
        onSubmit={onSubmit}
      >
        <Box width="100%">
          <InputLabel htmlFor="emailInput">Email</InputLabel>
          <OutlinedInput
            id="emailInput"
            type="email"
            variant="filled"
            value={data.loginEmail}
            sx={{ width: "100%" }}
            onChange={onChange}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="passwordInput">Password</InputLabel>
          <OutlinedInput
            id="passwordInput"
            type="password"
            variant="filled"
            value={data.loginPass}
            onChange={onChange}
            sx={{ width: "100%" }}
          />

          {/* Links to signup and forgot password */}

          <Stack direction="row" spacing={7.9} mt={1}>
            <Link to="forgotPass" component={RouterLink} underline="hover">
              <Typography variant="body2" sx={{ color: "orange" }}>
                Forgot Password?
              </Typography>
            </Link>
            <Link to="signup" component={RouterLink} underline="hover">
              <Typography variant="body2" fontWeight="bold">
                Need an Account?
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Box>

      <Button type="submit" variant="contained" sx={{ width: "100%" }}>
        Continue
      </Button>
    </>
  );
};

export default LoginForm;
