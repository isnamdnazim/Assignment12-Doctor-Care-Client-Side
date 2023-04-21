import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorAttendance = () => {
  const [attendance, setAttendance] = useState("");
  const [filterId, setFilterId] = useState("");
  const [allDoctor, setAllDoctor] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetch("http://localhost:5003/doctor")
        .then((res) => res.json())
        .then((data) => setAllDoctor(data));
    }
    return () => {
      unmounted = true;
    };
  }, []);
  useEffect(() => {
    allDoctor.map((doc) => {
      if (doc.email === user.email) {
        setFilterId(doc._id);
      }
    });
  }, [allDoctor]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");

    const userInfo = {
      id: filterId,
      attendance: attendance,
    };
    const url = `http://localhost:5003/attendDoctor`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
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
        <h5 className="pt-3 pb-3">Availability</h5>
        <select
          className="form-select"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          aria-label="Default select example"
        >
          <option>Select</option>
          <option>Available</option>
          <option>Not Available</option>
        </select>
        <input
          type="submit"
          className="btn btn-info mt-4 text-white fw-bold"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default DoctorAttendance;
