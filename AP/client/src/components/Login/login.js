import './login.css';
import SignUp from './SignUp'

import login_image from '../../src/photos/building.jpeg'
import { useState } from 'react';
import axios from 'axios';
const toggleForm = () => {
  const container = document.querySelector('.container');
  container.classList.toggle('active');
};

function handleSubmit(event) {
  return false;
}
const login = () => {

  const [user,setUser] = useState({
    userName:"",
    password:""
  })

  const handleChange= e =>{
    const {userName,value} = e.target;
    setUser({
      [userName]:value
    })
  }

  const {userName,password}= user;
  if(userName && password){
    axios.post('http://127.0.0.1:5008/register',user)
    .then(res=>console.log(res))
  }
  else{
    alert("Invalid Input");
  }
  return (
    <>
      <section className='a'>
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx"><img className={{ backgroundSize: 'cover' }} src={login_image} alt="" /></div>
            <div className="formBx">
              <form action="" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input type="text" id="username" name="userName" value={user.userName} onChange={handleChange} placeholder="Username" />
                <input type="password" id="password" name="password" value={user.password} onChange={handleChange}  placeholder="Password" />
                <input type="submit" name="" value="Login" />
                <p className="signup">
                  Don't have an account ?
                  <a href="#" onClick={toggleForm}>Sign Up.</a>
                </p>
              </form>
            </div>
          </div>
          <SignUp />
        </div>

      </section>

    </>
  )
}

export default login;