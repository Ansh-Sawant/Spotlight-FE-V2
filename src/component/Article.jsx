import { Box, Typography, Button, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { bookmarks } from "../service/api";
import { formatDate } from "../utils/constants";
import Notification from "./Notification";

const Article = ({ article, loginUser }) => {
  const [notification, setNotification] = useState(null);

  const bookMarkedNews = {
    name: loginUser?.username,
    email: loginUser?.email,
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content,
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const result = await bookmarks(bookMarkedNews);

      if (result.success) {
        setNotification({
          message: result.message,
          type: "success",
        });
      } else {
        setNotification({
          message: result.message,
          type: "error",
        });
      }
    } else {
      setNotification({
        message: "Please Login First",
        type: "warning",
      });
    }
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
            By {article.author} | {formatDate(article.publishedAt)}
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
              onClick={() => handleBookmark()}
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

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </Box>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  loginUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default Article;