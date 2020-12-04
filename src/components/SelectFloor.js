import React, {useEffect, useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import "./CreateSeatPlan.css";

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

    const apiUrl = "http://localhost";
    // const apiUrl = "http://209.126.69.61:5000";
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        // console.log(location.state.id); // result: 'some_value'
        setEiin(location.state.eiin);
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);

        let postData = new FormData();
        postData.append("buildingId", location.state.buildingId);
        
        Axios.post(`${apiUrl}/seat-plan/api/floor.php?action=list`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setOption(options => [...options, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
            }); //end of axios.

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
            <h1>Select Floor</h1>
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