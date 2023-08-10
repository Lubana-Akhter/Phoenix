import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty,IsEmail, SuccessToast } from "../helper/FormHelper";
import { Toaster } from "react-hot-toast";
import backgroundImage from "../assets/images/bacground-img.png";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { BaseURL } from "../core/BaseUrl";

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Icon,
} from "@mui/material";

const styles = {
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45px",
    width: "45px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    margin: "auto",
  },
  iconStyle: {
    fontSize: "30px",
  },
};
const Login = () => {
  const containerStyle = {
    minHeight: "100vh", // Set the minimum height to fill the viewport
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const paperStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const titleStyle = {
    marginBottom: "20px",
    fontFamily: "cursive",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let URL = BaseURL + "/user/login";

    if (IsEmpty(email)) {
      ErrorToast("Please provide email");
    } else if (IsEmpty(password)) {
      ErrorToast("Please provide password");
    }
   
    else {
      try {
        const { data } = await axios.post(URL, {
          email: email,
          password: password,
        });
        SuccessToast("Login Successfully");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/user-buy");
      } catch (error) {
        console.error("Error login user:", error.message);
      }
    }
  };
  const formStyle = {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headerStyle = {
    marginBottom: "1.5rem",
    color: "#3f51b5", // Custom header text color
  };
  return (
    <div style={containerStyle}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={paperStyle}>
          <Link to="/">
            <img
              src={logo}
              alt="Top Head Image"
              style={{ maxWidth: "160px", height: "62px", margin: "20px" }}
            />
          </Link>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  style={titleStyle}>
                  sign in
                </Button>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="h5" style={titleStyle}>
                    Sign up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Toaster />
      </Container>
    </div>
  );
};

export default Login;
