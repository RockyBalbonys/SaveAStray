import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function EvenIndexContent({ content }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log("isInView: " + isInView);
  }, [isInView]);

  return (
    <>
      <Grid
        item
        md={6}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          height: "422px",
        }}
        ref={ref}
        component={motion.div}
      >
        <Box
          position="relative"
          sx={{
            backgroundColor: "rgb(238, 114, 0)",
            width: "100%",
            height: "100%",
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
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          height: "422px",
        }}
        ref={ref}
        component={motion.div}
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
              md: "flex-start",
            },
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: "80%",
              marginLeft: {
                sm: "0px",
                md: "40px",
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
              right: 0, // Icon on the right side
              display: {
                sm: "none",
                md: "block",
              },
            }}
          ></Box>
        </Box>
      </Grid>
    </>
  );
}
