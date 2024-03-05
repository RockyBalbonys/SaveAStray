import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { articlesCardContent } from "../constants/article";
import { ArticleCard } from "../Components/Card/CustomCard";
import { Link as RouterLink } from "react-router-dom";

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

  return (
    <>
      <Container maxWidth="xl" sx={{ pt: "64px", pb: "108px" }}>
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
            {limitedOtherArticles.map((article) => (
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
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ArticlePage;
