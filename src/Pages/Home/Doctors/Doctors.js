import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Doctor from "../Doctor/Doctor";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetch("http://localhost:5003/doctor")
        .then((res) => res.json())
        .then((data) => setDoctors(data));
    }

    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <div className="p-4">
      <h2 style={{ textAlign: "center" }}>Our Doctors</h2>
      <Container>
        <Grid container spacing={2}>
          {doctors.map((doctor) => (
            <Doctor key={doctor._id} doctor={doctor}></Doctor>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Doctors;
