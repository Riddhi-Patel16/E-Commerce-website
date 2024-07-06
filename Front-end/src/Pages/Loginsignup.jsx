import React from 'react'
import './CSS/Loginsignup.css'
 const Loginsignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign UP</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' name="" id="" />
          <input type="email" placeholder='Email Address' name="" id="" />
          <input type="password" name="" id=""  placeholder='Password'/>
        </div>
          <button>Continue</button>
        
        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing ,i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
export default Loginsignup
