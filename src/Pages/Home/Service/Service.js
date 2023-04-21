import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Service = (props) => {
  const { name, description, img } = props.service;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ minWidth: 275, textAlign: "center", boxShadow: "0" }}>
        <CardContent>
          <CardMedia
            component="img"
            sx={{ width: "auto", marginX: "auto", padding: "10px 0" }}
            image={img}
            alt="Paella dish"
          />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} component="div">
            {description}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Grid>
  );
};

export default Service;
