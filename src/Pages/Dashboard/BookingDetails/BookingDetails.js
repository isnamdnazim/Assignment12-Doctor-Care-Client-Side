import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingDetails = ({ date }) => {
  const [appointments, setAppointments] = useState([]);
  const { user, token } = useAuth();
  const notify = () => toast.warn("booking cancel successfully!");

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const url = `http://localhost:5003/appoint?date=${date.toLocaleDateString()}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    }
    return () => {
      unmounted = true;
    };
  }, [appointments]);
  const handleDelete = (id) => {
    fetch(`http://localhost:5003/appoint/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Are You Sure that You want to cancel?");
          notify();
        }
      });
  };
  let x = 1;
  return (
    <TableContainer component={Paper}>
      <ToastContainer />
      <h3 className="p-4 text-center">All Booking Details</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Serial</TableCell>
            <TableCell align="left">Patient Name</TableCell>
            <TableCell align="left">Service Name</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Payment Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appoitment) => (
            <TableRow key={appoitment._id}>
              <TableCell align="left">{x++}</TableCell>
              <TableCell align="left">{appoitment.patientName}</TableCell>
              <TableCell align="left">{appoitment.serviceName}</TableCell>
              <TableCell align="left">{appoitment.time}</TableCell>
              <TableCell align="left">{appoitment.status}</TableCell>
              {appoitment.status != "paid" && (
                <TableCell align="left">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(appoitment?._id)}
                  >
                    Cancel
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingDetails;
