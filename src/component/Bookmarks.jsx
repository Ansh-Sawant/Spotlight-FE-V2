import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Container,
  CircularProgress,
} from "@mui/material";
import { deleteBookmarks, getBookmarks } from "../service/api";
import { formatDate } from "../utils/constants";
import Footer from "./Footer";
import Notification from "./Notification";

const Bookmarks = ({ loginUser }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkChange, setBookmarkChange] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("loginUser"));
  const currentUser = loginUser?.email ? loginUser : storedUser;

  useEffect(() => {
    fetchBookmarks();
  }, [bookmarkChange]);

  const fetchBookmarks = async () => {
    setLoading(true);
    const response = await getBookmarks();
    if (response.success) {
      setBookmarks(response.message || []);
    } else {
      setNotification({
        message: response.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleRemove = async (email, title, id) => {
    const result = await deleteBookmarks(email, title, id);

    if (result.success) {
      setNotification({
        message: result.message,
        type: "success",
      });
      setBookmarkChange((prev) => !prev);
    } else {
      setNotification({
        message: result.message,
        type: "error",
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Bookmarks
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : currentUser?.email && bookmarks.length > 0 ? (
        bookmarks.map((bmNews) =>
          bmNews.email === currentUser.email ? (
            <Box
              key={bmNews.title}
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
                <Avatar
                  variant="square"
                  src={bmNews.urlToImage}
                  alt={bmNews.title}
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
                  <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                    {bmNews.title}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    By {bmNews.author} | {formatDate(bmNews.publishedAt)}
                  </Typography>

                  <Typography variant="body1" sx={{ marginTop: "8px" }}>
                    {bmNews.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "16px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemove(bmNews.email, bmNews.title, bmNews.id)}
                      sx={{ marginRight: "20px" }}
                    >
                      <i className="fa fa-trash" /> &nbsp;Remove
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="a"
                      href={bmNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-book" /> &nbsp;Read More
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : null
        )
      ) : (
        <Box sx={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
          <Typography variant="h6">
            Sorry, No Bookmarked News Available For You!
          </Typography>
        </Box>
      )}

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <Footer />
    </Container>
  );
};

Bookmarks.propTypes = {
  loginUser: PropTypes.object,
};

export default Bookmarks;