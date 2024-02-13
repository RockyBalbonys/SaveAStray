import { createTheme } from "@mui/material";

// Define custom typography variants
const typography = {
  fontFamily: "Poppins",
  fontSize: "16px", // Base font size

  h1: {
    fontSize: "6.25rem", // 100px converted to rem
    fontWeight: "900",
  },

  h2: {
    fontSize: "3.5rem", // 56px converted to rem
    fontWeight: "900",
  },

  h3: {
    fontSize: "3rem", // 48px converted to rem
    fontWeight: "700",
  },

  h4: {
    fontSize: "2rem", // 32px converted to rem
    fontWeight: "500",
  },

  h5: {
    fontSize: "1.875rem", // 30px converted to rem
    fontWeight: "500",
  },

  h6: {
    fontSize: "1.5rem", // 24px converted to rem
    fontWeight: "400",
  },

  body1: {
    fontSize: "1.25rem", // 20px converted to rem
    fontWeight: "400",
  },

  body1Bold: {
    fontSize: "1.25rem", // 20px converted to rem
    fontWeight: "700",
  },

  body2: {
    fontSize: "1rem", // 16px converted to rem
    fontWeight: "400",
  },

  body3: {
    fontSize: "0.875rem", // 14px converted to rem
    fontWeight: "300",
  },

  subtitle1: {
    fontSize: "0.75rem", // 12px converted to rem
    fontWeight: "300",
  },

  btn: {
    fontSize: "1.125rem", // 18px converted to rem
    fontWeight: "700",
  },
};

// Define custom color palette
const palette = {
  primary: {
    main: "#FF8210",
    highlighted: "#EE7200",
  },
  secondary: {
    main: "#2F4858",
    dark: "#263A47",
    light: "#385669",
  },
  common: {
    white: "#FFFFFF",
    black: "#000000",
    dirtyWhite: "#FAFAFB",
    semiBlack: "#181818",
  },
};

const theme = createTheme({
  typography,
  palette,
});
export default theme;
