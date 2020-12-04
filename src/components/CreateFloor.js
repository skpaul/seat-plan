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

    const[examName, setExamName]=useState("");
    const[reference, setReference]=useState("");
    const[saveResult, setSaveResult] = useState("");
    const[buttonText, setButtonText]=useState("Next");
    const[isDisbale, setDisable]=useState("");
    const[buildingName, setBuildingName] = useState("");

    // const apiUrl = "http://localhost";
    const apiUrl = "http://209.126.69.61:5000";
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        setEiin(location.state.eiin)
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);

        let examIdData = new FormData();
        examIdData.append("examId", location.state.examId);
        Axios.post(`${apiUrl}/seat-plan/api/exam.php?action=details`, examIdData).then(response => {
            const item = response.data;
            setExamName(item.name);
            setReference(item.reference);
            }).catch(error => {
                console.log(error);
            }); //end of exam axios.

        let buildingData = new FormData();
        buildingData.append("id", location.state.buildingId);
        Axios.post(`${apiUrl}/seat-plan/api/building.php?action=details`, buildingData).then(response => {
            const item = response.data;
            setBuildingName(item.name);
            
            }).catch(error => {
                console.log(error);
            }); //end of building axios.

     }, []); //end of useEffect()

    
    
     const createFloor=(e)=>{
         e.preventDefault();
         if(floorName.trim() ===""){
             alert("Enter floor name.");
             return;
         }
         let postData = new FormData();
         postData.append("eiin", eiinNo);
         postData.append("buildingId", buildingId);
         postData.append("name", floorName);
        
         setDisable("disabled");
         setButtonText("saving ...");

        Axios.post(`${apiUrl}/seat-plan/api/floor.php?action=create`, postData).then(response => {
            if(response.data.issuccess){
                history.push({
                    pathname: '/seat-plan/new/create-room',
                    search: '?query=abc',
                    state: { examId: examId, eiin:eiinNo, buildingId:buildingId, floorId:response.data.floorId }
                });
            }
           else{
               alert(response.data.message);
                setDisable("");
                setButtonText("Try again");
           }

            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again.");
                setDisable("");
                setButtonText("Try again");
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
            <div className="examName">{examName}</div>
            <div className="reference">({reference})</div>
            <h1>Create Floor</h1>
            <div className="buildingAndFloor">
                <div className="buildingName">Building: {buildingName}</div>
            </div>

            <div className="cont box-shadow">
                <input onChange={floorNameChanged} value={floorName} type="text" placeholder="type floor name" />
                <button onClick={createFloor} disabled={isDisbale}>{buttonText}</button>
            </div>

    </>
    );
}
