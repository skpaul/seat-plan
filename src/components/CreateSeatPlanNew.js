import React, { useState, useEffect } from "react";
import Axios from 'axios';
import TopNav from "./TopNav";
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import "./CreateSeatPlan.css";

function CreateSeatPlanNew(){
    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    const[examId, setExamId] = useState("");
    const[examOptions, setExamOptions]=useState([]);
    const examList = examOptions.map(item => (
        item
    ))

    const[buildingId, setBuildingId]=useState("");
    const[buildingOptions, setBuildingOptions]=useState([]);
    const buildingList = buildingOptions.map(item => (
        item
    ))

    const[floorId, setFloorId] = useState("");
    const[floorOptions, setFloorOptions]=useState([]);
    const floorList = floorOptions.map(item => (
        item
    ))

    const[saveResult, setSaveResult] = useState("");
    const[buttonText, setButtonText]=useState("Save & add another");
    const[isDisbale, setDisable]=useState("");
    
    const[rooms, setRooms]=useState([]);

    const tableRows = rooms.map(item => (
        item
    ))


    //Get data on component load event
    useEffect(()=>{
        Axios.post(`${window.$baseUrl}/seat-plan/api/exam.php?action=list`).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setExamOptions(examOptions => [...examOptions, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.


         let buildingListParameters = new FormData();
         buildingListParameters.append("eiin", eiinNo);
        Axios.post(`${window.$baseUrl}/seat-plan/api/building.php?action=list`, buildingListParameters).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setBuildingOptions(buildingOptions => [...buildingOptions, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.

    }, []); //end of useEffect

    const examChanged=(e)=>{
        setExamId(e.target.value);
     }

     const buildingChanged=(e)=>{
         let buildingIdNo = e.target.value;
            setFloorOptions([]);
         let floorListParameters = new FormData();
         floorListParameters.append("buildingId", buildingIdNo);
        
        Axios.post(`${window.$baseUrl}/seat-plan/api/floor.php?action=list`, floorListParameters).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setFloorOptions(floorOptions => [...floorOptions, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.


        setBuildingId(e.target.value);
     }

     const floorChanged=(e)=>{
        setFloorId(e.target.value);
     }

     
     const createRoom=(e)=>{
        e.preventDefault();
        if(roomNo.trim() === ""){
            alert("Enter room number.");
            return;
        }

        if(capacity === ""){
           alert("Enter total capacity.");
           return;
       }

        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("buildingId", buildingId);
        postData.append("floorId", floorId);
        postData.append("examId", examId);
        postData.append("roomNo", roomNo);
        postData.append("startRoll", startRoll);
        postData.append("endRoll", endRoll);
        postData.append("capacity", capacity);
       
        setDisable("disabled");
        setButtonText("saving ...");
        Axios.post(`${window.$baseUrl}/seat-plan/api/room.php?action=create`, postData).then(response => {
               if (response.data.issuccess) {
                   setRoomNo("");
                   setStartRoll("");
                   setEndRoll("");
                   setCapacity("");
                   setSaveResult("Saved successfully.");
                   setDisable("");
                   setButtonText("Save & add another");
                   document.getElementById("roomNo").focus();
                   setTimeout(() => {
                       setSaveResult(" ");
                   }, 4000);

               setRooms(rooms => [ <TableRow key={response.data.roomId} id={response.data.roomId} r={roomNo} startRoll={startRoll} endRoll={endRoll} total={capacity} />, ...rooms]);

               }
               else {
                   alert(response.data.message);
                   setDisable("");
                   setButtonText("Try again");
               }

        }).catch(error => {
            console.log(error);
            alert("Failed to save");
            setDisable("");
            setButtonText("Try again");
        }); //end of axios.
      
   }

   // const[floorName, setFloorName] = useState("");
   // const floorNameChanged=(e)=>{
   //     e.preventDefault();
   //     setFloorName(e.target.value);
   // }

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
            {/* A good combobox here - https://react-select.com/home */}
            <h1>Select Examination HI-2</h1>

            <div className="cont box-shadow">
                <select onChange={examChanged}>
                    <option value="">select an exam</option>
                    {examList}
                </select>

                <select onChange={buildingChanged} value={buildingId}>
                    <option value="">select building</option>
                    {buildingList}

                    <optgroup label="_________">
                        <option value="create">Create New</option>
                    </optgroup>
                   
                </select>

                <select onChange={floorChanged} value={floorId}>
                    <option value="">select a floor</option>
                    {floorList}
                    
                </select>
               
            </div>

            <div className="cont box-shadow">
                <div className="saveResult" style={{height:"20px"}}>{saveResult}</div>
                <div className="input-row">
                    <div className="inputBox">
                        <label>Room No.</label>
                        <input id="roomNo" name="roomNo" onChange={roomNoChanged} value={roomNo} type="text"  placeholder=""  autoFocus />
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

                    <div className="buttonCont">
                    <button className="saveButton"  disabled={isDisbale} onClick={createRoom} name="createRoom">{buttonText}</button>
                    </div>
                    
                </div>

                <div style={{display:"block"}}>
                        {tableRows}
                </div>
            </div>
        </>
    );
}
export default CreateSeatPlanNew;

function SelectOption(props){
    return(
    <option value={props.id}>{props.name}</option>
    );
}


function TableRow(props){
    
    const[display, setDisplay] = useState("flex");
    const onClick = () => {
       
        var r = window.confirm("Are you sure to delete this room -" + props.r + " ?\nYou can add it again later.");
        if (r === true) {
            let postData = new FormData();
            postData.append("id", props.id);
            Axios.post(`${window.$baseUrl}/seat-plan/api/room.php?action=delete`, postData).then(response => {
                if(response.data.issuccess){
                    setDisplay("none");
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

            <div className="addedRoom" style={{display:`${display}`}}>
                <div>{props.r}</div>
                <div>{props.startRoll === "0"?"-":props.startRoll}</div>
                <div>{props.endRoll === "0" ? "-":props.endRoll}</div>
                <div>{props.total}</div>
                <div><button className="deleteRoom" onClick={onClick}>Delete</button></div>
            </div>
       
    );
}
