import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledTextarea = styled("textarea")`
  box-sizing: border-box;
  width: 100%;
  height: 30vh; /* Set the height to 30vh */
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${(props) =>
    props.theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${(props) =>
    props.theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid
    ${(props) => (props.theme.palette.mode === "dark" ? grey[700] : grey[200])};
  box-shadow: 0px 2px 2px
    ${(props) => (props.theme.palette.mode === "dark" ? grey[900] : grey[50])};

  resize: none;
  overflow-y: auto;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`;

export default function EmptyTextarea() {
  return (
    <StyledTextarea
      aria-label="empty textarea"
      placeholder="Tell some suggestions or just say hi..."
    />
  );
}
