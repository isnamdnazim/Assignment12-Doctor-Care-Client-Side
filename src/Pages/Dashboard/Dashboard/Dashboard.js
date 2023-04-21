import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import dashboardCss from "./Dashboard.module.css";
import { Button, Divider } from "@mui/material";
import DashboardHome from "../DashboardHome/DashboardHome";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import AddDoctors from "../AddDoctor/AddDoctors";
import useAuth from "../../../Hooks/useAuth";
import AdminRoute from "../../Login/AdminRoute/AdminRoute";
import Payment from "../Payment/Payment";
import Services from "../Services/Services";
import UpdateService from "../UpdateService/UpdateService";
import DoctorAttendance from "../DoctorAttendance/DoctorAttendance";
import UpdateDoctors from "../UpdateDoctors/UpdateDoctors";
import Doctors from "../Doctors/Doctors";
import { useEffect } from "react";
import DoctorRoute from "../../Login/DoctorRoute/DoctorRoute";
import AllPayment from "../AllPayment/AllPayment";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { admin, doctor, user, token } = useAuth();
  const [date, setDate] = React.useState(new Date());
  const [appointments, setAppointments] = React.useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const url = `http://localhost:5003/appointments?email=${
        user.email
      }&date=${date.toLocaleDateString()}`;
      fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    }
    return () => {
      unmounted = true;
    };
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={dashboardCss.side_menu}>
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          fontSize: "26px",
        }}
      >
        <Typography
          style={{
            padding: " 17px 10px",
            fontSize: "20px",
            background: "#1976D2",
            color: "#fff",
          }}
        >
          Dental MediCare
        </Typography>
      </NavLink>

      <Divider></Divider>

      <Toolbar />
      <NavLink
        to="/appointment"
        style={{ textDecoration: "none", padding: "10px" }}
      >
        {!admin && !doctor && <Button>Appointment</Button>}
      </NavLink>
      <br />

      <br />
      {doctor && (
        <NavLink
          to={`${url}/attendance`}
          style={{ textDecoration: "none", padding: "10px" }}
        >
          <Button>Attendance</Button>
        </NavLink>
      )}
      <br />
      <NavLink
        to={`${url}`}
        style={{ textDecoration: "none", padding: "10px" }}
      >
        <Button>Dashboard</Button>
      </NavLink>
      <br />
      {admin && (
        <Box>
          {/* <NavLink
            to={`${url}/makeAdmin`}
            style={{ textDecoration: "none", padding: "10px" }}
          >
            <Button>Make Admin</Button>
          </NavLink> */}
          <NavLink
            to={`${url}/addDoctor`}
            style={{ textDecoration: "none", padding: "10px" }}
          >
            <Button>Add Doctor</Button>
          </NavLink>
          <br />
          <NavLink
            to={`${url}/service`}
            style={{ textDecoration: "none", padding: "10px" }}
          >
            <Button>Services</Button>
          </NavLink>
          <br />
          <NavLink
            to={`${url}/doctors`}
            style={{ textDecoration: "none", padding: "10px" }}
          >
            <Button>Doctors</Button>
          </NavLink>
          <br />
          <NavLink
            to={`${url}/allpayments`}
            style={{ textDecoration: "none", padding: "10px" }}
          >
            <Button>All Payment</Button>
          </NavLink>
        </Box>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <DashboardHome />
          </Route>
          <Route path={`${path}/payment/:appointmentId`}>
            <Payment />
          </Route>
          <Route path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </Route>

          <AdminRoute path={`${path}/makeAdmin`}>
            {/* <MakeAdmin /> */}
          </AdminRoute>
          <AdminRoute path={`${path}/addDoctor`}>
            <AddDoctors />
          </AdminRoute>
          <AdminRoute path={`${path}/service`}>
            <Services />
          </AdminRoute>
          <AdminRoute path={`${path}/doctors`}>
            <Doctors />
          </AdminRoute>
          <AdminRoute path={`${path}/update/:updateId`}>
            <UpdateService />
          </AdminRoute>
          <AdminRoute path={`${path}/updateDoctor/:doctorId`}>
            <UpdateDoctors />
          </AdminRoute>
          <AdminRoute path={`${path}/allpayments`}>
            <AllPayment></AllPayment>
          </AdminRoute>
          <DoctorRoute>
            <DoctorAttendance></DoctorAttendance>
          </DoctorRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
