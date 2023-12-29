import {
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../store/config";

const OpenBlog = () => {
  const [blog, setBlog] = useState();
  const params = useParams();
  const id = params.id;

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
    });
  }, [id]);
  return (
    <div>
      {blog && (
        <Card
          sx={{
            width: "90%",
            margin: "auto",
            mt: 2,
            mb: 2,
            ":hover": { boxShadow: "3px 3px 5px #ccc" },
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#EF626C" }} aria-label="avatar"></Avatar>
            }
            title={<b>{blog.title}</b>}
          />
          <CardMedia
            component="img"
            image={blog.image}
            sx={{ padding: 1, margin: "auto", height:"30rem",width:"50rem" }}
          />
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              border: "none",
              height: "2px",
              color: "#CCC",
              backgroundColor: "#ccc",
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpenBlog;
