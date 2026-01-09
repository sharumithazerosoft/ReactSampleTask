import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import RegistrationForm from "./component/RegistrationForm";
import Dashboard from "./component/Dashboard";
import Header from "./component/Header";
import Footer from "./component/Footer";
import './App.css';

function App() {
  return (
    <Router basename="/reactsampletask">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
