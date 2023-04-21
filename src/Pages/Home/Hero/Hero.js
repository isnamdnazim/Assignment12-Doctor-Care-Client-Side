import React from "react";
import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import chair from "../../../images/chair.png";
import bg from "../../../images/bg.png";
import "./Hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container">
      <div className="row p-3 res-hero">
        <div className="col-md-6 col-12">
          <h1 className="mb-3">
            Your New Smile <br /> Starts Here.
          </h1>
          <p className="pt-4 pb-4 fs-5">
            We are a quality-focused federally qualified health center dedicated
            to improving the physical, social and emotional well-being of people
            in the communities we serve, regardless of income.
          </p>
          <NavLink to="/appointment">
            <Button variant="contained">Get appointment</Button>
          </NavLink>
        </div>
        <div className="col-md-6 col-12">
          <img
            className="img-fluid"
            style={{ width: "100%", padding: "20px" }}
            src={chair}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
