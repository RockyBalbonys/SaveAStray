import React from 'react'
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom";

export default function Sheets() {

axios.get('http://localhost:3001/api/sheets')
  .then(function (res) {
    const questions = res
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });

  return (
    <div>
    <div>Hello world</div>
      {questions}
    </div>
  )
}
