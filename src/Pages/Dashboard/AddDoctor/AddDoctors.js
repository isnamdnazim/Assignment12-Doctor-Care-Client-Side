import { Button, Input, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";



import useAuth from "../../../Hooks/useAuth";

const AddDoctors = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [attendance, setAttendance] = useState("available");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const { registerDoctor } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("designation", designation);
    formData.append("attendance", attendance);
    formData.append("image", image);
    fetch("http://localhost:5003/doctors", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("Doctors added Successfully");
          registerDoctor(email, "123456", name);
          console.log("doctor added successfully");
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
  };
  return (
    <div className="container p-3 mt-3">
      <h5 className="fw-bold">Add Doctor</h5>
      <form>
        <TextField
          sx={{ width: "50%" }}
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          required
        />{" "}
        <br />
        <br />
        <TextField
          sx={{ width: "50%" }}
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          required
        />{" "}
        <br />
        <br />
        <TextField
          sx={{ width: "50%" }}
          label="Phone"
          type="phone"
          onChange={(e) => setPhone(e.target.value)}
          variant="standard"
          required
        />{" "}
        <br />
        <br />
        <TextField
          sx={{ width: "50%" }}
          label="Role"
          type="text"
          onChange={(e) => setRole(e.target.value)}
          variant="standard"
          required
        />{" "}
        <br />
        <br />
        <TextField
          sx={{ width: "50%" }}
          label="Designation"
          type="text"
          onChange={(e) => setDesignation(e.target.value)}
          variant="standard"
          required
        />{" "}
        <br />
        <br />
        <Input
          accept="image/*"
          id="contained-button-file"
          onChange={(e) => setImage(e.target.files[0])}
          multiple
          type="file"
        />{" "}
        <br /> <br />
        <Button
          onClick={handleSubmit}
          variant="contained"
          component="span"
          type="submit"
        >
          Add Doctor
        </Button>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddDoctors;
