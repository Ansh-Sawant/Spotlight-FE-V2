import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";

import Footer from "./Footer";
import { URL } from "../utils/constants";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const salt = bcrypt.genSaltSync(10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    // const hashedPassword = bcrypt.hashSync(user.password, salt);
    axios.post(`${URL}/login`, { email: user.email, password: user.password })
      .then((res) => {
        if (res.data.id) {
          alert("Login Successful");
          setLoginUser(res.data);
          navigate("/");
        } else {
          alert(res.data);
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box className="loginPage">
        <Typography variant="h4" className="loginHeading">Login</Typography>
        <form className="loginDetails">
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={handleChange}
            className="formInputFields"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.password}
            onChange={handleChange}
            className="formInputFields"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="loginButton"
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          <Typography variant="body2" className="signupText">
            Or Sign Up using
          </Typography>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            className="signupButton"
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </Button>
        </form>
      </Box>

      <Footer />
    </Container>
  );
};

Login.propTypes = {
  setLoginUser: PropTypes.func.isRequired,
};

export default Login;
