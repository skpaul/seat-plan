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
        setEiin(location.state.eiin);
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);

        let postData = new FormData();
        postData.append("buildingId", buildingId);
        
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

     }
    return(
        <>
        <TopNav/>
       
        <select onChange={buildingChanged}>
            <option value="">select an exam</option>
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