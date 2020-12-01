import React, { useState } from "react";
import Floor from './Floor';

export default function Building(props){

    const [buildingName, setBuildingName] = useState("");

    const buildingNameChanged = event=>{
        let buildingName = event.target.value;
        setBuildingName(buildingName);
        props.updateFunction(buildingName);
    }

    const [count, setCount] = React.useState(0);
    const [floors, setFloor] = useState([]);

    const floorUpdated = (value) => {console.log("I am from biolding and value is -" + value)};

    const addNewFloor = event=>{
        event.preventDefault();
        setCount(count => count + 1);     
        setFloor(floors => [...floors, <Floor updateFunction={floorUpdated} key={count} val={count}/>]);
    }

    const allFloors = floors.map(item => (
        item
    ))

    return (
  
        <div className="building">
            <div>
                <input key={props.val} type="text" onChange={buildingNameChanged} value={buildingName} name="buildingName" placeholder="building name"/>
            </div>
            <div>
                {allFloors}
            </div>
            <button onClick={addNewFloor} >Add Floor</button>
        </div>
    );
}