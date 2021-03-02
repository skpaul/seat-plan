import React, { useState } from 'react';
import Axios from 'axios';


export default function SeatPlanTableRow(props){
    
    const[display, setDisplay] = useState("");

    const roomDeleted = floorId =>{
        // let floorId = event.target.value;
       
        props.roomDeleted(floorId);
    }

    const onClick = () => {
       
        var r = window.confirm("Are you sure to delete this room -" + props.r + " ?\nYou can add it again later.");
        if (r === true) {
            let postData = new FormData();
            postData.append("id", props.id);
            Axios.post(`${window.$apiUrl}/room.php?action=delete`, postData).then(response => {
                if(response.data.issuccess){
                   // setDisplay("none");
                    roomDeleted(props.id);
                    alert("Deleted successfully.");
                }
                else{
                    alert(response.data.message);
                }
               
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.
        } 
    }
    return(
        <tr style={{display:`${display}`}}>
            <td>
                {props.b}
            </td>
            <td>
                {props.f}
            </td>
            <td>
                {props.r}
            </td>
            <td>
                {props.startRoll === "0"?"-":props.startRoll}
            </td>
            <td>
                {props.endRoll === "0" ? "-":props.endRoll}
            </td>
            <td>
                {props.total}
            </td>
            <td>
               <button className="deleteRoom" onClick={onClick}>Delete</button>
            </td>
        </tr>
    );
}