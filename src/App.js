import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Manage from "./pages/Manage";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";

 export default function App()
 {
    const location = useLocation();
    return (
      <div className="main-container">
        <Header />
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Manage />} />
          <Route path='/profile/:type' element={<Profile />} />
        </Routes>
      </div>
    )
 }