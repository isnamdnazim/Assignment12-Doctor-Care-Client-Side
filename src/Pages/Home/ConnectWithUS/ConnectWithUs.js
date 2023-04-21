import React, { useState } from "react";
import emailjs from "@emailjs/browser";
const ConnectWithUs = () => {
  const [success, setSuccess] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gydqazn",
        "template_t03w49j",
        e.target,
        "Z8ba0On769D3AGlwW"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          alert(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div
      className="container p-4"
      style={{ background: "#41485c", color: "#fff" }}
    >
      <div className="text-center">
        <h6 style={{ color: "#5fc8c8" }}>Contact</h6>
        <h4>Always Connect With Us</h4>
      </div>
      <form action="" className="w-50 mx-auto" onSubmit={sendEmail}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="email@example.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Message</label>
          <textarea
            name="message"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        {success && (
          <p className="text-success fw-bold bg-white p-2">
            Message Send successfully
          </p>
        )}
        <div className="text-center">
          <button
            style={{
              background: "#17d2ba",
              color: "#fff",
              border: "0",
              padding: "8px 50px",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnectWithUs;
