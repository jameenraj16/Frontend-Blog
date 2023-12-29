import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Blog from "./Blog";
import { Box } from "@mui/material";
import { API_URL } from "../store/config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${API_URL}api/blog`);
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  if (loading) {
    return <Box sx={{textAlign:"center", marginTop:"10rem"}}><CircularProgress/></Box>
  }

  if (error) {
    return <h1>No Blogs Found</h1>
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.firstName}
          />
        ))
      ) : (
        <h1>No Blogs Available</h1>
      )}
    </div>
  );
};

export default Blogs;
