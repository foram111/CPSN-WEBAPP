import react from "react";
import Mylogo from '../../images/CPSN.png';
import { Link } from "react-router-dom";
import './navbar.scss'
function Navbar()
{
    return(
        <div id="mainNavbar" className="absolute z-10 ">
                <div className="navContent">
                    <div className="logo">
                        <img src={Mylogo}></img>
                    </div>
                    <div className="navItems">
                        <ul className="ulItems">
                            <li className="liItems">
                                <Link to={"/"}><a className="button type3" >Home</a></Link> </li>
                            <li className="liItems">
                               <Link to={"/service"}> <a className="button type3" >Service</a></Link></li>
                            {/* <li className="liItems"> */}
                                {/* <a className="button type3">About</a></li> */}
                            <li className="liItems">
                               <Link to={"/login"}> <a className="button type3">Login</a></Link></li>
                            <li className="liItems">
                               <Link to={"/regform"}> <a className="button type3">Register</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}
export default Navbar