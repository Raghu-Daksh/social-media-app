import React from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.jpg";
import Pins from "./Pins";

import { userQuery } from "../utils/data";
import { Link, Route, Routes } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =  fetchUser();

  // console.log("userInfo ", userInfo);
  // console.log(userInfo?.googleId);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    // console.log("query ", query);
    client
      .fetch(query)
      .then((data) => {
        // console.log("data", data);
        setUser(data[0]);
      })
      .catch((e) => {
        // console.log("cllient error", e);
      });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  // console.log(user);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo2} alt="logo" className="w-28 h-12 object-cover" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="userImage" className="w-9 h-9 rounded-full" />  
            <h1>{user?.email}</h1>
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userID" element={<UserProfile />} />
          <Route exact path="/*" element = {<Pins user={user && user}  />} />
        </Routes>
      </div>
    </div>
  );
};
export default Home;
