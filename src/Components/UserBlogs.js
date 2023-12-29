import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../store/config";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${API_URL}api/blog/user/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data?.user));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "10rem" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
