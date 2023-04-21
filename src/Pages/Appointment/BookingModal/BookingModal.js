import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import bookingModalCss from "./BookingModal.module.css";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const bookingsTime = [
  {
    id: 1,
    time: "10.00 AM - 8.00 PM",
  },
  {
    id: 2,
    time: "10.00 AM - 8.00 PM",
  },
  {
    id: 3,
    time: "10.00 AM - 8.00 PM",
  }
  
];
// const people = [
//   {
//     name: "James",
//     age: 31,
//   },
// ];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BookingModal = ({
  open,
  handleClose,
  booking,
  date,
  setBookingSuccess,
}) => {
  const { name, time, price } = booking;
  const [doc, setDoc] = useState("");
  const [docc, setDocc] = useState("");
  const [checkTime, setCheckTime] = useState({});
  const [appoint, setApp] = useState([]);
  const [check, setCheck] = useState([]);
  const { user, token } = useAuth();
  useEffect(() => {
    const url = `http://localhost:5003/appointments?email=${
      user.email
    }&date=${date.toLocaleDateString()}`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApp(data));
  }, [date]);
  //for those field which will not touch or type
  const initialBookingInfo = {
    patientName: user.displayName,
    email: user.email,
    phone: "",
  };
  const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);
  const [doctors, setDoctors] = useState([]);
  const [status, setStatus] = useState("pendeing");
  const handleBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...bookingInfo };
    newInfo[field] = value;
    console.log(newInfo);
    setBookingInfo(newInfo);
  };
  const handleBookSubmit = (e) => {
    //collect data
    const appointment = {
      ...bookingInfo,
      time,
      doc,
      price,
      serviceName: name,
      date: date.toLocaleDateString(),
      status,
    };
    //Send to the server
    fetch("http://localhost:5003/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setBookingSuccess(true);
          handleClose();
        }
      });
    handleClose();
    e.preventDefault();
  };
  useEffect(() => {
    fetch("http://localhost:5003/doctor")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [timeBook, setTimeBook] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setDoc(event.target.value);
  };
  const handleTimeChange = (event) => {
    const {
      target: { value },
    } = event;
    setTimeBook(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    setDocc(event.target.value);
  };


  useEffect(() => {
    
      appoint.filter((app) => setCheck(app.time));
    
  }, [appoint]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <form>
            {/* <div>
              {people
                .filter((person) => person.age < 60)
                .map((filteredPerson) => (
                  <li>{filteredPerson.name}</li>
                ))}
            </div> */}

            <FormControl sx={{ mt: 3, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Select</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleTimeChange}
                value={timeBook}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {bookingsTime.map((name) => (
                  <MenuItem
                    key={name.id}
                    style={getStyles(name, personName, theme)}
                    value={name.time}
                  >
                    {name.time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 3, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Select</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {doctors.map(
                  (name) =>
                    name.attendance == "Available" && (
                      <MenuItem
                        key={name._id}
                        value={name.name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name.name}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              defaultValue={user?.displayName}
              name="patientName"
              onBlur={handleBlur}
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              defaultValue={user?.email}
              name="email"
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              defaultValue="+88"
              name="phone"
              onBlur={handleBlur}
              size="small"
            />
            <TextField
              sx={{ marginTop: "20px", width: "90%" }}
              id="outlined-size-small"
              defaultValue={date.toDateString()}
              disabled
              size="small"
            />
            <Button
              sx={{ marginTop: "20px" }}
              className={bookingModalCss.btn}
              variant="contained"
              onClick={handleBookSubmit}
            >
              Submit
            </Button>
            <Button
              sx={{ marginTop: "20px", marginLeft: "125px" }}
              className={bookingModalCss.btn1}
              variant="contained"
              onClick={handleClose}
            >
              Cencel
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookingModal;
