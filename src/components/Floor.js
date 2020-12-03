import React, { useState, useEffect } from "react";
import Room from './Room';
import "./Floor.css";
import Axios from 'axios';

export default function Floor(props){

    const [floorId, setFloorId] = useState(props.floorId);

    const [floorName, setFloorName] = useState("");

    const floorNameChanged = event=>{
        let floorName = event.target.value;
        setFloorName(floorName);
        props.updateFunction(floorName);
    }

    const [count, setCount] = React.useState(0);
    const [rooms, setRoom] = useState([]);

    const roomUpdated = (value) => {console.log("I am from biolding and value is -" + value)};

    //const apiUrl = "http://localhost";
    const apiUrl = "http://209.126.69.61:5000";

    //Get data on component load event
    useEffect(()=>{
        let postData = new FormData();
        postData.append("floorId", floorId);

        //Get floors
        Axios.post(`${apiUrl}/seat-plan/api/room.php?action=list`, postData).then(response => {
            const items = response.data;
            console.log(items);
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setRoom(rooms => [...rooms, <Room roomId={item.id} updateFunction={roomUpdated} key={local_count} />]);
            })
            // setCount(count => count + local_count);
            setCount(local_count);
        }).catch(error => {
            console.log(error);
        });
    }, []); //end of useEffect

    const addNewRoom = event=>{
        console.log("Room created");
        event.preventDefault();
        setCount(count => count + 1);     
        setRoom(rooms=>[...rooms, <Room updateFunction={roomUpdated} key={count} val={count}/>]);
    }

    const allRooms = rooms.map(item => (
        item
    ))

    return (
        <div className="floor">
            <div className="floor-row">
                <label className="floor-name-label">Floor Name</label>
                <select onChange={floorNameChanged} className="floor-name-select">
                    <option value="">select</option>
                    <option value="Ground floor">Ground floor</option>
                    <option value="1st floor">1st floor</option>
                    <option value="2nd floor">2nd floor</option>
                    <option value="3rd floor">3rd floor</option>
                    <option value="4th floor">4th floor</option>

                </select>
            </div>
            <div>{allRooms}</div>
            <div className="add-romm-button-container">
            <button onClick={addNewRoom} className="add-room-button" >Add Room</button>
            </div>
            
        </div>
    );
}