import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ArticleCard = ({ imageUrl, title, summary }) => {
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
          <CardMedia
            component="img"
            image={imageUrl}
            title=""
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" fontWeight="600">
            {title}
          </Typography>
          <Typography variant="body1" fontWeight="300">
            {summary}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexGrow: 1 }}>
          <Button endIcon={<ChevronRightIcon />} sx={{ textTransform: "none" }}>
            Read More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export { ArticleCard };
