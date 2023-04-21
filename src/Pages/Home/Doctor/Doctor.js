import { Grid } from "@mui/material";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import React from "react";
import "./Doctor.css";

const Doctor = ({ doctor }) => {
  const { name, image, attendance, phone, designation } = doctor;
  return (
    <Grid className="col-md-4 col-12 text-center p-4 res-doctor">
      <img
        style={{ width: "200px" }}
        src={`data:image/jpeg;base64,${image}`}
        alt=""
      />
      <h3 className="mt-1">{name}</h3>
      <h4 className="mt-1">{designation}</h4>
      <h5 className="mt-1"><AddIcCallIcon /> {phone}</h5>
      <h5 className="mt-1">
        <span style={{ color: "green", fontWeight: "bold" }}>{attendance}</span>{" "}
        today
      </h5>
    </Grid>
  );
};

export default Doctor;
