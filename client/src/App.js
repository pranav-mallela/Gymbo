import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Manage from "./pages/Manage";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Machines from "./pages/Machines";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

 export default function App()
 {
    const location = useLocation();
    const [login, setLogin] = React.useState(false);
    return (
      <div className="main-container">
        <Header login={login} />
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/manage' element={<Manage login={login} setLogin={setLogin} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/machines' element={<Machines login={login} setLogin={setLogin} />} />
        </Routes>
      </div>
    )
 }