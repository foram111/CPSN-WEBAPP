import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Mylogo from '../../images/CPSN.png'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/DropdownButton';
import { Button } from '@mui/material';
import MultiCarousel from "../../Carousel/MultiItemCarousel";
import MultiCarousel2 from "../../Carousel2/buildingcarousel";
import Footer from '../Footer/Footer';
import Register from "../Register";
import shakingHand from "../../images/shakingHand.jpg"
import Searchbar3 from '../Searchbar3';
import { useParams, withRouter } from "react-router";
import $, { data } from "jquery";


// CSS
import '../Services1.css';
import '../navbar.scss';
import '../serviceTitle.css';
import '../SearchBar3.css';


// Jquery Datatable
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const Allservices = () => {


	const [listofBuilding, setListOfBuilding] = useState([]);
	const [listofServices, setListofServices] = useState([]);
	const [listofStates, setListofStates] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [displayTable,setDisplayTable] = useState('none');

	useEffect(() => {
		const url = window.location.href;
		const last = url.substring(url.lastIndexOf("/") + 1);
		if(last==='service'){
		axios.get('http://127.0.0.1:5008/getServices')
		.then((response) => {
		  setListofServices(response.data.toUpperCase());
			console.log(listofServices);
		  setDisplayTable('none')
		})
		}
		else{
			axios.get(`http://127.0.0.1:5008/getServicesName/${last}`)
				.then((response) => {
					setListOfBuilding(response.data);
					// console.log(response.data);
					console.log(response.data[0].service);
					console.log(last);
					setListofServices(last)
					setDisplayTable('Block')
				})
		}
	

		
	

		setisLoading(false)

	}, []);



	if (isLoading) {
		return "Loading"
	}

	if (listofServices.length > 0) {
		return (
			<div>
				<div id="mainNavbar" className="absolute z-10 ">
					<div className="navContent">
						<div className="logo">
							<img src={Mylogo}></img>
						</div>
						<div className="navItems">
							<ul className="ulItems">
								<li className="liItems">
									<a className="button type3" >Home</a> </li>
								<li className="liItems">
									<a className="button type3" href="/service">Service</a></li>
								<li className="liItems">
									<a className="button type3">About</a></li>
								<li className="liItems">
									<a className="button type3">Register</a></li>
							</ul>
						</div>
					</div>
				</div>


				<div className='serviceImage'>
					<img src={shakingHand} style={{ opacity: '0.4', backgroundColor: 'black' }}></img>

					<div id="backSide">
						<div className="serviceText1">
							<div className='serviceTitle1' id='title'>
								Where do you want to find
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
							<Searchbar3 placeholder="Search for a Service.."  />
						</div>

					</div>



					{/* OR */}
					<div className='or'>
						OR
					</div>

					{/* DROP DOWN */}

					<label for="India" className='country'>India</label>

					<select name="City" id="cars" className='Dds9'   >

						{listofStates.map((user, index) => {
							return (
								<option value={user} key={index} >{user}</option>)
						})}
						{/* <option value="saab">Gandhinagar</option> */}
					</select>

					<select name="District" id="District" className='Dds9'>
						<option value="volvo">Bodakdev</option>
						<option value="saab">Thaltej</option>
					</select>
					{/* <div className='srch-btn'>
						<button type="button" className='search-btn'>Search</button>
					</div> */}

				</div>




				<div className='serviceHeading'>
					<h1>{listofServices}</h1>
				</div>

				<div className='serviceTable'>
					<table id="table_id" style={{display:displayTable}} className="display row-border">
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
										<td data-th="Service">
											{user.service.map((value, i) => {
												return (
													<a href={"/" + value} key={i}>{value}&nbsp;</a>)											})}
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

				<Footer />

			</div>



		);
	} else {
		return (
			<h1>GIF</h1>
		)
	}
	// <div>
	// 	<h1>Services Name</h1>
	// 	{listofBuilding.map((user, index) => {
	// 		return (
	// 			<div key={index}>
	// 				Click on the ID to see the data of the Services details :
	// 				<NavLink to={"/service/" + user}>
	// 					<div style={{ color: 'red' }}> {user} </div></NavLink>
	// 			</div>
	// 		);
	// 	})}
	// </div>

};

export default Allservices;