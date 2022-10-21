//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css'
import './table.css'

//Navbar
import { NavDropdown } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Mylogo from '../../images/CPSN.png'
import { useState, useEffect } from 'react';
import { useParams, withRouter } from "react-router";
import axios from 'axios';
import MultiCarousel from '../../Carousel/MultiItemCarousel';
import Footer from '../Footer/Footer';
import MultiCarousel2 from '../../Carousel2/buildingcarousel';
import Register from "../Register";
import { FindInPage } from '@material-ui/icons';
import $, { data } from "jquery";
import dt from 'datatables.net';
import { withThemeCreator } from '@material-ui/styles';
import { Multiselect } from "multiselect-react-dropdown";
import { components } from "react-select";
import emailjs from 'emailjs-com'
import { Link } from 'react-router-dom';


import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Select } from '@mui/material';


//Image
import Edit from '../../images/edit.png'
import loadingGIF from "../../images/OFAF.gif"

const Building = () => {

    const params = useParams();
    const [listofBuilding, setListOfBuilding] = useState([]);
    const [buildingName, setBuildingName] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const [services, setServices] = useState([]);

    const [selectedValue, setSelectedValue] = useState([]);
    const [check, setCheck] = useState(false);
    const [options, setOptions] = useState(null)
    const [data, setData] = useState([]);

    const sendEmail = (e) => {
        console.log(e);
        // axios.get(`http://127.0.0.1:5008/getBuildingsNa`)
    }



    useEffect(() => {
        const url = window.location.href;
        const last = url.substring(url.lastIndexOf("/") + 1);

        const urlArray = url.substring(url.lastIndexOf("/building")).split("/", 4)
        // setServices(urlArray[2])
        console.log(urlArray);
        var urlLength = urlArray.length;
        console.log(urlLength);

        axios.get(`http://127.0.0.1:5008/getBuildingsName/${last}`)
            .then((response) => {
                setListOfBuilding(response.data);
                setBuildingName(response.data[0].building)
            })

        axios.get('http://127.0.0.1:5008/getServices')
            .then((response) => {
                setServices(response.data);
                setData(response.data)
                console.log(response.data);
            })

     

        // var data = services;
        // console.log(services);

        setisLoading(false)

    }, []);

    const list = [];

    for (var i = 0; i < data.length; i++) {
        list.push({
            service: data[i],
            label: data[i]
        })
    }

    $(document).ready(function () {

        // $('#table_id thead tr')
        // .clone(true)
        // .addClass('filters')
        // .appendTo('#table_id thead');


        var table = $('#table_id').DataTable({
            retrieve: true,
            // stateSave: true,
            // paging: true,
            // pagingType: "full_numbers",
            lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]
        });


    });


    //Check Box
    // function getValue(event){
    //     var value = event.target.value;
    //     console.log(value);
    //     setSelectedValue((prevSelectValue)=>[...prevSelectValue,value])          
    //     // setCheck(true);
    //     const index = selectedValue;
    //     const buildingArray = index.indexOf(value);
    //     if(selectedValue>-1){
    //         selectedValue.slice(buildingArray,1);
    //     }

    // }

    useEffect(() => {
        console.log(selectedValue);
    }, [selectedValue])



    if (isLoading) {
        return "Loading"
    }

    if (listofBuilding.length > 0 && services.length > 0) {
        return (
            <>
                <div className="Main">
                    {/* Navbar */}
                    <Navbar />
                </div>

                <div id="buildingName">
                    <h1>{buildingName}</h1>
                </div>
                <div className='buildingTable'>
                    {/* {
                        services.map((user, index) => {
                            return (

                                <label className='serviceLabel' id="serviceID">
                                    <input value={user} onChange={(e) => { getValue(e) }} 
                                        name={user} type="checkbox" id="serviceCheckBox" key={index} />&nbsp;
                                    {user}
                                </label>
                            )
                        })
                    } */}

                    <Multiselect
                        className="selectService"
                        showArrow
                        hidePlaceholder={true}
                        caseSensitiveSearch={false}
                        placeholder="Select Service"
                        onRemove={(e) => { console.log(e); }}
                        onSelect={(e) => { console.log(e); }}
                        options={list}
                        onKeyPressFn
                        displayValue="label"
                        showCheckbox={true} />





                    <table id="table_id" className="display ">
                        <thead>
                            <tr>
                                <th colspan="5">Building Details</th>
                                <th colspan="7">Contact Details</th>
                            </tr>
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
                                        <td data-th="Email">{user.email}</td>
                                        <td data-th="Phone">{user.phone}</td>
                                        <td data-th="City">{user.city}</td>
                                        <td data-th="State">{user.state}</td>
                                        <td data-th="Pincode">{user.pincode}</td>
                                        <td data-th="Service">{user.service.map((value, i) => { return (<a href={"/" + value}>{value}&nbsp;</a>) })}</td>
                                        <td data-th="Edit">
                                            <Link to={`/regform/${user.building}/${user.officeNumber}`} onClick={(e) => { sendEmail(user.officeNumber) }}>
                                                <img src={Edit} id='editDetails' style={{ height: '22px', margin: '0 auto' }}></img>
                                            </Link>
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
                                <th>Edit</th>
                            </tr>
                        </tfoot>
                    </table>
                    <MultiCarousel />
                    <MultiCarousel2 />
                    <Register />
                    <Footer />

                </div>

            </>
        );

    } else {
        return (
            <img className='loadingGIF' src={loadingGIF}></img>
        )
    }

}




export default Building;