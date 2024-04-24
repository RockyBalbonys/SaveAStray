import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
export default function ForgotPassword() {

    const [inputData, setInputData] = useState({
        email: ""
    })

    const changeHandler = (e) => {
        setInputData(e.target.value);
    };

    function verifyEmail(){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/forgotPassword`, {
            email: inputData
        }).then(function(response){
            console.log(response)
        }).catch(function(err){
            console.log(err);
        })
    }

    return (
    <div>
        <h1>Enter your email that you want to change password:</h1>
        <input type="text" placeholder="Enter email..." onChange={changeHandler} value={inputData.email}/>
        <button type="button" onClick={verifyEmail}>Change Password</button>
    </div>
    )
}
