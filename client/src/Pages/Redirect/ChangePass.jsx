import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChangePass() {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const [tokenStatus, setTokenStatus] = useState(null) //if true, pwede niyang palitan yung password, pag false, meaning expired yung token
    const [inputData, setInputData] = useState({
        password:"",
        rePassword: ""
    })
    const [newPassword, setNewPassword] = useState()
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/forgot/changePass?token=${token}`)
    .then(function(response){
        console.log(response)
        if(response.status ===  200){
            setTokenStatus(true)
        } else {
            setTokenStatus(false)
        }
    }).catch(function(error){
        console.log(error)
    })



    const changeHandler = (e) => {
        setInputData(e.target.value);
    };

    function changePassword(){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updatePass`, {
            inputData,
            token
        }).then(function(response){
            console.log("Password Change Successfuly: ", response)
        }).catch(function(error){
            console.log(error)
        })
    }
return (
    <div>
        <input type="password" onChange={changeHandler} value={inputData.password} placeholder='Enter new password...'/>
        <input type="password" onChange={changeHandler} value={inputData.rePassword} placeholder='Re-Enter new password...'/>
        <button onClick={changePassword}>Change Password</button>
    </div>
)
}
