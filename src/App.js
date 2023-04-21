import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Appointment from "./Pages/Appointment/Appointment/Appointment";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Pages/Login/PrivateRoute.js/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import "./App.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <PrivateRoute path="/appointment">
              <Appointment></Appointment>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
      {/* <MessengerCustomerChat
        pageId="114122123833691"
        appId="1827708297439143
"
      /> */}
      ,
    </div>
  );
};

export default App;
