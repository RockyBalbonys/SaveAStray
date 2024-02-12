import { useState, useEffect } from "react";
import axios from "axios";

export default function Verify() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  
  axios.get(`http://localhost:3001/verify?token=${token}`)
  .then(function (res) {
    console.log(res.data, token);
  })
  .catch(function (err) {
    console.log(err);
  });

  return (
    <div>
        verification page
    </div>
  )
}
