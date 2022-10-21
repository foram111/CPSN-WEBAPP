import axios from "axios";
import React, { useState, useEffect } from 'react';
import $, { data } from "jquery";
// import dt from 'datatables.net';

import './table.css'

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

function Admin() {

    const [listofUsers, setLisOfUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5008/getUsers')
            .then((response) => {
                setLisOfUsers(response.data);
                console.log(response.data)
            })
    }, []);

    $(document).ready(function () {
        $('#table_id').DataTable({
            retrieve: true,
            lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]
        });
    });



    return (
        <>
        <h1 style={{ fontSize: '3rem',marginTop:'5rem' }}>Admin Panel</h1>

            <div className='buildingTable'>

                <table id="table_id" className="display ">
                    <thead>
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
                        {listofUsers.map((user, index) => {
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

        </>
    );

}


export default Admin;
