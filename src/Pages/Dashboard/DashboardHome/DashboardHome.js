import * as React from "react";
import { Grid } from "@mui/material";
import Calendar from "../../Shared/Calendar/Calendar";
import Appointments from "../Appointments/Appointments";
import BookingDetails from "../BookingDetails/BookingDetails";
import useAuth from '../../../Hooks/useAuth';
import Doctor from '../../Home/Doctor/Doctor';
import DoctorCheck from "../DoctorCheck/DoctorCheck";

const DashboardHome = () => {
  const [date, setDate] = React.useState(new Date());
  const {admin,doctor}=useAuth();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <Calendar date={date} setDate={setDate}></Calendar>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        { admin?<BookingDetails date={date}></BookingDetails>:
        doctor?<DoctorCheck date={date}></DoctorCheck>:!admin && !doctor?<Appointments date={date}></Appointments>:null
          }
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
