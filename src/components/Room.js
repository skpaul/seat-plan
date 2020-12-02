import React, {useEffect, useState} from "react";
import "./Room.css";
import Axios from 'axios';

export default function Room(props){

    const[roomId, setRoomId] = useState(props.roomId);
    const[roomNo, setRoomNo] = useState("");
    const[startRoll, setStartRoll] = useState("");
    const[endRoll, setEndRoll] = useState("");
    const[capacity, setCapacity] = useState("");

    //Get data on component load event
    const apiUrl = "http://localhost"; //http://209.126.69.61:5000
    useEffect(()=>{
        let postData = new FormData();
        postData.append("roomId", roomId);
        //Get room details
        Axios.post(`${apiUrl}/seat-plan/api/room.php?action=details`, postData).then(response => {
            const item = response.data;
            setRoomNo(item.roomNo);
            setStartRoll(item.startRoll);
            setEndRoll(item.endRoll);
            setCapacity(item.capacity);
        }).catch(error => {
            console.log(error);
        });
    }, []); //end of useEffect

    return (
        <div>
            <div className="room-row">
                <input name="roomNo" value={roomNo} type="text"  placeholder="room number" />
                <input name="startRoll" value={startRoll} type="text" placeholder="start roll (optional)" />
                <input name="endRoll" type="text" placeholder="end roll (optional)" />
                <input name="roomCapacity" value={capacity} type="text" placeholder="total quantity" />
                <button name="saveRoom">Save</button>
                <button name="deleteRoom">Save</button>
            </div>
        </div>
    );
}