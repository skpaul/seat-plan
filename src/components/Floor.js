import React, { useState } from "react";
import Room from './Room';

export default function Floor(props){

    const [floorName, setFloorName] = useState("");

    const floorNameChanged = event=>{
        let floorName = event.target.value;
        setFloorName(floorName);
        props.updateFunction(floorName);
    }

    const [count, setCount] = React.useState(0);
    const [rooms, setRoom] = useState([]);

    const roomUpdated = (value) => {console.log("I am from biolding and value is -" + value)};

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
            <div>
                {/* <input type="text" onChange={floorNameChanged} value={floorName} name="floorName" placeholder="floor number"/> */}
                <select onChange={floorNameChanged}>
                    <option value="">select</option>
                    <option value="Ground floor">Ground floor</option>
                    <option value="1st floor">1st floor</option>
                    <option value="2nd floor">2nd floor</option>
                    <option value="3rd floor">3rd floor</option>
                    <option value="4th floor">4th floor</option>

                </select>
            </div>
            <div>{allRooms}</div>
            <button onClick={addNewRoom} >Add Room</button>
        </div>
    );
}