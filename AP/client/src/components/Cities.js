import Mylogo from '../images/CPSN.png'

import { NavDropdown } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


function Citiesavailable ()
{
    return(
        // Building in Ahmedabad

        <div className="MainCities">

        {/* Navbar----------------------------------------------------------------------------------------------------------------------- */}

            <Navbar>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Mylogo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Login/Register"
                        menuVariant="dark"
                    >
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Register Business</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Rent Offices</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
      
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>

  {/* Mainpage----------------------------------------------------------------------------------------------------------------------- */}

        <div className='Main-Cards'>

            <h1> Buildings In Ahmedabad</h1>
                <div className='row-cards'>

                    <div className='column-cards'>

                            <div className='Cities-cards'>
                                <h1>Popular Buildings</h1><hr/>
                                
                                
                                <h3>Area: Sindhubhavan Road</h3>
                                <h4>Location: Ahmedabad </h4>
                                        <div className="Main-Area">
                                                <ul className="Area-Box">
                                               
                                                    <li>
                                                    <h4> Shilp Epitome </h4>
                                                    <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button>
                                                    </li>
                                             

                                               <li> <h4> Shilp Epitome</h4>
                                                <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button></li>

                                               <li> <h4> Shilp Epitome</h4>
                                                    <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button></li>
                                                </ul>

                                              

                                    </div>
                            </div>
                            <div className='Cities-cards'>
                                <h1>Popular Buildings</h1><hr/>
                                
                                
                                <h3>Area: Sindhubhavan Road</h3>
                                <h4>Location: Ahmedabad </h4>
                                        <div className="Main-Area">
                                                <ul className="Area-Box">
                                               
                                                    <li>
                                                    <h4> Shilp Epitome</h4>
                                                    <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button>
                                                    </li>
                                                 

                                               <li> <h4> Shilp Epitome</h4>
                                                <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button></li>

                                             <li> <h4> Shilp Epitome</h4>
                                                <p> Its an Commercial Building with more than 1000+ <br/>  Office spaces with top ammenitites</p>
                                                    <button className='bui-btn'>
                                                        View More
                                                    </button></li>
                                                </ul>

                                              

                                    </div>
                            </div>

                    </div>

                    



                </div>
        </div>


        </div>
    )
}
export default Citiesavailable;