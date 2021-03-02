import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import { Link, useHistory} from 'react-router-dom';


export default function Home(props){
    const history = useHistory();
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);
    //Get data on component load event
    useEffect(() => {
        Axios.post(`${window.$apiUrl}/department-ministry.php?action=list`).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setDepartments(departments => [...departments, <SelectOption key={item.departmentId} id={item.departmentId} name={item.departmentName} />]);
            })

        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.

    }, []); //end of useEffect
















    //combobox change event handler
    const goToNext = (e)=>{
        e.preventDefault();
        if (String(departmentId).trim() === "") {
            alert("Select department.");
            return;
        }

        history.push({
            pathname: '/login',
            // search: '?query=abc',
            state: { departmentId: departmentId }
        });
    }

    const departmentChanged = (e) => {
        setDepartmentId(e.target.value);
    }

    return(
        <div className="master-wrapper">
            <main>
                <h1>Seat Plan Management</h1>
              
                <div className="selectWrapper">
                    <select className="selectDepartment" onChange={departmentChanged}>
                        <option value="">select department</option>
                            {departments}
                    </select>
                    <div className="nextButton" onClick={goToNext} >NEXT</div>
                </div>
            </main>
        </div>
    );
}


function SelectOption(props) {
    return (
        <option value={props.id}>{props.name}</option>
    );
}