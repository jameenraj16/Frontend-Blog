import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import FolderIcon from "@mui/icons-material/Folder";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LogoutIcon from "@mui/icons-material/Logout";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const id = localStorage.getItem("userId")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);

  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to Logout?");

    if (userConfirmed) {
      dispatch(authActions.logout());
      localStorage.clear();
      navigate("/");
    } else {
      console.log("User cancelled logout");
    }
  };

  return (
    <AppBar position="sticky" sx={{ background: "white" }}>
      <Toolbar>
        <RssFeedIcon
          sx={{
            color: "#EEA243",
            marginBottom: "5px",
            borderRadius: "8px",
          }}
          fontSize="large"
        />
        <Typography
          variant="h4"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            WebkitBackgroundClip: "text",
            fontWeight: "bold",
          }}
        >
          <span style={{color:"#2b2d42"}}>Blog</span><span style={{color:"#ef476f"}}>Via</span>
        </Typography>
        {isLoggedIn && (
          <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
            <Tabs value={value} onChange={(e, value) => setValue(value)}>
              <Tab
                icon={<FolderIcon />}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                icon={<FolderSharedIcon />}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                icon={<CreateNewFolderIcon />}
                LinkComponent={Link}
                to="blogs/add"
                label="Add Blogs"
              />
            </Tabs>
          </Box>
        )}
        {!isLoggedIn && (
          <Box display="flex" marginLeft="auto">
            <Button
              LinkComponent={Link}
              to="/auth"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                background: "#34312D",
                color: "white",
                margin: 1,
                borderRadius: 3,
                ":hover": { color: "#34312D" },
              }}
            >
              Sign In
            </Button>
            <Button
              LinkComponent={Link}
              to="/signup"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#335CD7",
                margin: 1,
                borderRadius: 3,
                ":hover": { backgroundColor: "white", color: "#335CD7" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        {isLoggedIn && (
          <>
            <Button
            onClick={() => navigate(`/myaccount/${id}`)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "white",
                margin: 1,
                borderRadius: 3,
                backgroundColor: "#335CD7",
                ":hover": { backgroundColor: "#white", color: "#335CD7" },
              }}
            >
              <PortraitRoundedIcon
                sx={{
                  ":hover": { backgroundColor: "#white", color: "#34312D" },
                }}
              />
              My Account
            </Button>
            <Box>
              <Tooltip disableInteractive={true} title="Logout">
                <Button
                  onClick={() => handleLogout()}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "white",
                    margin: 1,
                    borderRadius: 3,
                    backgroundColor: "#34312D",
                    transition: "0.2s ease",
                    ":hover": { backgroundColor: "#white", color: "#34312D"  },
                  }}
                >
                  <LogoutIcon />
                </Button>
              </Tooltip>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
