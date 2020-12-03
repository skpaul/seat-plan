import React, {useEffect, useState} from 'react';
// import { useLocation } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import { useLocation, useHistory } from "react-router-dom";

export default function CreateRoom(props){

    const location = useLocation();
    const history = useHistory();

    const[eiinNo, setEiin]=useState("");
    const[examId, setExamId]=useState("");
    const[buildingId, setBuildingId] = useState("");
    const[floorId, setFloorId]=useState("");

    const apiUrl = "http://localhost"; //http://209.126.69.61:5000
    useEffect(() => {
        setEiin(location.state.eiin)
        setExamId(location.state.examId);
        setBuildingId(location.state.buildingId);
        setFloorId(location.state.floorId);
     }, []); //end of useEffect()

    
    
     const createRoom=(e)=>{
         e.preventDefault();
         let postData = new FormData();
         postData.append("eiin", eiinNo);
         postData.append("buildingId", buildingId);
         postData.append("floorId", floorId);
         postData.append("examId", examId);
         postData.append("roomNo", roomNo);
         postData.append("startRoll", startRoll);
         postData.append("endRoll", endRoll);
         postData.append("capacity", capacity);
        
        Axios.post(`${apiUrl}/seat-plan/api/room.php?action=create`, postData).then(response => {
            console.log(response.data);
           
            // history.push({
            //     pathname: '/seat-plan/new/create-room',
            //     search: '?query=abc',
            //     state: { examId: examId, eiin:eiinNo, buildingId:buildingId, floorId:response.data.floorId }
            // });

            }).catch(error => {
                console.log(error);
            }); //end of axios.

       
    }

    const[floorName, setFloorName] = useState("");
    const floorNameChanged=(e)=>{
        e.preventDefault();
        setFloorName(e.target.value);
    }

    const[roomNo, setRoomNo] = useState("");
    const[startRoll, setStartRoll] = useState("");
    const[endRoll, setEndRoll] = useState("");
    const[capacity, setCapacity] = useState("");

    const roomNoChanged=(e)=>{
        e.preventDefault();
        setRoomNo(e.target.value);
    }

    const startRollChanged=(e)=>{
        e.preventDefault();
        setStartRoll(e.target.value);
    }

    const endRollChanged=(e)=>{
        e.preventDefault();
        setEndRoll(e.target.value);
    }

    const capacityChanged=(e)=>{
        e.preventDefault();
        setCapacity(e.target.value);
    }

    return(
        <>
            <TopNav/>
            <h1>Create Room</h1>
            <div>
                <div className="room-row">
                    <input name="roomNo" onChange={roomNoChanged} value={roomNo} type="text"  placeholder="room number" />
                    <input name="startRoll" onChange={startRollChanged} value={startRoll} type="text" placeholder="start roll (optional)" />
                    <input name="endRoll" onChange={endRollChanged} value={endRoll} type="text" placeholder="end roll (optional)" />
                    <input name="roomCapacity" onChange={capacityChanged} value={capacity} type="text" placeholder="total quantity" />
                    <button onClick={createRoom} name="createRoom">Save</button>
                   
                </div>
            </div>
    </>
    );
}
