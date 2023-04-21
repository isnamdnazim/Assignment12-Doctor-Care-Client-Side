import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Booking from "../Booking/Booking";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

// const bookings = [
//   {
//     id: 1,
//     name: "Teeth Orthodonics",
//     time: "08.00 AM - 09.00 AM",
//     price: 20,
//     space: 10,
//   },
//   {
//     id: 2,
//     name: "Cosmetic Dentistry",
//     time: "09.00 AM - 10.00 AM",
//     price: 25,
//     space: 8,
//   },
//   {
//     id: 3,
//     name: "Teeth Cleaning",
//     time: "10.00 AM - 11.00 AM",
//     price: 22,
//     space: 9,
//   },
//   {
//     id: 4,
//     name: "Cavity Protection",
//     time: "11.00 AM - 12.00 PM",
//     price: 24,
//     space: 5,
//   },
//   {
//     id: 5,
//     name: "Pediatric Dental",
//     time: "06.00 PM - 07.00 PM",
//     price: 27,
//     space: 10,
//   },
//   {
//     id: 6,
//     name: "Oral Surgery",
//     time: "07.00 PM - 08.00 PM",
//     price: 26,
//     space: 10,
//   },
// ];

const AvailableAppointment = ({ date }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  var showDate = new Date();
  var time = showDate.getHours() + ":" + showDate.getMinutes();
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5003/service")
      .then((res) => res.json())
      .then((data) => setbookings(data));
  }, []);
  return (
    <Container style={{ textAlign: "center", marginTop: "40px" }}>
      <h2 style={{ color: "#16D1BF", fontWeight: "700" }}>
        Available Appointment on {date.toDateString()}
      </h2>
      <Box sx={{ flexGrow: 1 }}>
        {bookingSuccess && (
          <Alert severity="success">
            <AlertTitle>Booking successfull!</AlertTitle>
          </Alert>
        )}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* {Array.from(Array(6)).map((_, index) => (
            
          ))} */}
          {bookings.map((booking) => (
            <Booking
              key={Booking.id}
              booking={booking}
              date={date}
              setBookingSuccess={setBookingSuccess}
            ></Booking>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AvailableAppointment;
