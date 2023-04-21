import { Container, Grid } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import "./ContactCard.css";
import Slide from "react-reveal/Slide";
const ContactCard = () => {
  return (
    <div className="container mt-3 mb-3 p-2">
      <Slide left>
        <div className="row">
          <div
            className="col-md-3 mx-auto p-3 hover mb"
            style={{
              width: "350px",
              background: "#1cc7c1",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "5px"
            }}
          >
            <div className="row">
              <div className="col-md-4 col-4 d-flex justify-content-end">
                <AccessTimeIcon className="mt-1" />
              </div>
              <div className="col-md-8 col-8">
                <h4>Opening Hours</h4>
                <h5>10.00 AM - 8.00 PM</h5>
              </div>
            </div>
          </div>
          <div
            className="col-md-3 mx-auto p-3 hover mb"
            style={{
              width: "350px",
              background: "#3a4256",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "5px"
            }}
          >
            <div className="row">
              <div className="col-md-4 col-4 d-flex justify-content-end">
                <LocationOnIcon className="mt-1" />
              </div>
              <div className="col-md-8 col-8">
                <h4>Visit Our Place</h4>
                <h5>10.00 AM - 8.00 PM</h5>
              </div>
            </div>
          </div>
          <div
            className="col-md-3 mx-auto p-3 hover"
            style={{
              width: "350px",
              background: "#1cc7c1",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "5px"
            }}
          >
            <div className="row">
              <div className="col-md-4 col-4 d-flex justify-content-end">
                <AccessTimeIcon className="mt-1" />
              </div>
              <div className="col-md-8 col-8">
                <h4>Contact Us Now</h4>
                <h5>+8801715925172</h5>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default ContactCard;
