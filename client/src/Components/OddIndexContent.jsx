import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function OddIndexContent({ content }) {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: {
            sm: "block",
            md: "block",
          },
        }}
        component={motion.div}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0 }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: {
              sm: "center",
              md: "flex-end",
            },
            my: {
              sm: "40px",
            },
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "80%",
              marginRight: {
                sm: "0",
              },
              color: "#2F4858",
            }}
          >
            <Typography fontSize={26} fontWeight="bold" mb={3}>
              {content.title}
            </Typography>
            <Stack direction="column" spacing={3}>
              <Typography>{content.p1}</Typography>
              <Typography>{content.p2}</Typography>
              <Typography>{content.p3}</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              position: "absolute",
              background: `url(${content.icon})`,
              width: "30%", // Adjusted width to fit the remaining space
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              left: 0, // Icon on the left side
              display: {
                sm: "none",
                md: "block",
              },
            }}
          ></Box>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        component={motion.div}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0 }}
      >
        <Box
          position="relative"
          sx={{
            backgroundColor: "rgb(238, 114, 0)",
            width: "100%",
            height: "422px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            className="bg-gradient-to-bl from-amber-500 to-orange-600"
          >
            <Typography
              fontSize={168}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              {content.section}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
