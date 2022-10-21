import './login.css';
import SignUp from './SignUp'

import login_image from '../../src/photos/building.jpeg'
const toggleForm = () => {
  const container = document.querySelector('.container');
  container.classList.toggle('active');
};

function handleSubmit(event) {
  return false;
}
const login = () => {

  return (
    <>
      <section className='a'>
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx"><img className={{ backgroundSize: 'cover' }} src={login_image} alt="" /></div>
            <div className="formBx">
              <form action="" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input type="text" name="usename" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
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