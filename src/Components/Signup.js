import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../store/config";

const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
  });
  //handleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //submitRequest
  const submitRequest = async (e) => {
    try {
      const res = await axios.post(`${API_URL}api/user/signup`, {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        dob: inputs.dob,
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      alert("Signup successful");
      navigate("/auth");
      return data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("user Already Found Try again with different Email !");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="450px"
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={10}
          margin="auto"
          marginTop={1}
          borderRadius={3}
        >
          <Typography
            style={{ fontWeight: "bold", color: "#34312D", fontSize: "35px" }}
          >
            Create Your Account !
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleChange}
                value={inputs.firstName}
                name="firstName"
                margin="normal"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={handleChange}
                value={inputs.lastName}
                name="lastName"
                margin="normal"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={inputs.dob}
                name="dob"
                margin="normal"
                type="date"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={inputs.email}
                name="email"
                margin="normal"
                label="Email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={inputs.password}
                name="password"
                margin="normal"
                type="password"
                label="Password"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I am 13 years of age or older and agree to the terms of the BlogVia User Agreement"
          />
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "white",
              margin: 1,
              borderRadius: 3,
              backgroundColor: "#335CD7",
              ":hover": { backgroundColor: "#white", color: "#335CD7" },
            }}
            style={{ width: "110px" }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            BlogVia {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
