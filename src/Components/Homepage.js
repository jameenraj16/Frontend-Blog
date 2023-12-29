import React from "react";
import { Typography, Button } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const handleClick = () => {
      let user = localStorage.getItem("userId")
      if(!user) {
        navigate("/auth")
      }else navigate("/blogs")
  };
  return (
    <div style={{ textAlign: "center", padding: "20px", marginTop: "200px" }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Our Blogging Community
      </Typography>

      <Typography variant="h5">
        Read interesting articles, discover insightful stories, and stay updated
        with the latest trends in our blog.
      </Typography>

      <div>
        <Button
          onClick={handleClick}
          
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "white",
              margin: 1,
              marginTop:3,
              borderRadius: 3,
              padding: "0.8rem",
              backgroundColor: "#34312D",
              
              ":hover": { backgroundColor: "#white", color: "#34312D" },
          }}
        >
         <KeyboardArrowRightIcon sx={{padding:0.5, fontWeight:"blod"}}/> Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;
