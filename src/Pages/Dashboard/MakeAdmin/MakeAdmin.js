import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle, Button } from "@mui/material";
import useAuth from "../../../Hooks/useAuth";
const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5003/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data);
          setSuccess(true);
        }
      });
    e.preventDefault();
  };
  return (
    <div className="container p-3 ">
      <h5 className="mt-5 fw-bold">Make An Admin</h5>
      <form>
        <TextField
          sx={{ width: 0.5 }}
          id="standard-basic"
          label="Standard"
          variant="standard"
          type="email"
          onBlur={handleOnBlur}
        />
        <div>
          <Button sx={{ mt: 2 }} type="submit" variant="contained" onClick={handleAdminSubmit}>
            Make Admin
          </Button>
        </div>
      </form>
      {success && <Alert severity="success">Made Admin successfully!</Alert>}
    </div>
  );
};

export default MakeAdmin;
