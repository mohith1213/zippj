// src/UseCase1/Main.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import HomePage from './HomePage/HomePage';
import AboutUs from './AboutUs/AboutUs';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Footer from './Footer/Footer';
import './Main.css';

function Main() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
