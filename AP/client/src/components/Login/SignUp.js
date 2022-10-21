import './login.css';
import login_image from '../../src/photos/signUp.jpeg'

const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };

  function handleSubmit(event){
      return false;
  }
  
const SignUp = () =>{
    return(
    <>

    <div className="user signupBx">
    <div className="formBx">
      <form action="" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <input type="text" name="" placeholder="Username" autoComplete='off'/>
        <input type="email" name="" placeholder="Email Address" />
        <input type="password" name="" placeholder="Create Password" />
        <input type="password" name="" placeholder="Confirm Password" />
        <input type="submit" name="" value="Sign Up" />
        <p className="signup">
          Already have an account ?
          <a href="#" onClick={toggleForm}>Sign in.</a>
        </p>
      </form>
    </div>
    <div className="imgBx"><img src={login_image} alt="" /></div>
    </div>
    
    </>
    )
}


export default SignUp;