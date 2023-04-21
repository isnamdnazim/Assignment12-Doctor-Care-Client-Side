import { CircularProgress } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const DoctorRoute = ({ children, ...rest }) => {
  const { user, isLoading, doctor } = useAuth();
  if (isLoading) {
    return <CircularProgress></CircularProgress>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && doctor ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default DoctorRoute;
