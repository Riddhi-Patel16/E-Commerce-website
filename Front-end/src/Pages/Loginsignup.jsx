import React, { useState } from 'react'
import './CSS/Loginsignup.css'
 const Loginsignup = () => {
  const [state,setstate]=useState("Login");
  const [formdata,setformdata]=useState({
    username:"",
    password:"",
    email:""
  })
  const login=async()=>{
    let responsedata;
    await fetch("http://localhost:4000/login",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formdata)
    }).then((response)=>response.json()).then((data)=>responsedata=data);
    if(responsedata.success)
    {
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.error);
    }
  }
  const signup=async()=>{
    let responsedata;
    await fetch("http://localhost:4000/signup",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formdata)
    }).then((response)=>response.json()).then((data)=>responsedata=data);
    if(responsedata.success)
    {
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.error);
    }
  }
  const changehandler=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          { state==="Sign Up" ?<input  type="text" placeholder='Your Name' onChange={changehandler} value={formdata.username} name="username" id="" />:null}
          <input type="email" onChange={changehandler} value={formdata.email} name="email" placeholder='Email Address'  id="" />
          <input type="password" onChange={changehandler} value={formdata.password} name="password" id=""  placeholder='Password'/>
        </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        
       {state==="Sign Up" && <p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setstate("Login")}}>Login here</span>
        </p>}
        { state==="Login" &&<p className="loginsignup-login">
          Create an account <span onClick={()=>{setstate("Sign Up")}}>Click here</span>
        </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing ,i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
export default Loginsignup
