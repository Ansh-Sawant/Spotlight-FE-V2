import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";

const Header = ({ loginUser, handleLogout }) => {
  const isLoggedIn = !!loginUser?.id;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f5f5f5", boxShadow: "none" }}
      >
        <Toolbar>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#333",
            }}
          >
            <Avatar
              alt="Spotlight Header"
              src="/lamp.png"
              sx={{ mr: 1, bgcolor: "#e0e0e0" }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Spotlight
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            color="inherit"
            component={Link}
            to="/bookmarks"
            sx={{
              color: "#333",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            My Bookmarks
          </Button>

          {isLoggedIn ? (
            <>
              <Typography
                sx={{
                  color: "#333",
                  ml: 2,
                  mr: 2,
                }}
              >
                {loginUser.username}
              </Typography>

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  color: "#333",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                color: "#333",
                textTransform: "none",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Header.propTypes = {
  loginUser: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;