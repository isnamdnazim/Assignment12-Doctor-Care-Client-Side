import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
const DoctorCheck = ({ date }) => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const url = `http://localhost:5003/appoint?date=${date.toLocaleDateString()}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [date]);
  let x = 1;
  return (
    <TableContainer component={Paper}>
      <h3 className="p-4 text-center">Todays Appoitment List</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Serial Number</TableCell>
            <TableCell align="left">Patient Name</TableCell>
            <TableCell align="left">Service Name</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appoitment) => (
            <TableRow key={appoitment._id}>
              {user?.displayName == appoitment.doc &&
                appoitment.status == "paid" && (
                  <>
                    <TableCell align="left">{x++}</TableCell>
                    <TableCell align="left">{appoitment.patientName}</TableCell>
                    <TableCell align="left">{appoitment.serviceName}</TableCell>
                    <TableCell align="left">{appoitment.time}</TableCell>
                  </>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorCheck;
