import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import Button from "@mui/material/Button";
import bookingCss from "./Booking.module.css";
import useAuth from "../../../Hooks/useAuth";

const Booking = (props) => {
  const { name, time, space, price } = props.booking;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid item xs={12} sm={6} md={4} sx={{ marginTop: "20px" }}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom component="div">
            {name}
          </Typography>
          {/* <Typography variant="h6" gutterBottom component="div">
            {time}
          </Typography> */}
          <Typography variant="caption" display="block" gutterBottom>
            Price {price} BDT
          </Typography>
          <Button
            onClick={handleOpen}
            className={bookingCss.btn}
            variant="contained"
          >
            Book Appointment
          </Button>
        </Paper>
      </Grid>
      <BookingModal
        open={open}
        handleClose={handleClose}
        booking={props.booking}
        date={props.date}
        setBookingSuccess={props.setBookingSuccess}
      ></BookingModal>
    </>
  );
};

export default Booking;
