import { Input } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDoctors = () => {
  const [sigleDoctor, setSingleDoctor] = useState({});
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const designationRef = useRef();
  const [image, setImage] = useState(null);

  const { doctorId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5003/doctor/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setSingleDoctor(data));
  }, [sigleDoctor]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const designation = designationRef.current.value;
    const photo = image;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    formData.append("image", image);

    const url = `http://localhost:5003/updatDoctor/${doctorId}`;
    fetch(url, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("updated successfully!");
        }
      });
  };
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <form>
        <label className="form-label">Id</label>
        <input className="form-control" type="text" value={sigleDoctor._id} />
        <label className="form-label">Doctor Name</label>
        <input
          ref={nameRef}
          className="form-control"
          type="text"
          defaultValue={sigleDoctor.name}
        />
        <label className="form-label">Email</label>
        <input
          className="form-control"
          ref={emailRef}
          type="email"
          defaultValue={sigleDoctor.email}
        />
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          ref={phoneRef}
          type="phone"
          defaultValue={sigleDoctor.phone}
        />
        <label className="form-label">Designation</label>
        <input
          className="form-control"
          ref={designationRef}
          type="designation"
          defaultValue={sigleDoctor.designation}
        />
        <Input
          sx={{ padding: "10px" }}
          accept="image/*"
          id="contained-button-file"
          onChange={(e) => setImage(e.target.files[0])}
          multiple
          type="file"
        />{" "}
        <br />
        <br />
        <button className="btn btn-success mt-3" onClick={handleUpdate}>
          UpDate Doctor
        </button>
      </form>
    </div>
  );
};

export default UpdateDoctors;
