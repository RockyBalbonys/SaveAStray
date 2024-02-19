import { createTheme } from "@mui/material";

// Define custom typography variants
const typography = {
  fontFamily: "Poppins",
  fontSize: 16, // Base font size

  h1: {
    fontSize: 100, // 100px converted to rem // 6.5rem
    fontWeight: "900",
  },

  h2: {
    fontSize: 56, // 56px converted to rem // 3.5rem
    fontWeight: "900",
  },

  h3: {
    fontSize: 48, // 48px converted to rem // 3rem
    fontWeight: "700",
  },

  h4: {
    fontSize: 32, // 32px converted to rem // 2rem
    fontWeight: "500",
  },

  h5: {
    fontSize: 30, // 30px converted to rem // 1.875rem
    fontWeight: "500",
  },

  h6: {
    fontSize: 24, // 24px converted to rem // 1.5rem
    fontWeight: "400",
  },

  body1: {
    fontSize: 20, // 20px converted to rem // 1.25rem
    fontWeight: "400",
  },

  body1Bold: {
    fontSize: 20, // 20px converted to rem // 1.25rem
    fontWeight: "700",
  },

  body2: {
    fontSize: 16, // 16px converted to rem // 1rem
    fontWeight: "400",
  },

  body3: {
    fontSize: 14, // 14px converted to rem // 0.875rem
    fontWeight: "300",
  },

  subtitle1: {
    fontSize: 12, // 12px converted to rem // 0.75rem
    fontWeight: "300",
  },

  btn: {
    fontSize: 18, // 18px converted to rem // 1.125rem
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
