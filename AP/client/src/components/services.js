
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
// import BookData from "./Data.json";


// Images
import main1 from '../images/mainbck.png'
import main2 from '../images/main2.jpg'
import main3 from '../images/main3.jpg'
import main4 from '../images/main4.jpg'
import main5 from '../images/main5.jpg'


// Components
import Navbar from './Navbar/Navbar';
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import RegisterDetails from "./Register";
import MultiCarousel from '../Carousel/MultiItemCarousel';
import MultiCarousel2 from '../Carousel2/buildingcarousel';
import Footer from './Footer/Footer';


// CSS
import './navbar.scss';
import './Building/building.css';
import './home.css'
import './SearchBar.css'


function Home() {

    const [listofBuilding, setListOfBuilding] = useState([]);
    const [listofServices, setListofServices] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5008/getBuildings')
            .then((response) => {
                setListOfBuilding(response.data);
                console.log(response.data);
            })
    }, []);


    useEffect(() => {
        axios.get('http://127.0.0.1:5008/getServices')
            .then((response) => {
                setListofServices(response.data);
            })
    }, []);


    return (
        /* Home-page*/

        <div className="Main">
            {/* Navbar */}
            <Navbar />
            <div id="carouselExampleIndicators" className="carousel slide relative  " data-bs-ride="carousel">
                <div className="back">
                    {/* Title */}

                    {/* <h1 className="headingText" >Connecting Professional  
                    Services Nearby</h1> */}

                    <h1 className="headingText" >Connecting Professional&nbsp;
                        <span className="serviceTitle" data-text="Services">Services</span> Nearby</h1>

                    {/* <h1 className="headingText" >Connecting Professional&nbsp;
                    <span className="serviceTitle">Services</span>
                    &nbsp;Nearby</h1> */}

                    {/* Search Area */}

                    <div className="searchArea">
                        <div className="Search-box">
                            <SearchBar className="name" placeholder="Search for a Building.." data={listofBuilding} />
                        </div>
                        <div className="Or"> <h2 style={{ "text-decoration": 'line-through' }}>&nbsp;&nbsp;&nbsp;</h2>&nbsp;OR&nbsp;<h2 style={{ "text-decoration": 'line-through' }}>&nbsp;&nbsp;&nbsp;</h2></div>
                        <div className="Search-box2">
                            <SearchBar2 className="name" onClick="passval()" placeholder="Search for a Service.." data={listofServices} />
                        </div>
                    </div>
                </div>


                <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <div className="carouselButton">

                        <button
                            className="carouselButton"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            className="carouselButton"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            className="carouselButton"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                        <button
                            type="button"
                            className="carouselButton"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="3"
                            aria-label="Slide 4"
                        ></button>
                        <button
                            type="button"
                            className="carouselButton"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="4"
                            aria-label="Slide 5"
                        ></button>
                    </div>
                </div>

                <div className="carousel-inner relative w-full overflow-hidden">
                    <div className="carousel-item active float-left w-full">
                        <img

                            src={main1}
                            className="block w-full main1 	"
                            alt="Wild Landscape"
                        />
                    </div>
                    <div className="carousel-item float-left w-full">
                        <img
                            src={main2}
                            className="block w-full 	"
                            alt="Camera"
                        />
                    </div>
                    <div className="carousel-item float-left w-full">
                        <img
                            src={main3}
                            className="block w-full 	"
                            alt="Exotic Fruits"
                        />
                    </div>
                    <div className="carousel-item float-left w-full">
                        <img
                            src={main4}
                            className="block w-full 	"
                            alt="Exotic Fruits"
                        />
                    </div>
                    <div className="carousel-item float-left w-full">
                        <img
                            src={main5}
                            className="block w-full 	"
                            alt="Exotic Fruits"
                        />
                    </div>
                </div>
                <button
                    style={{ "display": "none" }}
                    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    style={{ "display": "none" }}
                    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <section>
                <div className='calculation'>
                    <div className='calculationservices'>
                    </div>
                    <div className='featuredservices'>
                    </div>
                </div>
            </section>


            <section>
                <MultiCarousel />
            </section>

            <section>
                <MultiCarousel2 />
            </section>

            <section>
                <RegisterDetails />
            </section>


            <Footer />
        </div>


    );
}
export default Home;