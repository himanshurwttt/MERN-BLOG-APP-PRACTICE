import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { OnlyAdminPrivateRoute } from "./components/OnlyAdminPrivateRoute";
import { CreatePost } from "./pages/CreatePost";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        r<Route path="/" element={<Home />} />
        r<Route path="/about" element={<About />} />
        r<Route path="/projects" element={<Projects />} />
        r<Route path="/sign-in" element={<SignIn />} />
        r<Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          r<Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          r<Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
