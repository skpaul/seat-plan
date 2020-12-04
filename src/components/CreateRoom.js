import React, {useEffect, useState} from 'react';
// import { useLocation } from "react-router-dom";
import Axios from 'axios';
import TopNav from "./TopNav";
import { useLocation, useHistory } from "react-router-dom";
import "./CreateRoom.css";

export default function CreateRoom(props){

    const location = useLocation();
    const history = useHistory();

    const[eiinNo, setEiin]=useState("");
    const[examId, setExamId]=useState("");
    const[buildingId, setBuildingId] = useState("");
    const[floorId, setFloorId]=useState("");

    //const apiUrl = "http://localhost";
    const apiUrl = "http://209.126.69.61:5000";
    
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
           if(response.data.issuccess){

           }
           else{
                alert(response.data.message);
           }
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
        // e.preventDefault();
        let startRoll = e.target.value;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let startingRoll = e.target.value;
            
            if(startingRoll !=="" && endRoll !==""){
                let intStartRoll = parseInt(startingRoll);
                let intEndRoll = parseInt(endRoll);
                let diff = intEndRoll - intStartRoll;
                setCapacity(diff);
            }

            setStartRoll(e.target.value);
        }

        
    }

    const endRollChanged=(e)=>{
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let endingRoll = e.target.value;
            
            if(startRoll !=="" && endingRoll !==""){
                let intStartRoll = parseInt(startRoll);
                let intEndRoll = parseInt(endingRoll);
                let diff = intEndRoll - intStartRoll;
                setCapacity(diff);
            }

            setEndRoll(e.target.value);
        }
    }

    const capacityChanged = (e) => {
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setCapacity(e.target.value);
        }
    }


    return(
        <>
            <TopNav/>
            <h1>Create Room</h1>
            <div className="cont box-shadow">
                <div className="input-row">
                    <div className="inputBox">
                        <label>Room No.</label>
                        <input name="roomNo" onChange={roomNoChanged} value={roomNo} type="text"  placeholder="" />
                    </div>
                    
                    <div className="inputBox">
                        <label>Start Roll</label>
                        <input name="startRoll" onChange={startRollChanged} value={startRoll} type="text" placeholder="(optional)" />
                    </div>
                    <div className="inputBox">
                        <label>End Roll</label>
                        <input name="endRoll" onChange={endRollChanged} value={endRoll} type="text" placeholder="(optional)" />
                    </div>

                    <div className="inputBox">
                        <label>Total</label>
                        <input name="roomCapacity" onChange={capacityChanged}  value={capacity} type="text" maxLength="4" placeholder="" />
                    </div>
                </div>

                <button onClick={createRoom} name="createRoom">Save and Add Another</button>
            </div>
    </>
    );
}
