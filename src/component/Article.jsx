import { Box, Typography, Button, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { bookmarks } from "../service/api";

const Article = ({ article, loginUser }) => {
  const bookMarkedNews = {
    name: loginUser.loginUser?.name,
    email: loginUser.loginUser?.email,
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "16px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        {/* Article Image */}
        <Avatar
          variant="square"
          src={article.urlToImage}
          alt={article.title}
          sx={{
            width: { xs: "100%", md: "300px" },
            height: { xs: "200px", md: "auto" },
            marginBottom: { xs: "16px", md: "0" },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingLeft: { md: "16px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Article Title */}
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
            {article.title}
          </Typography>

          {/* Author and Date */}
          <Typography variant="body2" color="textSecondary">
            By {article.author} | {article.publishedAt}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ marginTop: "8px" }}>
            {article.description}
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (bookMarkedNews.name) {
                  bookmarks(bookMarkedNews);
                } else {
                  alert("Please Login First");
                }
              }}
              sx={{
                marginRight: "20px",
              }}
            >
              Bookmark
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href={article.url}
              target="_blank"
            >
              Read More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  loginUser: PropTypes.shape({
    loginUser: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }),
};

export default Article;
