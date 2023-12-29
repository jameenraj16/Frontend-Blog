import {
  Box,
  TextField,
  Typography,
  Button,
  InputLabel,
  Tooltip,
} from "@mui/material";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../store/config";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const params = useParams();
  const id = params.id;
  const [inputs, setInputs] = useState({});

  // HandleChange
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}api/blog/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);
  //SendRequest
  const sendRequest = async () => {
    try {
      const res = await axios.put(
        `${API_URL}api/blog/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //HandleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(navigate("/myBlogs"));
  };
  return (
    <div>
      {inputs && (
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
            gap={1.8}
          >
            <Typography variant="h3">Update Your Blog</Typography>
            <InputLabel sx={{ textAlign: "left" }}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />

            <InputLabel sx={{ textAlign: "left" }}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
            />

            <InputLabel sx={{ textAlign: "left" }}>Image</InputLabel>
            <TextField
              name="image"
              onChange={handleChange}
              value={inputs.image}
            />
            <Tooltip disableInteractive={true} title="Update Blog">
              <Button
                type="submit"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 3,
                  width: "110px",
                  backgroundColor: "#335CD7",
                  ":hover": { backgroundColor: "white", color: "#335CD7" },
                }}
              >
                <ArrowCircleUpIcon /> Update
              </Button>
            </Tooltip>

            <Tooltip disableInteractive={true} title="Cancel">
              <Button
                onClick={() => navigate("/myBlogs")}
                sx={{
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

export default BlogDetail;
