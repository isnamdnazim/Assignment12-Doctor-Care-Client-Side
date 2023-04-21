import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import loginDoctor from "../../images/login.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import registerCss from "./Register.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const { user, registerUser, isLoading, authError } = useAuth();
  const history = useHistory();
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...registerData };
    newLoginData[field] = value;
    setRegisterData(newLoginData);
  };
  const handleRegisterSubmit = (e) => {
    if (registerData.password !== registerData.password2) {
      alert("password didnt match");
      return;
    }
    registerUser(
      registerData.email,
      registerData.password,
      registerData.name,
      history
    );
    e.preventDefault();
  };
  return (
    <Container sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ marginTop: "20px" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "700",
              margin: "20px 0",
            }}
            variant="body1"
            gutterBottom
          >
            Register
          </Typography>

          {!isLoading && (
            <form>
              <TextField
                sx={{ width: 1, margin: "20px 0" }}
                id="standard-basic"
                name="name"
                type="text"
                onChange={handleOnChange}
                label="User Name"
                variant="standard"
              />
              <TextField
                sx={{ width: 1, margin: "20px 0" }}
                id="standard-basic"
                name="email"
                type="email"
                onChange={handleOnChange}
                label="User Email"
                variant="standard"
              />
              <TextField
                sx={{ width: 1, margin: "20px 0" }}
                id="standard-basic"
                label="Password"
                name="password"
                onChange={handleOnChange}
                type="password"
                variant="standard"
              />
              <TextField
                sx={{ width: 1, margin: "20px 0" }}
                id="standard-basic"
                label="Confirm Password"
                name="password2"
                onChange={handleOnChange}
                type="password"
                variant="standard"
              />
              <Button
                style={{ width: "100%", margin: "20px 0" }}
                className={registerCss.btn}
                variant="contained"
                onClick={handleRegisterSubmit}
              >
                Register
              </Button>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button variant="text">
                  Already have an account? Please Login
                </Button>
              </NavLink>
            </form>
          )}
          {isLoading && <CircularProgress />}
          {user?.email && (
            <Alert severity="success">
              <AlertTitle>User Registration successfull!</AlertTitle>
            </Alert>
          )}
          {authError && (
            <Alert severity="error">
              <AlertTitle>{Error}</AlertTitle>
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
          <img style={{ width: "60%" }} src={loginDoctor} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
