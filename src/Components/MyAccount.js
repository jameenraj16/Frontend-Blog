import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../store/config";

const Signup = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    dob:"",
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
    const id = params.id;
    try {
      const res = await axios.put(
        `${API_URL}api/user/update/${id}`,
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          dob:inputs.dob,
          email: inputs.email,
          password: inputs.password,
        }
      );
      const data = await res.data;
      alert("Updated successful");
      navigate("/blogs");
      return data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unable to update");
      } else {
        console.log(err);
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
          marginTop={8}
          borderRadius={3}
        >
          <Typography
            style={{ fontWeight: "bold", color: "#34312D", fontSize: "35px" }}
          >
            Update Your Details!
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
            Update
          </Button>
          <Button
            onClick={() => navigate("/myBlogs")}
            sx={{
              fontWeight: "bold",
              color: "#EF626C",
              textTransform: "none",
              borderRadius: 3,
              width: "110px",
              backgroundColor: "#white",
              ":hover": { backgroundColor: "#EF626C", color: "white" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
