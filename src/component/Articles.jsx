import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Container, Box, Typography, Stack } from '@mui/material';
import { getNews } from "../service/api";
import Article from "./Article";
import Footer from "./Footer";

const Articles = ({ loginUser }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews(0);
        console.log(response);
        
        setNews(response);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          {news?.length > 0 ? (
            news.map((article) => (
              <Box key={article._id}>
                <Article article={article} loginUser={loginUser} />
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
              <Typography variant="h6">No articles available</Typography>
            </Box>
          )}
        </Stack>
      )}

      <Footer />
    </Container>
  );
};

// PropTypes for validation
Articles.propTypes = {
  loginUser: PropTypes.object.isRequired,
};

export default Articles;
