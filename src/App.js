import React from "react";
import Manage from "./pages/Manage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";

 export default function App()
 {
    return (
      <div className="main-container">
        <Header />
        <Manage />
      </div>
    )
 }