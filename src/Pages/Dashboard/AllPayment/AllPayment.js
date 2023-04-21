import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllPayment = () => {
  const [allPayments, setAllPayments] = useState([]);
  const notify = () => toast.warn("booking cancel successfully!");

  const date = new Date();
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const url = `http://localhost:5003/allpayments?date=${date.toLocaleDateString()}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAllPayments(data));
    }
    return () => {
      unmounted = true;
    };
  }, [allPayments]);
  const handleDelete = (id) => {
    fetch(`http://localhost:5003/allpayments/${id}`, {
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
      <h3 className="p-4 text-center">Todays Payment Status</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Serial</TableCell>
            <TableCell align="left">Transaction ID</TableCell>
            <TableCell align="left">Patient Name</TableCell>
            <TableCell align="left">Service Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Payment Status</TableCell>
            <TableCell align="left">Date</TableCell>
            {/* <TableCell align="left">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allPayments.map((appoitment) => (
            <TableRow key={appoitment._id}>
              <TableCell align="left">{x++}</TableCell>
              <TableCell align="left">{appoitment._id}</TableCell>
              <TableCell align="left">{appoitment.patientName}</TableCell>
              <TableCell align="left">{appoitment.serviceName}</TableCell>
              <TableCell align="left">{appoitment.price} BDT</TableCell>
              <TableCell align="left">{appoitment.status}</TableCell>
              <TableCell align="left">{appoitment.date}</TableCell>
              {/* <TableCell align="left">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(appoitment?._id)}
                >
                  Delete
                </button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllPayment;
