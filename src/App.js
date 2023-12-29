import React, { useEffect } from "react";
import Header from "./Components/Header";
import Blogs from "./Components/Blogs";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetail";
import AddBlog from "./Components/AddBlog";
import Homepage from "./Components/Homepage";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Components/Signup";
import Missing from "./Components/Missing";
import LoginFirst from "./Components/LoginFirst";
import { authActions } from "./store";
import OpenBlog from "./Components/OpenBlog";
import { ThemeProvider, createTheme } from "@mui/material";
import MyAccount from "./Components/MyAccount";

//Custom font for mui components
const theme = createTheme({
  typography: {
    fontFamily: [
      'poppins', 'sans-serif'
    ].join(','),
  },});


const App = () => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(()=> {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/myaccount/:id" element={<MyAccount />} />
              <Route path="/openblog/:id" element={<OpenBlog />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="*" element={<Missing />} />
            </>
          )}
           <Route path="/" element={<Homepage />} />
          <Route path="*" element={<LoginFirst />} />
        </Routes>
      </main>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
