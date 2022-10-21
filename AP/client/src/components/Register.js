import './home.css';
import { Link } from 'react-router-dom';

function RegisterDetails() {
    return (

        <div className='registerbox'>
            <div className='borderline'>
                <h1 className='registerTitle'> Register your services with us!</h1>
                <p> Id ullamco aliqua mollit aliqua reprehenderit officia labore irure ut incididunt. Duis tempor dolor cupidatat aute amet proident <br /> sint exercitation enim do consectetur. Cupidatat nisi amet laboris adipisicing dolore excepteur ipsum excepteur.
                </p>
                <Link to='/regform'>
                    {/* <button className="btn-register">
                Register Now!
            </button> */}
                    <button className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"  >
                        {/*  onClick={dosomething()} */}
                        Register Now
                    </button>
                </Link>
            </div>
        </div>

    );
}
export default RegisterDetails;