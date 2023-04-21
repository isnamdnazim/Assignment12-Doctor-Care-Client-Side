import React, { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Input, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

const Services = () => {
  const [service, setService] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [uId, setUid] = useState("");
  const notify = () => toast.warn("Service deleted successfully!");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetch("http://localhost:5003/service")
        .then((res) => res.json())
        .then((data) => setService(data));
    }
    return () => {
      unmounted = true;
    };
  }, [service]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("time", time);
    formData.append("space", space);
    formData.append("price", price);
    formData.append("image", image);

    fetch("http://localhost:5003/services", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("Doctors added Successfully");
          console.log("doctor added successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5003/services/${id}`, {
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
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark me-2 " onClick={handleOpen}>
          Add service
        </button>
      </div>
      <table className="table caption-top">
        <thead>
          <tr>
            <th scope="col">Serial</th>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th scope="col">Price</th>
            <th scope="col">Space</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {service.map((service) => (
            <tr key={service._id}>
              <td>{x++}</td>
              <td>{service.name}</td>
              <td>{service.time}</td>
              <td>{service.price}</td>
              <td>{service.space}</td>
              <td>
                <Link to={`/dashboard/update/${service._id}`}>
                  <button className="btn btn-info me-2">Update</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(service?._id)}
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

export default Services;
