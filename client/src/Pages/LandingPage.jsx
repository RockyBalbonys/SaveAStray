import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <h1>Work in progress... :D</h1>
      <Link to="login">
        <div className="flex space-x-5 mt-5">
          <button>
            I am a{" "}
            <span className="font-bold bg-blue-950 text-white py-2 px-3 rounded-lg">
              Pawrent
            </span>
          </button>
          <button>
            I am a{" "}
            <span className="font-bold bg-blue-950 text-white py-2 px-3 rounded-lg">
              Rescue Shelter
            </span>
          </button>
        </div>
      </Link>
    </>
  );
};

export default LandingPage;
