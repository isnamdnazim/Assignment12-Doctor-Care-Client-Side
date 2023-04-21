import { Container } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import loginDoctor from "../../images/login.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import loginCss from "./Login.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, isLoading, authError, signInWithGoogle, resetPass } =
    useAuth();
  const location = useLocation();
  const history = useHistory();
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, history);
    e.preventDefault();
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle(location, history);
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
            Login
          </Typography>

          <form>
            <TextField
              sx={{ width: 1, margin: "20px 0" }}
              id="standard-basic"
              name="email"
              onChange={handleOnChange}
              label="User Email"
              type="email"
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
            <Button
              style={{ width: "100%", margin: "20px 0" }}
              className={loginCss.btn}
              variant="contained"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <NavLink style={{ textDecoration: "none" }} to="/register">
              <Button variant="text">New User? Please Register</Button>
            </NavLink>
            {isLoading && <CircularProgress />}
            {user?.email && (
              <Alert severity="success">
                <AlertTitle>User Login successfull!</AlertTitle>
              </Alert>
            )}
            {authError && (
              <Alert severity="error">
                <AlertTitle>{authError}</AlertTitle>
              </Alert>
            )}
          </form>
          <p>------------------------</p>
          <Button onClick={handleGoogleSignIn} variant="contained">
            Google Sign In
          </Button>
          {/* <Button variant="contained">
            Facebook Sign In
          </Button> */}
        </Grid>
        <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
          <img style={{ width: "60%" }} src={loginDoctor} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
