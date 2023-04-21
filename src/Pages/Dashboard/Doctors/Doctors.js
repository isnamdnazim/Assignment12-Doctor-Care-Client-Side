import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Input, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetch("http://localhost:5003/doctor")
        .then((res) => res.json())
        .then((data) => setDoctor(data));
    }

    return () => {
      unmounted = true;
    };
  }, [doctor]);

  // delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5003/doctor/${id}`, {
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
          toast.warn("doctor deleted successfully!");
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };
  let x = 1;
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <table className="table caption-top">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Designation</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {doctor.map((doctor) => (
            <tr key={doctor?._id}>
              <td>{x++}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.designation}</td>
              <td>
                <img
                  style={{ width: "80px" }}
                  src={`data:image/jpeg;base64,${doctor?.image}`}
                  alt=""
                />
              </td>
              <td>
                <Link to={`/dashboard/updateDoctor/${doctor._id}`}>
                  <button className="btn btn-info me-2">Update Doctors</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(doctor?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form>
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              onChange={(e) => setName(e.target.value)}
              id="outlined-size-small"
              placeholder="ServiceName"
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time"
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              onChange={(e) => setSpace(e.target.value)}
              id="outlined-size-small"
              placeholder="Space"
              size="small"
            />
            <Input
              accept="image/*"
              id="contained-button-file"
              onChange={(e) => setImage(e.target.files[0])}
              multiple
              type="file"
            />
            <button onClick={handleSubmit} className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Doctors;
