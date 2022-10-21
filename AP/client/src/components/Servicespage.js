
import Mylogo from '../images/CPSN.png'
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/DropdownButton';
import { Button } from '@mui/material';
import MultiCarousel from '../Carousel/MultiItemCarousel';
import Footer from './Footer/Footer';
import MultiCarousel2 from '../Carousel2/buildingcarousel';
import Register from "./Register";
import shakingHand from "../images/shakingHand.jpg"
import Searchbar3 from './Searchbar3';
import { useState, useEffect } from 'react';
import { useParams, withRouter } from "react-router";
import $, { data } from "jquery";
import loadingGIF from "../images/OFAF.gif"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'
// CSS
import './Services1.css';
import './navbar.scss';
import './serviceTitle.css';
import './SearchBar3.css';
import './home.css';

// Jquery Datatable
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Navbar from './Navbar/Navbar';

//Image
import Edit from '../images/edit.png';
import { margin } from '@mui/system';

function Services1() {

    // const navigator = useNavigate();
    const params = useParams();
    const [listofBuilding, setListOfBuilding] = useState([]);
    const [listofServices, setListofServices] = useState([]);
    const [listofStates, setListofStates] = useState([]);
    const [listofDistrict, setListofDistrict] = useState([])
    const [districslist, setDistrictList] = useState("");
    const [displayTable, setDisplayTable] = useState('none');
    const [isLoading, setisLoading] = useState(false);
    const [heading, setHeading] = useState('Service');
    const [loading, setLoading] = useState(true);
    const [district, setDistrict] = useState("");
    const url = window.location.href;
    const last = url.substring(url.lastIndexOf("/") + 1);
    const [services, setServices] = useState([]);


    const changeData = (value) => {
        console.log(value);
        axios.get(`http://127.0.0.1:5008/getDistrictNames/${value}`)
            .then((response) => {
                console.log(response.data);
                setListofDistrict(response.data);
            })
    }

    const sendEmail = (e) => {
        console.log(e);
        e.preventDefault();

        var templateParams = {
            from_name:e,
        };
         
        emailjs.send('gmail', 'service_inquiry', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
    }


    useEffect(() => {

        const urlArray = url.substring(url.lastIndexOf("/service")).split("/", 4)
        // setServices(urlArray[2])
        console.log(urlArray);
        var urlLength = urlArray.length;
        console.log(urlLength);

        axios.get('http://127.0.0.1:5008/state')
            .then((response) => {
                setListofStates(response.data);
            })

        axios.get('http://127.0.0.1:5008/districs')
            .then((response) => {
                setDistrictList(response.data);
            })


        if (urlArray.length === 4) {
            var serviceName = urlArray[2]
            var cityName = urlArray[3];
            setServices(serviceName);
            console.log(services);
            console.log(serviceName);
            console.log(cityName);
        }
        switch (urlLength) {
            case 2:
                if (last === 'service') {
                    console.log('Service');
                    axios.get('http://127.0.0.1:5008/getServices')
                        .then((response) => {
                            setListofServices(response.data)
                            console.log(response.data)
                            setDisplayTable('none')
                            setHeading('service');
                        })
                }
                break;


            case 3:
                axios.get(`http://127.0.0.1:5008/getServicesName/${last}`)
                    .then((response) => {
                        setListOfBuilding(response.data);
                        console.log(response.data);
                        setListofServices(response.data[0].service[0])
                        setServices(last);
                        console.log(response.data[0].service[0]);
                        setHeading(last.replace(/%20/g, " "));
                    })
                setDisplayTable('block');
                break;

            case 4:
                axios.get(`http://127.0.0.1:5008/getDistrictData1/${serviceName}/${cityName}`)
                    .then((response) => {
                        console.log(serviceName);
                        console.log(cityName);
                        setListOfBuilding(response.data);
                        setListofServices(response.data[0].service[0])
                        console.log(response.data[0].service[0]);
                        console.log(response.data);
                    })
                setDisplayTable('block')
                break;

            default:
                break;
        }

        setTimeout(() => {
            setLoading(false);
            console.log("I am inside timeout")
        }, 1000);
    }, []);



    $(document).ready(function () {
        // $('#table_id thead tr')
        // .clone(true)
        // .addClass('filters')
        // .appendTo('#table_id thead');

        $('#table_id').DataTable({
            retrieve: true,
            lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]

        })
    })
    // $(document).ready(function () {

    //     $('#table_id tfoot th').each( function () {
    //         var title = $('#table_id thead th').eq( $(this).index() ).text();
    //         $(this).html( '<input type="text" placeholder="'+title+'" />' );
    //     } );

    //     var table = $('#table_id').DataTable({
    //         retrieve: true,
    //         responsive: {
    //             details: false
    //         },
    //         //  var api = this.api();
    //         // stateSave: true,
    //         // paging: true,
    //         // pagingType: "full_numbers",
    //         lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]
    //     });

    //     table.columns().every( function () {
    //         var that = this;

    //         $( 'input', this.footer() ).on( 'keyup change', function () {
    //             that
    //                 .search( this.value )
    //                 .draw();
    //         } );
    //     } );
    // } );

    if (isLoading) {
        return 'loading';
    }

    if (loading === false && listofServices.length > 0) {
        return (
            <div>
                <Navbar />


                <div className='serviceImage' style={{ height: '105  0px' }}>
                    <img src={shakingHand} style={{ opacity: '0.4', backgroundColor: 'black', height: '100%' }}></img>

                    <div id="backSide">
                        <div className="serviceText1">
                            <div className='serviceTitle1' id='title'>
                                Where Do You Want To Find
                                <div className="Iam">
                                    <b>
                                        <div className="innerIam">
                                            Lawyer<br />
                                            Chartered Accountant<br />
                                            Real Estate<br />
                                            IT<br />
                                            Event Management
                                        </div>
                                    </b>
                                </div>
                                <br />
                                Services?
                            </div>
                            <Searchbar3 placeholder="Search for a Service.." />
                        </div>
                    </div>

                    {/* OR */}
                    <div className='or'>
                        OR
                    </div>

                    {/* DROP DOWN */}
                    <div id="dropdownData" >
                        <div>
                            <label for="India" className='country'>India</label>
                            <select name="State" id="state" onChange={(e) => changeData(e.target.value)} >
                                <option value="" disabled selected hidden>State</option>
                                {listofStates.map((user, index) => {
                                    return (
                                        <option value={user} key={index} >{user}</option>)
                                })}
                            </select>

                            <select name="District" id="district" placeholder='Districs' onChange={(e) => setDistrict(e.target.value)} >
                                <option value="" disabled selected hidden>Districs</option>
                                {listofDistrict.map((district, index) => {
                                    // console.log(district.district);
                                    return (
                                        <option id="districtName" value={district.District} key={index}>{district.District}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='srch-btn'>
                            <Link to={`/service/${services}/${district}`} onClick={() => window.location.replace(`http://localhost:8000/service/${services}/${district}`)}>
                                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    Search
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>

                <div className='serviceHeading'>
                    <h1>{heading.toLocaleUpperCase()}</h1>
                </div>

                <div className='serviceTable' style={{ display: displayTable }}>

                    {/* {
                        services.map((user, index) => {
                            return (
                                <label className='serviceLabel'>
                                    <input type="checkbox" id="serviceCheckBox" key={index} />&nbsp;
                                    {user}
                                </label>)
                        })} */}

                    <table id="table_id" className="display row-border">
                        <thead>
                            {/* <tr>
                                <th colspan="5">Building Details</th>
                                <th colspan="7">Contact Details</th>
                            </tr> */}
                            <tr>
                                <th>Building Name</th>
                                <th>Floor</th>
                                <th>Block No</th>
                                <th>Office No</th>
                                <th>Status</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Service</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listofBuilding.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-th="Building Name">{user.building}</td>
                                        <td data-th="Floor">{user.floorNumber}</td>
                                        <td data-th="Block No">{user.block}</td>
                                        <td data-th="Office No">{user.officeNumber}</td>
                                        <td data-th="Status">{user.status}</td>
                                        <td data-th="Company Name">{user.comName}</td>
                                        <td data-th="Email" name="email">{user.email}</td>
                                        <td data-th="Phone">{user.phone}</td>
                                        <td data-th="City">{user.city}</td>
                                        <td data-th="State">{user.state}</td>
                                        <td data-th="Pincode">{user.pincode}</td>
                                        <td data-th="Service">
                                            {user.service.map((value, i) => {
                                                return (
                                                    <a href={"/" + value} key={i}>{value}&nbsp;</a>)
                                            })}
                                        </td>
                                        <td data-th="Edit">
                                            <img src={Edit} id='editDetails' style={{ height: '22px', margin: '0 auto' }}
                                            onClick={(e)=>{sendEmail(user.email)}}
                                            ></img>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Building Name</th>
                                <th>Floor</th>
                                <th>Block No</th>
                                <th>Office No</th>
                                <th>Status</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Service</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
       
                <section>
                    <MultiCarousel />
                </section>

                <section>
                    <MultiCarousel2 />
                </section>
                <section>
                    <Register />
                </section>
                <section>
                    <Footer />
                </section>
            </div>
        );
    }
    else {
        return (
            <img className='loadingGIF' src={loadingGIF}></img>
        )
    }
}
export default Services1;