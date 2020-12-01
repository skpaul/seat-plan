import React, { useState } from "react";
import Floor from './Floor';
import "./Building.css";
import Axios from 'axios';

export default function Building(props){
    const [buildingName, setBuildingName] = useState(props.buildingName);
    const [buildingId, setBuildingId] = useState(props.buildingId);
    const[eiinNo, setEiinNo]= useState(props.eiin);

    const buildingNameChanged = event=>{
        let buildingName = event.target.value;
        setBuildingName(buildingName);

        props.updateFunction(buildingName);  //this function executes in Dashboard.js
        changeSaveBuildingButtonStyle({display:'inline-block'})
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

    const saveBuildingName=(e)=>{
        e.preventDefault();
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("id", buildingId);
        postData.append("name", buildingName);

        Axios.post("http://localhost/seat-plan/api/building.php?action=save", postData).then(response=>{
            if(response.data){
                let data = response.data;
                if(response.data.issuccess){
                    setBuildingId(response.data.buildingId);
                    console.log(buildingId);
                    changeAddFloorButtonStyle({display:'block'});
                }else{
                    alert(response.data.message);
                }
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    //initial visibility of saveBuildingButton is hidden.
    const[saveBuildingButtonStyle, changeSaveBuildingButtonStyle] = useState({display:'none'}); 

    //initial visibility of addFloorButton is hidden.
    const[addFloorButtonStyle, changeAddFloorButtonStyle] = useState({display:'none'});



    return (
  
        <div className="building">
            <div>
                <input key={props.val} type="text" onChange={buildingNameChanged} value={buildingName} name="buildingName" placeholder="building name"/>
                <button name="saveBuildingButton" onClick={saveBuildingName} style={saveBuildingButtonStyle} >Save building</button>
            </div>
            <div>
                {allFloors}
            </div>
            <button name="addFloorButton" style={addFloorButtonStyle} onClick={addNewFloor} >Add Floor</button>
        </div>
    );
}