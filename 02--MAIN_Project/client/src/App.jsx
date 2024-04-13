import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        r<Route path="/" element={<Home />} />
        r<Route path="/about" element={<About />} />
        r<Route path="/dashboard" element={<Dashboard />} />
        r<Route path="/projects" element={<Projects />} />
        r<Route path="/sign-in" element={<SignIn />} />
        r<Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
