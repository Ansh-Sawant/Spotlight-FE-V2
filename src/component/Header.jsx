import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar } from "@mui/material";

import Articles from "./Articles";
import Login from "./Login";
import Bookmarks from "./Bookmarks";
import Signup from "./Signup";

const Header = () => {
  const [loginUser, setLoginUser] = useState({});

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", boxShadow: 'none' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* Add any icon here if needed */}
            </IconButton>

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
                sx={{ flexGrow: 1, fontWeight: "bold", color: "#333" }}
              >
                Spotlight
              </Typography>
            </Link>

            {/* Push the buttons to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* My Bookmarks Button wrapped in a Link */}
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

            {/* Login Button wrapped in a Link */}
            <Button
              color="inherit"
              component={Link}
              to={loginUser && loginUser.id ? "/" : "/login"}
              sx={{
                color: "#333",
                textTransform: "none",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              {loginUser && loginUser.id ? loginUser.username : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{ margin: "10px" }}>&nbsp;</div>

      <Routes>
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/bookmarks" element={<Bookmarks loginUser={loginUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Articles loginUser={loginUser} />} />
      </Routes>
    </Router>
  );
};

export default Header;
