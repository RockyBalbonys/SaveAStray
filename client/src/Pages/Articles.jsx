import { Box, Container, Grid, Typography, Pagination } from "@mui/material";
import Footer from "../Components/PageComponent/Footer";
import Donate from "../Components/PageComponent/Donate";
import { articlesCardContent } from "../constants/article";
import { ArticleCard } from "../Components/Card/CustomCard";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Articles = () => {
  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(articlesCardContent.length / itemsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    articlesCardContent.length
  );

  // Slice the articles for the current page
  const currentArticles = articlesCardContent.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Box component="main">
        <Container
          maxWidth="xl"
          sx={{ mt: "64px", mb: "108px" }}
          component="section"
        >
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              rowGap: 4,
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Read Some Articles Here
            </Typography>
            <Typography sx={{ fontWeight: "300", width: "600px" }}>
              Want to get some tips for being a pawrent or just want to read
              latest news? Grab knowledge from these blogs
            </Typography>
          </Box>

          <Container maxWidth="lg">
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={4}
            >
              {currentArticles.map((article, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  component={RouterLink}
                  to={`/articles/${article.id}`}
                >
                  <ArticleCard
                    imageUrl={article.image}
                    title={article.title}
                    summary={article.summary}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                mt: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
                siblingCount={1}
                boundaryCount={1}
                showFirstButton
                showLastButton
                sx={{ mt: 2, justifyContent: "center" }}
              />
            </Box>
          </Container>
        </Container>
        <Donate />
      </Box>
      <Footer />
    </>
  );
};

export default Articles;
