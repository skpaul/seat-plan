import React, {useEffect, useState} from 'react';
// import { useLocation } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import { useLocation, useHistory } from "react-router-dom";

export default function CreateFloor(props){

    const location = useLocation();
    const history = useHistory();

    const[examId, setExamId]=useState("");
    const[eiinNo, setEiin]=useState("");
    const[buildingId, setBuildingId] = useState("");

    const apiUrl = "http://localhost"; //http://209.126.69.61:5000
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'
        setEiin(location.state.eiin)
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);
     }, []); //end of useEffect()

    
    
     const createFloor=(e)=>{
         e.preventDefault();
         let postData = new FormData();
         postData.append("eiin", eiinNo);
         postData.append("buildingId", buildingId);
         postData.append("name", floorName);
        
        Axios.post(`${apiUrl}/seat-plan/api/floor.php?action=create`, postData).then(response => {
            console.log(response.data);
           
            history.push({
                pathname: '/seat-plan/new/create-room',
                search: '?query=abc',
                state: { examId: examId, eiin:eiinNo, buildingId:buildingId, floorId:response.data.floorId }
            });

            }).catch(error => {
                console.log(error);
            }); //end of axios.

       
    }

    const[floorName, setFloorName] = useState("");
    const floorNameChanged=(e)=>{
        e.preventDefault();
        setFloorName(e.target.value);
    }

    return(
        <>
            <TopNav/>
            <h1>Create Floor</h1>
            <input onChange={floorNameChanged} value={floorName} type="text" />
            <button onClick={createFloor}>Next</button>
    </>
    );
}
