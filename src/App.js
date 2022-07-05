import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Manage from "./pages/Manage";
import Header from "./components/Header";
import Profile from "./pages/Profile";

 export default function App()
 {
    return (
      <div className="main-container">
        <Header />
        <Profile />
      </div>
    )
 }