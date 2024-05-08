import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { articlesCardContent } from "../constants/article";
import { ArticleCard } from "../Components/Card/CustomCard";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useScroll, useSpring, motion, useTransform } from "framer-motion";

const ArticlePage = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const article = articlesCardContent.find(
    (article) => article.id === parseInt(id)
  );

  // Filter articles except the current one
  const otherArticles = articlesCardContent.filter(
    (article) => article.id !== parseInt(id)
  );

  // Limit other articles to the first four
  const limitedOtherArticles = otherArticles.slice(0, 4);

  // framer motion
  /* const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    initial: 0.5,
  }); */

  return (
    <>
      {/* <motion.div
        className="w-screen bg-orange-600 h-[8px] fixed"
        style={{ scaleX, transformOrigin: "left" }}
      /> */}
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ m: "34px 0 0 34px" }}
        component={RouterLink}
        to={"/articles"}
      >
        Back to Articles
      </Button>
      <Container maxWidth="xl" sx={{ pt: "24px", pb: "108px" }}>
        <Grid container spacing="50px">
          <Grid item xs={12} lg={8}>
            <img
              src={article.image}
              alt={article.title}
              className="max-h-[650px] hidden sm:block"
            />
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                rowGap: "24px",
              }}
            >
              <Typography variant="h6" component="h1" fontWeight={600}>
                {article.contentTitle}
              </Typography>
              <Typography>{article.description}</Typography>

              {/* Iterate subtitle and subcontent */}
              {article.contentData.map((section, idx) => (
                <div key={idx}>
                  <Typography fontWeight="600">{section.subtitle}</Typography>
                  {section.subcontent.map((content, i) => (
                    <Typography key={i}>{content}</Typography>
                  ))}
                </div>
              ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Grid container spacing={3}>
              {limitedOtherArticles.map((article, idx) => (
                <Grid item key={idx}>
                  <Box
                    key={article.id}
                    to={`/articles/${article.id}`}
                    component={RouterLink}
                  >
                    <ArticleCard
                      imageUrl={article.image}
                      title={article.title}
                      summary={article.summary}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ArticlePage;
