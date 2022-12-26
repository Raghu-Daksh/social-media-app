import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import {gapi} from 'gapi-script'
import { useEffect } from "react";
import {client} from '../client'

const Login = () => {

  const navigate = useNavigate()
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN ;

  useEffect(()=>{
    gapi.load("client:auth2",()=> gapi.auth2.init({clientId : clientId}) )
  },[])

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))
    const {name, googleId, imageUrl} =  response.profileObj;
    const doc = {
      _id : googleId,
      _type : 'user' ,
      userName: name,
      image: imageUrl
    }

    client.createIfNotExists(doc)
      .then(()=>{
          navigate('/', {replace: true});
    });
  };


  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={shareVideo}
          type="video/mp4"
          controls={false}
          loop
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl ">
            <GoogleLogin
              clientId={clientId }
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                >
                  <FcGoogle className="mr-4" />
                  Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
