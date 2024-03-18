import React from "react";
import Navbar from "./Components/PageComponent/Navbar";
import { useLocation, useParams } from "react-router-dom";

export const renderNavbar = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  console.log(id);
  const location = useLocation();
  const { pathname } = location;
  const validPaths = [
    "/",
    "/About",
    "/Animals",
    `/articles`, // Include /articles path
    `/articles/${id}`, // Include /articles/:id path
    "/Articles",
    "/faq",
    "/Donate",
    "/Contact",
    "/animalsPawrent",
    "/manage",
    "/test",
  ];

  // Check if the current path is a valid path
  if (validPaths.includes(pathname)) {
    return <Navbar />;
  }

  return null;
};
