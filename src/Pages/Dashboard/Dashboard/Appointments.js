import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Appointments = ({ date }) => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5003/appointments?email=${
      user.email
    }&date=${date.toLocaleDateString()}`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [date]);
  return (
    <div>
      <h2>Appointments : {appointments.length}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell left="center">Doctor Name</TableCell>
              <TableCell left="center">Schedule</TableCell>
              <TableCell left="center">Service</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell component="th" scope="row">
                  {appointment.patientName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {appointment.doc}
                </TableCell>
                <TableCell align="left">{appointment.time}</TableCell>
                <TableCell align="left">{appointment.serviceName}</TableCell>
                <TableCell align="left">
                  {appointment.payment ? (
                    "Paid"
                  ) : (
                    <Link to={`/dashboard/payment/${appointment._id}`}>
                      <button>pay</button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Appointments;
