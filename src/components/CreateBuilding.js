import React, {useEffect, useState} from 'react';
// import { useLocation } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import { useLocation, useHistory } from "react-router-dom";
import "./CreateSeatPlan.css";

export default function CreateBuilding(props){

    const location = useLocation();
    const history = useHistory();

    const[examId, setExamId]=useState("");
    const[eiinNo, setEiin]=useState("");

    const apiUrl = "http://localhost";
    // const apiUrl = "http://209.126.69.61:5000";
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        // console.log(location.state.id); // result: 'some_value'

        setEiin(location.state.eiin)
        setExamId(location.state.id);
    }, []); //end of useEffect()

    
    
    const createBuilding=(e)=>{
         e.preventDefault();
         let postData = new FormData();
         postData.append("name", buildingName);
         postData.append("eiin", eiinNo);
        
        Axios.post(`${apiUrl}/seat-plan/api/building.php?action=create`, postData).then(response => {
            console.log(response.data);
           
            history.push({
                pathname: '/seat-plan/new/select-floor',
                search: '?query=abc',
                state: { examId: examId, eiin:eiinNo, buildingId:response.data. buildingId}
            });

            }).catch(error => {
                console.log(error);
            }); //end of axios.

       
    }

    const[buildingName, setBuildingName] = useState("");
    const buildingNameChanged=(e)=>{
        e.preventDefault();
        setBuildingName(e.target.value);
    }

    return(
        <>
            <TopNav/>
            <h1>Create New Building</h1>
            <div className="cont box-shadow">
                <input onChange={buildingNameChanged} value={buildingName} type="text" />
                <button onClick={createBuilding}>Next</button>
            </div>
            
        </>
    );
}
