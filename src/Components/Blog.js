import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../store/config";

const Blog = ({ title, description, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  //DeleteRequest
  const deleteRequest = async (e) => {
    try {
      const res = await axios.delete(`${API_URL}api/blog/${id}`);
      const data = res.data;
      navigate("/deleted")
      return data;
    } catch (err) {
      console.log();
    }
  };
  //HandeDelete
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this?');
    if(confirmDelete){
      deleteRequest()
    }else{
      navigate("/blogs")
    }
  };

  //HandleOpenFullBlog
  const handleOpenFullBlog = () => {
    navigate(`/openblog/${id}`)
    
  }
  return (
    <div>
      <form>
        <Card
          sx={{
            width: "50%",
            margin: "auto",
            mt: 2,
            mb: 2,
            ":hover": { boxShadow: "3px 3px 5px #ccc" },
          }}
        >
          <CardActionArea onClick={handleOpenFullBlog}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#EF626C" }}  l="avatar">
                  <b>
                    {userName ? userName.charAt(0).toUpperCase() : <Avatar />}
                  </b>
                </Avatar>
              }
              title={<b>{userName}</b>}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              image={image}
              sx={{ padding: 1, margin: "auto", width: "60%" }}
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
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {(description).length <=25 ? description : `${(description).slice(0,150)}...`}
              </Typography>
            </CardContent>
          </CardActionArea>
          {isUser && (
                <Box>
                  <IconButton onClick={handleDelete} aria-label="Delete a Blog">
                    <Tooltip title="Delete">
                      <DeleteForeverIcon
                        sx={{
                          color: "white",
                          background: "#D33F49",
                          borderRadius: "50%",
                          padding: 0.5,
                        }}
                      />
                    </Tooltip>
                  </IconButton>
                  <IconButton onClick={handleEdit} aria-label="Edit a Blog">
                    <Tooltip title="Edit">
                      <EditIcon
                        sx={{
                          color: "white",
                          background: "#3F7CAC",
                          borderRadius: "50%",
                          padding: 0.5,
                        }}
                      />
                    </Tooltip>
                  </IconButton>
                </Box>
              )}
        </Card>
      </form>
    </div>
  );
};

export default Blog;
