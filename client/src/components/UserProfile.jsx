import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { useState, useEffect, React } from "react";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";

const randomImages =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
const activeBtnStyles =
  "bg-red-500 text-white p-2 font-bold rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black p-2 font-bold rounded-full outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userID } = useParams();

  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;

  console.log("usserid", userID);

  useEffect(() => {
    const query = userQuery(userID);

    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .catch((e) => {
        console.log("cllient error", e);
      });
  }, [userID]);

  useEffect(() => {
    if (text == "created") {
      const createdPinsQuery = userCreatedPinsQuery(userID);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userID);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userID]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col  justify-center items-center">
            <img
              src={randomImages}
              className="w-full h-370 2xl:h-510 shadowl object-cover"
              alt="banner-pic"
            />
            <img
              src={user?.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0">
              {userID == user._id && (
                <GoogleLogout
                  clientId={clientId}
                  render={(renderProps) => (
                    <button
                      type="button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="bg-white flex justify-center shadow-md p-2 rounded-full cursor-pointer outline-none"
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logOut}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ): (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                Pins not found!
            </div>
          )
          
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
