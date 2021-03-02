import React, { useState } from "react";
import Axios from "axios";
import "./Home.css";
import { Link, useHistory} from 'react-router-dom';


export default function Home(props){
    const history = useHistory();

    const [departmentId, setDepartmentId] = useState("");

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
                        <option>Select ...</option>
                        <option value="123">Directorate Of Secondary & Higher Education</option>
                    </select>
                    <div className="nextButton" onClick={goToNext} >NEXT</div>
                </div>
            </main>
        </div>
    );
}