import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import doctorImg from "../../../images/doctor.png";
import bg from "../../../images/appointment-bg.png";
import Button from "@mui/material/Button";
import appointmentmodulecss from "./AppointmentBanner.module.css";
import { Link, NavLink } from "react-router-dom";

const appointmentBanner = {
  background: `url(${bg})`,
  backgroundColor: "rgb(62, 69, 88)",
  backgroundBlendMode: "darken,luminosity",
  marginTop: "120px",
  marginBottom: "20px",
  color: "#fff",
};

const AppoinmentBanner = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Container style={appointmentBanner}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              style={{
                width: "500px",
                marginTop: "-150px",
                marginBottom: "-5px",
              }}
              src={doctorImg}
              alt="Doctor"
            />
          </Grid>
          <Grid item xs={12} md={6} className="p-3">
            <Typography
              variant="h5"
              sx={{ padding: "4px", lineHeight: "28px", fontSize: "20px" }}
            >
              Appointment
            </Typography>
            <Typography
              variant="h4"
              sx={{
                padding: "4px",
                lineHeight: "38px",
                fontWeight: "700",
                wordSpacing: "4px",
              }}
            >
              Make an Appointment <br /> Today
            </Typography>

            <Typography
              sx={{ padding: "4px", lineHeight: "38px", fontweight: "600" }}
            >
              An exam of your head and neck, including tonsils, lymph nodes and
              thyroid. An abdominal exam to check for any tenderness and liver
              size. A check of your muscle strength, reflexes and balance <br />{" "}
              Today
            </Typography>
            <Button
              className={appointmentmodulecss.btn}
              sx={{
                margin: "10px 0",
                backgroundImage: "linear",
                fontWeight: "700",
              }}
              variant="contained"
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppoinmentBanner;
