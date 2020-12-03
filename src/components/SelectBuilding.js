import React, {useEffect, useState} from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";

export default function SelectBuilding(props){

    const location = useLocation();

    const[examId, setExamId]=useState("");
    const[eiinNo, setEiin] = useState("");
    const[options, setOption]=useState([]);
    const selectOptions = options.map(item => (
        item
    ))

    //const apiUrl = "http://localhost";
    const apiUrl = "http://209.126.69.61:5000";
    
    useEffect(() => {
        // console.log(location.pathname); // result: '/secondpage'
        // console.log(location.search); // result: '?query=abc'
        console.log(location.state.id); // result: 'some_value'
        console.log(location.state.eiin); // result: 'some_value'
        setEiin(location.state.eiin);
        setExamId(location.state.id);

        let postData = new FormData();
         postData.append("eiin", location.state.eiin);
        
        Axios.post(`${apiUrl}/seat-plan/api/building.php?action=list`, postData).then(response => {
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
    
     let history = useHistory();
     const[buildingId, setBuildingId]=useState("");
     const buildingChanged=(e)=>{
        if(e.target.value==="create"){
            history.push({
                pathname: '/seat-plan/new/create-building',
                search: '?query=abc',
                state: { id: examId, eiin:eiinNo }
            });
        }
        
        setBuildingId(e.target.value);
     }

     const goToRoomSelection=(e)=>{
         e.preventDefault();
         
       if(buildingId===""){
           alert("Select a room");
           return;
       }
        history.push({
            pathname: '/seat-plan/new/select-floor',
            search: '?query=abc',
            state: { examId: examId, eiin:eiinNo, buildingId: buildingId}
        });
     }
    return(
        <>
        <TopNav/>
       <h1>Select Building</h1>
        <select onChange={buildingChanged} value={buildingId}>
            <option value="">select building</option>
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