import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import logo from "../../../images/logo.png"
const Navigation = () => {
  const { admin, doctor, user, logoutUser } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              <img src= {logo} style={{width:'50px', marginRight:'10px'}}/>
                MediCare
            </Link>
          </Typography>

          {!admin && !doctor && (
            <NavLink to="/appointment" style={{ textDecoration: "none" }}>
              {" "}
              <Button color="inherit" sx={{ color: "#fff" }}>
                Appointment
              </Button>
            </NavLink>
          )}
          {user?.email ? (
            <Box>
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <span className="ms-2 fw-bold">{user?.displayName}</span>

              <NavLink to="/" style={{ textDecoration: "none" }}>
                {" "}
                <Button
                  onClick={logoutUser}
                  color="inherit"
                  sx={{ color: "#fff" }}
                >
                  Logout
                </Button>
              </NavLink>
            </Box>
          ) : (
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              {" "}
              <Button color="inherit" sx={{ color: "#fff" }}>
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
