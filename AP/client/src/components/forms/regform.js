import "./regform.css";
import "../Services/dropdown.css"
import 'tw-elements';
import { Link } from "react-router-dom";
//Searchbar import
import SearchBar4 from '../SearchBar4'
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import { Multiselect } from "multiselect-react-dropdown";
import { Fastfood, Label } from "@material-ui/icons";
function Regform() {
    
    const navigate = new useNavigate();
    const url = window.location.href;

    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:5008/state')
    .then((response) => {
        setListofStates(response.data);
    })

    axios.get('http://127.0.0.1:5008/getServices')
    .then((response) => {
      setData(response.data);
      console.log(response.data);
    })

    const urlArray = url.substring(url.lastIndexOf("/regform")).split("/", 4)
    console.log(urlArray);
    var urlLength = urlArray.length;
    console.log(urlLength);

    if (urlArray.length === 4) {
        var buildingName = urlArray[2]
        var officeNo = urlArray[3];
        console.log(buildingName);
        console.log(officeNo);
        
    }

  
    switch (urlLength) {
        case 4:
            axios.get(`http://127.0.0.1:5008/getOfficeData/${buildingName}/${officeNo}`)
                .then((response) => {
                    console.log(buildingName);
                    console.log(officeNo);
                    console.log(response.data);

                })
            break;

        default:
            break;
    }
    
    },[])

    
   


    const services = [];
    for(var i=0;i<data.length;i++){
        services.push({
            service:data[i],
            label:data[i]
        })
    }

    
    const [listofStates, setListofStates]= useState([]);
    const [listofDistrict, setListofDistrict]=useState([]);

    const [listofUsers, setLisOfUsers] = useState([])
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [comName, setCompanyName] = useState();
    const [block, setBlockNumber] = useState();
    const [officeNumber, setOfficeNumber] = useState();
    const [floorNumber, setFloorNumber] = useState();
    const [building, setBuilding] = useState();
    const [landmark, setLandmark] = useState();
    const [city, setCity] = useState([]);
    const [status, setStatus] = useState();
    const [state, setState] = useState([]);
    const [pincode, setPincode] = useState();
    const [err, setErr] = useState("");

    const [emptyBuildingName, setEmptyBuildingName] = useState(false)

    const [category, setCategory] = useState(services);

    const changeData = (value) => {
        console.log(value);
        setState(value);
        axios.get(`http://127.0.0.1:5008/getDistrictNames/${value}`)
            .then((response) => {
                console.log(response.data);
                setListofDistrict(response.data);
            })

    }
    useEffect(()=>{
       console.log(city); 
    },[city])
    function postUser  ()
    {
      
        console.log(category)
        if (err !== "") {
            alert("Valiadation failed")
        }
        else
        {
            navigate("/")
        }
        

        Axios.post("http://127.0.0.1:5008/register", {
            email,
            phone,
            comName,
            status,
            block,
            officeNumber,
            floorNumber,
            building,
            city,
            state,
            pincode,
            category

        }).then((response) => {
            setLisOfUsers([
                ...listofUsers,
                {
                    email,
                    phone,
                    comName,
                    status,
                    block,
                    officeNumber,
                    floorNumber,
                    building,
                    city,
                    state,
                    pincode,
                    category
                },
            ])
            alert('USER CREATED');
        }).catch((err) => {
            console.log(err);
        });
    }
    function Validate(value, fieldname) {
        console.log(value)

        const regex = /^[^*|\":<>[\]{}`\\()';@&$,]+$/;
        const regex2 = /^[0-9]*$/;
        const regex3 = /^[A-Za-z0-9_-]*$/;
        const regex4 = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
        const regex5 = /^\d{10}$/;
        const regex8 =/^\d{6}$/;
        const regex7 = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        const regex1 = /\d+/;
        if (!value) {
            setErr("1")
        }
        else if (!regex.test(value) && fieldname === "buildingname") {
            setErr("2")
            console.log(err)
        }
        else if (!regex3.test(value) && fieldname === "Block") {
            setErr("3")
            console.log(err)
        }
        else if (!regex2.test(officeNumber) && fieldname === "Office-number") {
            setErr("4")
        }
        else if (!regex4.test(email) && fieldname === "Email") {
            setErr("5")
            console.log(err);
        }
        else if (!regex5.test(value) && fieldname === "phone") {
            setErr("6")

            console.log(err);
        }
        else if (!regex7.test(city) && fieldname === "city") {
            setErr("7")
            console.log(city);
            console.log(err);
        }
        else if (city === "" && fieldname === "city") {
            setErr("10")
            console.log(city);
            console.log(err);
        }
        else if (!regex7.test(state) && fieldname === "state") {
            setErr("8")
            console.log(state);
            console.log(err);
        }
        else if (!regex8.test(pincode) && fieldname === "pincode") {
            setErr("9")
            console.log(pincode);
            console.log(err);
        }
        else if(building=="" && fieldname==="buildingname")
        {
            setErr(10);
        }
        else {
            setErr("")
        }

       
        

    }



    return (
        <>

            <div className="registerForm">
                <div className="mainHeadingBox">
                    <div className="mainHeading">SERVICES REGISTRATION FORM</div>
                </div>
                <div className="formBox">

                    <div className="buildingDeatils item">
                        <div className="buildingTitle">Building Details</div>

                        {/* Building Name */}
                        <div className='buildingItem1'>
                            {/* <label htmlFor="name-firm" className='buildingLabel'>Building Name :</label> */}
                            <input
                                type="text"
                                id="company-name"
                                name="company-name"
                                placeholder="Building Name"
                                value={building}
                                onChange={(e) => {
                                    setBuilding(e.target.value);
                                     Validate(e.target.value,"buildingname")
                                }}
                                className='buildingName inputLeft' ></input>
                            {
                                (building === "")
                                    ?
                                        <span className="empty-validation">The building name should not be empty.</span>
                                    :
                                    null
                            }
                            {
                                (err === "2")
                                    ?
                                    <span className="empty-validation">No Special characters allowed</span>
                                    :
                                    null
                            }
                        </div>
                        {/* Building Address */}
                        <div className="buidlingAddress">
                            Address :
                            <div className='buildingItem2'>

                                <div className='block'>
                                    <input
                                        type="text"
                                        id="office-number"
                                        name="office-number"
                                        onChange={(e) => {
                                            setBlockNumber(e.target.value);
                                            Validate(e.target.value,"Block")
                                        }}
                                        placeholder='Block'
                                        className='inputBlock inputLeft'></input>
                                    {
                                        (err === "3")
                                            ?
                                            <span className="empty-validation">No Special characters allowed</span>
                                            :
                                            null
                                    }
                                </div>

                                <div className='floor'>
                                    <input
                                        type="number"
                                        id="office-number"
                                        name="office-number"
                                        placeholder="Floor"
                                        onChange={(e) => {

                                            setFloorNumber(e.target.value)
                                        }}
                                        className='inputFloor inputLeft'></input>
                                </div>


                                <div className='officeNumber'>
                                    <input
                                        type="number"
                                        id="office-number"
                                        name="office-number"
                                        placeholder="Office No"
                                        onChange={(e) => {
                                            setOfficeNumber(e.target.value, "Office-number");
                                            console.log(officeNumber);
                                            Validate(e.target.value)
                                        }}
                                        className='inputOffice inputLeft' ></input>
                                    {
                                        (err === "4")
                                            ?
                                            <span className="empty-validation">Only Numbers ar allowed</span>
                                            :
                                            null
                                    }
                                </div>

                            </div>
                            {/* <div className='city'>

                                <input
                                    type="text"
                                    id="company-name"
                                    name="company-name"
                                    placeholder="City"

                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        Validate(e.target.value, "city");
                                    }}
                                    className='inputCity inputLeft' ></input>
                                {
                                    (err === "10")
                                        ?
                                        <span className="empty-validation">City name required</span>
                                        :
                                        null
                                }
                                {
                                    (err === "7")
                                        ?
                                        <span className="empty-validation">Enetr valid city name.</span>
                                        :
                                        null
                                }
                            </div> */}

                            {/* <div className='state'>
                                <input
                                    type="text"
                                    id="company-name"
                                    name="company-name"
                                    placeholder="State"
                                    onChange={(e) => {
                                        setState(e.target.value)
                                        Validate(e.target.value, "state");
                                    }}
                                    className='inputState inputLeft' ></input>
                                {
                                    (err === "8")
                                        ?
                                        <span className="empty-validation">Enter valid state</span>
                                        :
                                        null
                                }
                            </div> */}
                            {/* <div className="States">
                            {/* <select name="City" id="cars" className='Dds9'>
                                    {listofStates.map((user, index) => {
                                     return (
                                         <option value={user} key={index} >{user}</option>)
                                    })} */}
                                    {/* <SearchBar4 className="name" onClick="passval()" placeholder="Search for a Service.." data={listofStates} /> */} 
                        {/* <option value="saab">Gandhinagar</option> */}
                            {/* </div> */}
                            <select name="State" id="state1" className='State_drop' onChange={(e) => changeData(e.target.value)} >
                            <option value="" disabled selected hidden>State</option>

                            {listofStates.map((user, index) => {
                                return (
                                    <option value={user} key={index} >{user}</option>)
                            })}

                        </select>
                        <select name="District" id="District" className='Districts_drop' placeholder='Districs' onChange={(e)=>setCity(e.target.value) }>
                            <option value="" disabled selected hidden>Districs</option>

                            {listofDistrict.map((district, index) => {
                                return (
                                    <option value={district.District} key={index}>{district.District}</option>
                                )
                            })}

                        </select>
                            <div className='pincode'>
                                <input
                                    type="text"
                                    id="company-name"
                                    name="company-name"
                                    placeholder="Pincode"

                                    onChange={(e) => {
                                        setPincode(e.target.value);
                                        Validate(e.target.value, "pincode");
                                    }}
                                    className='inputPincode inputLeft' ></input>
                                {
                                    (err === "9")
                                        ?
                                        <span className="empty-validation">Enter valid pincode</span>
                                        :
                                        null
                                }
                            </div>

                        </div>
                        {/* Status */}

                        <div className='status'>
                            <select name="Status" id="Status" className="inputStatus" onChange={(e) => {
                                setStatus(e.target.value)
                            }}>
                                <option className="selectStatus" value={0} disabled selected>Select Status </option>
                                <option className="selectStatus" value="Unoccupied">Uoccupied</option>
                                <option className="selectStatus" value="Occupied">Occupied</option>
                            </select>
                            {
                                (status === undefined)
                                    ?
                                    <span className="empty-validation">Select status</span>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="compayDetails item2">
                        <div className="companyTitle">Company Details</div>

                        <div className='companyItem'>
                            <input
                                type="text"
                                id="company-name"
                                name="company-name"
                                placeholder="Company Name"
                                onChange={(e) => {
                                    setCompanyName(e.target.value);
                                }}
                                className='companyName inputRight' ></input>
                            {
                                (comName === "")
                                    ?
                                    <span className="empty-validation">Company name required</span>
                                    :
                                    null
                            }
                        </div>

                        <div className='companyItem' >
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className='companyEmail inputRight'
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    Validate(e.target.value, "Email");
                                    console.log(e.target.value)
                                }}
                            ></input>
                            {
                                (err === "5")
                                    ?
                                    <span className="empty-validation">Invalid Email</span>
                                    :
                                    null
                            }
                        </div>

                        <div className='phoneNumber'>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="inputPhone inputRight"
                                placeholder="Phone Number"
                                onChange={
                                    (e) => {
                                        setPhone(e.target.value);
                                        Validate(phone, "phone");

                                    }
                                }></input>
                            {
                                (err === "6")
                                    ?
                                    <span className="empty-validation">Invalid phone number</span>
                                    :
                                    null
                            }
                        </div>

                        {/* Service */}
                        <Multiselect
                            className="selectService"
                            showArrow
                            hidePlaceholder={true}
                            caseSensitiveSearch={false}
                            placeholder="Select Service"
                            onRemove={(e) => { console.log(e); }}
                            onSelect={(e) => { setCategory(e); }}
                            options={services}
                            displayValue="label"
                            showCheckbox={true} />

                        <button className="buttonSumbit" onClick={postUser}>Submit</button>
                    </div>

                </div>
                
            
            </div>
            
            {/*  */}






        </>
    )
}
export default Regform

