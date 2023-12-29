import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../store/config";

const Login = () => {
  //Demo Login
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State Handling
  const [inputs, setInputs] = useState({
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
  //SubmitRequest
  const submitRequest = async (e) => {
    try {
      const res = await axios.post(`${API_URL}api/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      localStorage.setItem("userId", data.user._id)
      dispatch(authActions.login());
      navigate("/blogs");
      return data;
    } catch (err) {
      alert("Incorrect username or password !");
    }
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest()
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="450px"
          height={"300px"}
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
            Login Your Account !
          </Typography>

          <TextField
            required
            onChange={handleChange}
            value={inputs.email}
            name="email"
            margin="normal"
            label="Email"
            type="email"
          />
          <TextField
            required
            onChange={handleChange}
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            label="Password"
          />
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
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
            Sign In
          </Button>
          <Button
            sx={{ borderRadius: 3 }}
            variant="contained"
            onClick={handleClick}
          >
            Demo Cedentials
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <span>
                <b>E-mail: </b>
              </span>{" "}
              demo123@gmail.com
            </Typography>
            <Typography sx={{ p: 2 }}>
              <span>
                <b>Password: </b>
              </span>{" "}
              123456
            </Typography>
          </Popover>
        </Box>
      </form>
    </div>
  );
};

export default Login;
