import React, {useEffect, useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import "./CreateSeatPlan.css";
import "./SelectFloor.css";

export default function SelectFloor(props){

    const location = useLocation();
    const history = useHistory();

    const[examId, setExamId]=useState("");
    const[eiinNo, setEiin] = useState("");
    const[buildingId, setBuildingId]=useState("");
    const[floorId, setFloorId] = useState("");
    const[options, setOption]=useState([]);
    const selectOptions = options.map(item => (
        item
    ))

    const[examName, setExamName]=useState("");
    const[reference, setReference]=useState("");
    const[saveResult, setSaveResult] = useState("");
    const[buttonText, setButtonText]=useState("Save & add another");
    const[isDisbale, setDisable]=useState("");
    const[buildingName, setBuildingName] = useState("");
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        // console.log(location.state.id); // result: 'some_value'
        setEiin(location.state.eiin);
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);

        let buildingIdData = new FormData();
        buildingIdData.append("buildingId", location.state.buildingId);
        
        Axios.post(`${window.$baseUrl}/seat-plan/api/floor.php?action=list`, buildingIdData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setOption(options => [...options, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.

        let examIdData = new FormData();
        examIdData.append("examId", location.state.examId);
        Axios.post(`${window.$baseUrl}/seat-plan/api/exam.php?action=details`, examIdData).then(response => {
            const item = response.data;
            setExamName(item.name);
            setReference(item.reference);
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of exam axios.

        let buildingData = new FormData();
        buildingData.append("id", location.state.buildingId);
        Axios.post(`${window.$baseUrl}/seat-plan/api/building.php?action=details`, buildingData).then(response => {
            const item = response.data;
            setBuildingName(item.name);
            
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of building axios.

     }, []); //end of useEffect()

     const floorChanged=(e)=>{
        if(e.target.value==="create"){
            history.push({
                pathname: '/seat-plan/new/create-floor',
                search: '?query=abc',
                state: { examId: examId, eiin:eiinNo, buildingId:buildingId }
            });
        }
        setFloorId(e.target.value);
     }

     const goToRoomSelection=(e)=>{
         e.preventDefault();
        if(floorId===""){
            alert("Select a floor");
            return;
        }
        history.push({
            pathname: '/seat-plan/new/create-room',
            search: '?query=abc',
            state: { examId: examId, eiin:eiinNo, buildingId:buildingId, floorId:floorId }
        });
     }
    return(
        <>
            <TopNav />
            <div className="examName">{examName}</div>
            <div className="reference">({reference})</div>

            <h1>Select Floor</h1>
            <div className="buildingAndFloor">
                <div className="buildingName">Building: {buildingName}</div>
            </div>

            <div className="cont box-shadow">
                <select onChange={floorChanged} value={floorId}>
                    <option value="">select a floor</option>
                    {selectOptions}
                    <optgroup label="_________">
                        <option value="create">Create New</option>
                    </optgroup>
                </select>
                <button onClick={goToRoomSelection}>Next</button>
            </div>
        </>
    );
}

function SelectOption(props){
    return(
        <option value={props.id}>{props.name}</option>
    );
}