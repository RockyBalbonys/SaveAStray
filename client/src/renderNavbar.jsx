import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Components/PageComponent/Navbar";

export const renderNavbar = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
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
    "/dashboard/pawrent",
    "/dashboard/shelter",
    "/manage/pawrent",
    "/manage",
    "/manage/shelter",
    "/request/pawrent",
    "/request/shelter",
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
