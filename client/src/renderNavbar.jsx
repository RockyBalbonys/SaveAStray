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
    "/about",
    "/animals",
    `/articles`,
    `/articles/${id}`,
    "/Articles",
    "/faq",
    "/donate",
    "/contact",
    "/animalsPawrent",
    "/manage",
    "/test",
    "/reqshelter",
    "/reqpawrent",
  ];

  // Check if the current path is a valid path
  if (validPaths.includes(pathname.toLowerCase())) {
    return <Navbar />;
  }

  return null;
};
