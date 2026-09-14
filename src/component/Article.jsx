import { Box, Typography, Button, Avatar, TextField, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { bookmarks, askSpotlight } from "../service/api";
import { formatDate } from "../utils/constants";
import Notification from "./Notification";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Article = ({ article, loginUser }) => {
  const [notification, setNotification] = useState(null);
  const [showAskSpotlight, setShowAskSpotlight] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleAskSpotlight = async () => {
    if (!question.trim()) {
      setNotification({
        message: "Please enter a question",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    setAnswer("");

    const articleContent = `
      Title: ${article.title}
      Description: ${article.description}
      Content: ${article.content}
    `;
    const result = await askSpotlight(question, articleContent);

    setLoading(false);
    if (result.success) {
      setAnswer(result.data.answer);
    } else {
      setNotification({
        message: result.message,
        type: "error",
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
              variant="outlined"
              color="primary"
              onClick={() => handleBookmark()}
              startIcon={<BookmarkBorderIcon />}
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
              startIcon={<MenuBookIcon />}
              sx={{
                marginRight: "20px",
              }}
            >
              Read More
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AutoAwesomeIcon />}
              onClick={() => setShowAskSpotlight((prev) => !prev)}
            >
              Ask Spotlight AI
            </Button>
          </Box>
        </Box>
      </Box>

      {showAskSpotlight && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Ask Spotlight AI
          </Typography>

          <TextField
            fullWidth
            label="Ask a question about this article"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAskSpotlight}
            disabled={loading}
            sx={{ marginTop: "10px" }}
          >
            {loading ? <CircularProgress size={24} /> : "ASK"}
          </Button>

          {answer && (
            <Box
              sx={{
                marginTop: "20px",
                padding: "16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Spotlight AI
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "8px" }}>
                {answer}
              </Typography>
            </Box>
          )}
        </Box>
      )}

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