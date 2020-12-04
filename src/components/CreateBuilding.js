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
    const[examName, setExamName]=useState("");
    const[reference, setReference]=useState("");
    const[eiinNo, setEiin]=useState("");

    const[buttonText, setButtonText]=useState("Next");
    const[isDisbale, setDisable]=useState("");
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        // console.log(location.state.id); // result: 'some_value'

        setEiin(location.state.eiin)
        setExamId(location.state.id);

        let examPostData = new FormData();
        examPostData.append("examId", location.state.id);
        Axios.post(`${window.$baseUrl}/seat-plan/api/exam.php?action=details`, examPostData).then(response => {
            const item = response.data;
            setExamName(item.name);
            setReference(item.reference);
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of exam axios.

    }, []); //end of useEffect()

    
    
    const createBuilding=(e)=>{
         e.preventDefault();
         if(buildingName.trim()===""){
             alert("Enter building name.");
             return;
         }
         let postData = new FormData();
         postData.append("name", buildingName);
         postData.append("eiin", eiinNo);
        
         setDisable("disabled");
         setButtonText("saving ...");

        Axios.post(`${window.$baseUrl}/seat-plan/api/building.php?action=create`, postData).then(response => {
            if (response.data.issuccess) {
                history.push({
                    pathname: '/seat-plan/new/select-floor',
                    search: '?query=abc',
                    state: { examId: examId, eiin: eiinNo, buildingId: response.data.buildingId }
                });
            }
            else {
                alert(response.message);
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

    const[buildingName, setBuildingName] = useState("");
    const buildingNameChanged=(e)=>{
        e.preventDefault();
        setBuildingName(e.target.value);
    }

    return(
        <>
            <TopNav/>
            <div className="examName">{examName}</div>
            <div className="reference">({reference})</div>
            <h1>Create New Building</h1>
            <div className="cont box-shadow">
                <input onChange={buildingNameChanged} value={buildingName} type="text" placeholder="type building name" />
                <button onClick={createBuilding} disabled={isDisbale}>{buttonText}</button>
            </div>
            
        </>
    );
}
