import React, {useEffect, useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";

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

    const apiUrl = "http://localhost"; //http://209.126.69.61:5000
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        // console.log(location.state.id); // result: 'some_value'

        // console.log(location.state.eiin); // result: 'some_value'
        // console.log(location.state.eiin);
        // console.log(location.state.examId);
        setEiin(location.state.eiin);
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);

        let postData = new FormData();
        postData.append("buildingId", location.state.buildingId);
        
        Axios.post(`${apiUrl}/seat-plan/api/floor.php?action=list`, postData).then(response => {
            const items = response.data;
             console.log(items);
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
        <TopNav/>
       <h1>Select Floor</h1>
        <select onChange={floorChanged} value={floorId}>
            <option value="">select a floor</option>
            {selectOptions}

            <option value="create">Create New</option>
        </select>

        <button onClick={goToRoomSelection}>Next</button>
    </>
    );
}

function SelectOption(props){
    return(
    <option value={props.id}>{props.name}</option>
    );
}