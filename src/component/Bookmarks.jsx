import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Container,
} from "@mui/material";
import { deleteBookmarks, getBookmarks } from "../service/api";
import { formatDate } from "../utils/constants";
import Footer from "./Footer";

const Bookmarks = ({ loginUser }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkChange, setBookmarkChange] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, [bookmarkChange]);

  const fetchBookmarks = async () => {
    const response = await getBookmarks();
    setBookmarks(response);
  };

  const handleRemove = (email, title, id) => {
    deleteBookmarks(email, title, id);
    setBookmarkChange((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Bookmarks
      </Typography>

      {loginUser.email && bookmarks.length > 0 ? (
        bookmarks.map((bmNews) =>
          bmNews.email === loginUser.email ? (
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
                {/* Bookmark Image */}
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
                  {/* Bookmark Title */}
                  <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                    {bmNews.title}
                  </Typography>

                  {/* Author and Date */}
                  <Typography variant="body2" color="textSecondary">
                    By {bmNews.author} | {formatDate(bmNews.publishedAt)}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body1" sx={{ marginTop: "8px" }}>
                    {bmNews.description}
                  </Typography>

                  {/* Action Buttons */}
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

      <Footer />
    </Container>
  );
};

Bookmarks.propTypes = {
  loginUser: PropTypes.object,
};

export default Bookmarks;
