import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateService = () => {
  const { updateId } = useParams();
  const [sigleService, setSingleService] = useState({});
  const nameRef = useRef();
  const timeRef = useRef();
  const spaceRef = useRef();
  const priceRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5003/services/${updateId}`)
      .then((res) => res.json())
      .then((data) => setSingleService(data));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const time = timeRef.current.value;
    const space = spaceRef.current.value;
    const price = priceRef.current.value;
    const newInfo = {
      name: name,
      time: time,
      space: space,
      price: price,
    };
    console.log(newInfo);
    const url = `http://localhost:5003/services/${updateId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newInfo),
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
        <label for="exampleFormControlInput1" class="form-label">
          Id
        </label>
        <input className="form-control" type="text" value={sigleService._id} />
        <label for="exampleFormControlInput1" class="form-label">
          Service Name
        </label>
        <input
          ref={nameRef}
          className="form-control"
          type="text"
          defaultValue={sigleService.name}
        />
        <label for="exampleFormControlInput1" class="form-label">
          Time
        </label>
        <input
          className="form-control"
          ref={timeRef}
          type="text"
          defaultValue={sigleService.time}
        />
        <label for="exampleFormControlInput1" class="form-label">
          Space
        </label>
        <input
          ref={spaceRef}
          className="form-control"
          type="text"
          defaultValue={sigleService.space}
        />
        <label for="exampleFormControlInput1" class="form-label">
          Price
        </label>
        <input
          ref={priceRef}
          className="form-control"
          type="text"
          defaultValue={sigleService.price}
        />
        <button className="btn btn-success mt-3" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateService;
