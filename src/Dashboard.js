import React, { useEffect, useState } from "react";
import Axios from "axios";
import Building from "./components/Building";

export default function Dashboard(props){
   let eiin = localStorage.getItem('eiin');

   if(eiin == null || eiin === ""){
       props.history.push('/');
   }

   const [district, setDistrict] = useState("");
   useEffect(()=>{
        let postData = new FormData();
        postData.append("eiin", eiin);
        Axios.post("http://localhost/seat-plan/api/institute-details.php",postData).then(response=>{
            let data = response.data;
            setDistrict(data.district);
        }).catch(error=>{
            console.log(error);
        });
   },[]);



    const [buildings, setBuilding] = useState([]);
    const [count, setCount] = React.useState(0);

    //This function is passed to Building and called from there.
    const buildingUpdated = (value) => {console.log("I am from dashboard and value is -" + value)};

    const addNewFloor = event=>{
        event.preventDefault();
        setCount(count => count + 1);
        setBuilding(buildings => [...buildings, <Building updateFunction={buildingUpdated} key={count} val={count}/>]);
    }

    const allBuildings = buildings.map( item => (
        item
    ))

    return(
        <>
            <div>Im Dashboard {district}</div>
            <div>{eiin}</div>
            <button onClick={addNewFloor}>Add Building</button>
            <div>
                {allBuildings}
            </div>
        </>
    ) ;

}
