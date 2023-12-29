import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { API_URL } from "../store/config";

const AddBlog = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null, // Use null for the file input
  });

  // State to manage loading and error states
  const [loading, setLoading] = useState(false);

  // HandleChange function to update state on input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    }));
  };

  // SendRequest function to make an API request and navigate on success
  const sendRequest = async () => {
    try {
      setLoading(true);

      // Convert image file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        // Make the API request with the base64-encoded image
        axios
          .post(`${API_URL}api/blog/add`, {
            title: inputs.title,
            description: inputs.description,
            image: imageDataUrl,
            user: localStorage.getItem("userId"),
          })
          .then((res) => {
            navigate("/myblogs");
          })
          .catch((err) => {
            console.error(err);
            throw err;
          })
          .finally(() => setLoading(false));
      };

      reader.readAsDataURL(inputs.image);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  // handleCancel function to handle the "Cancel" button click and navigate to the desired page
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      {loading && (
        <Box sx={{ textAlign: "center", marginTop: "10rem" }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={450}
            padding={3}
            marginLeft={"auto"}
            marginRight={"auto"}
            display={"flex"}
            flexDirection={"column"}
            width={"80%"}
            textAlign={"center"}
            gap={3}
          >
            {/* Form Title */}
            <Typography variant="h3">Post Your Blog</Typography>

            {/* Title Input */}
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              label="Title"
            />

            {/* Description Input */}
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              label="Description"
            />

            {/* Image Input */}
            <TextField
            aria-label="Image"
              name="image"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />

            {/* Add Blog Button with Tooltip */}
            <Tooltip disableInteractive={true} title="Add Blog">
              <Button
                type="submit"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 3,
                  width: "110px",
                  backgroundColor: "#335CD7",
                  ":hover": { backgroundColor: "white", color: "#335CD7" },
                }}
              >
                <CheckIcon /> Add
              </Button>
            </Tooltip>

            {/* Cancel Button with Tooltip */}
            <Tooltip disableInteractive={true} title="Cancel">
              <Button
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 3,
                  width: "110px",
                  backgroundColor: "#EF626C",
                  ":hover": { backgroundColor: "white", color: "#EF626C" },
                }}
              >
                <HighlightOffIcon /> Cancel
              </Button>
            </Tooltip>
          </Box>
        </form>
      )}
    </div>
  );
};

export default AddBlog;
