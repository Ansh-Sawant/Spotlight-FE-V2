import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { register } from "../service/api";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    register(user);
  };

  return (
    <Container maxWidth="sm">
      <Box className="loginPage">
        <Box className="loginDiv">
          <Typography variant="h4" className="loginHeading">Sign Up</Typography>
          <form className="loginDetails" method="post">
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              REGISTER
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Or Sign In using
            </Typography>
            <Button
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
