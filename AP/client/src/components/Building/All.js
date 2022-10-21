import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const All = () => {


    const [listofBuilding,setListOfBuilding] = useState([]);
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:5008/getBuildings')
    .then((response) =>{
        setListOfBuilding(response.data);
        console.log(response.data);
        })
  },[]);
  

	return (
		<div>
			<h1>Building Names</h1>
			{listofBuilding.map((user,index) => {
				return (
					<div key={index}>
						Click on the id to see the Building details :
						<NavLink to={"/building/" + user}> 
						<div style={{color:'red'}}> {user} </div></NavLink>

					</div>
				);
			})}
		</div>
	);
};

export default All;