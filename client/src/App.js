
// import "./App.css";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import Pins from "./container/Pins";
import { fetchUser } from "./utils/fetchUser";


function App() {

  const navigate= useNavigate();

  useEffect(()=>{
    const user = fetchUser();

    if(!user){
      navigate('/login');
    }
  },[])

  return (
    <Routes>
      <Route exact path="/login" element = {<Login />} />
      <Route exact path="/*" element = {<Home />} />
    </Routes>
  )
}

export default App;
