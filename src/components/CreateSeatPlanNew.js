import React, { useState, useEffect } from "react";
import Axios from 'axios';
import TopNav from "./TopNav";
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import "./CreateSeatPlan.css";
import Modal from 'react-modal';
import Footer from "./../Footer";

function CreateSeatPlanNew() {
    Modal.setAppElement('#root')
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    var subtitle;
    const [isBuildingModalOpen, setBuildingModalOpen] = useState(false);
    const [isFloorModalOpen, setFloorModalOpen] = useState(false);

    function openBuildingModal() {
        setBuildingModalOpen(true);
    }

    function openFloorModal() {
        setFloorModalOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeBuildingModal() {
        setBuildingModalOpen(false);
        let newBuildingName = document.getElementById("newBuildingName").value;

        if (newBuildingName.trim() === "") {
            return;
        }

        let postData = new FormData();
        postData.append("name", newBuildingName);
        postData.append("eiin", eiinNo);



        Axios.post(`${window.$apiUrl}/building.php?action=create`, postData).then(response => {
            if (response.data.issuccess) {
                //response.data.buildingId
                setBuildingOptions(buildingOptions => [...buildingOptions, <SelectOption key={response.data.buildingId} id={response.data.buildingId} name={newBuildingName} />]);
                setBuildingId(response.data.buildingId);
                setFloorOptions([]);
            }
            else {
                alert(response.message);

            }
        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again.");

        }); //end of axios.
    }

    function closeFloorModal() {

        setFloorModalOpen(false);

        if (buildingId === "") {
            alert("Select a building");
            return;
        }
        let newFloorName = document.getElementById("newFloorName").value;
        if (newFloorName.trim() === "") {
            return;
        }

        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("buildingId", buildingId);
        postData.append("name", newFloorName);



        Axios.post(`${window.$apiUrl}/floor.php?action=create`, postData).then(response => {
            if (response.data.issuccess) {
                // response.data.floorId
                setFloorOptions(floorOptions => [...floorOptions, <SelectOption key={response.data.floorId} id={response.data.floorId} name={newFloorName} />]);
                setFloorId(response.data.floorId);
            }
            else {
                alert(response.data.message);
            }

        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again.");
        }); //end of axios.
    }

    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    const [departmentId, setDepartmentId] = useState(localStorage.getItem('departmentId'));

    // console.log(localStorage.getItem('departmentId'));
    const [examId, setExamId] = useState("");
    const [examOptions, setExamOptions] = useState([]);
    const examList = examOptions.map(item => (
        item
    ))

    const [buildingId, setBuildingId] = useState("");
    const [buildingOptions, setBuildingOptions] = useState([]);
    const buildingList = buildingOptions.map(item => (
        item
    ))

    const [floorId, setFloorId] = useState("");
    const [floorOptions, setFloorOptions] = useState([]);
    const floorList = floorOptions.map(item => (
        item
    ))

    const [saveResult, setSaveResult] = useState("");
    const [buttonText, setButtonText] = useState("Save & add another");
    const [isDisbale, setDisable] = useState("");

    const [rooms, setRooms] = useState([]);

    const tableRows = rooms.map(item => (
        item
    ))


    //Get data on component load event
    useEffect(() => {
        Axios.get(`${window.$apiUrl}/exam.php?action=list&departmentid=${departmentId}`).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setExamOptions(examOptions => [...examOptions, <SelectOption key={local_count} id={item.examId} name={item.name} />]);
            })

        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.


        let buildingListParameters = new FormData();
        buildingListParameters.append("eiin", eiinNo);
        Axios.post(`${window.$apiUrl}/building.php?action=list`, buildingListParameters).then(response => {
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

    const examChanged = (e) => {
        setExamId(e.target.value);
    }

    const buildingChanged = (e) => {
        let buildingIdNo = e.target.value;
        setFloorOptions([]);
        let floorListParameters = new FormData();
        floorListParameters.append("buildingId", buildingIdNo);

        Axios.post(`${window.$apiUrl}/floor.php?action=list`, floorListParameters).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setFloorOptions(floorOptions => [...floorOptions, <SelectOption key={local_count} id={item.floorId} name={item.name} />]);
            })

        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.


        setBuildingId(e.target.value);
    }

    const floorChanged = (e) => {
        setFloorId(e.target.value);
    }


    const createRoom = (e) => {
        e.preventDefault();
        if (String(examId).trim() === "") {
            alert("Select exam.");
            return;
        }
        if (buildingId.toString().trim() === "") {
            alert("Select building.");
            return;
        }

        if (floorId.toString().trim() === "") {
            alert("Select floor.");
            return;
        }

        if (roomNo.toString().trim() === "") {
            alert("Enter room number.");
            return;
        }

        if (capacity.toString() === "") {
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
        Axios.post(`${window.$apiUrl}/room.php?action=create`, postData).then(response => {
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
                }, 3000);

                setRooms(rooms => [<TableRow key={response.data.roomId} id={response.data.roomId} r={roomNo} startRoll={startRoll} endRoll={endRoll} total={capacity} />, ...rooms]);

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

    const [roomNo, setRoomNo] = useState("");
    const [startRoll, setStartRoll] = useState("");
    const [endRoll, setEndRoll] = useState("");
    const [capacity, setCapacity] = useState("");

    const roomNoChanged = (e) => {
        e.preventDefault();
        setRoomNo(e.target.value);
    }

    const startRollChanged = (e) => {
        // e.preventDefault();
        let startRoll = e.target.value;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let startingRoll = e.target.value;

            if (startingRoll !== "" && endRoll !== "") {
                let intStartRoll = parseInt(startingRoll);
                let intEndRoll = parseInt(endRoll);
                let diff = (intEndRoll - intStartRoll) + 1;
                setCapacity(diff);
            }

            setStartRoll(e.target.value);
        }


    }

    const endRollChanged = (e) => {
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let endingRoll = e.target.value;

            if (startRoll !== "" && endingRoll !== "") {
                let intStartRoll = parseInt(startRoll);
                let intEndRoll = parseInt(endingRoll);
                let diff = (intEndRoll - intStartRoll) + 1;
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



    return (
        <>
            <div className="master-wrapper">
                <header style={{ marginBottom: "0", paddingTop: "0", boxShadow: "none" }}>
                    <TopNav />
                </header>
                <main>
                    {/* A good combobox here - https://react-select.com/home */}
                    <h1>Create New Seat Plan</h1>

                    <div className="cont box-shadow">
                        <select onChange={examChanged}>
                            <option value="">select an exam</option>
                            {examList}
                        </select>

                        <div className="buildingBlock">
                            <select onChange={buildingChanged} value={buildingId}>
                                <option value="">select building</option>
                                {buildingList}
                            </select>
                            <button id="addNewBuildingModalButton" onClick={openBuildingModal}>Add</button>
                        </div>

                        <div className="floorBlock">
                            <select onChange={floorChanged} value={floorId}>
                                <option value="">select a floor</option>
                                {floorList}
                            </select>
                            <button id="addNewFloorModalButton" onClick={openFloorModal}>Add</button>
                        </div>


                        <div className="saveResult" style={{ height: "20px" }}>{saveResult}</div>
                        <div className="input-row">
                            <div className="inputBox">
                                <label>Room No.</label>
                                <input id="roomNo" name="roomNo" onChange={roomNoChanged} value={roomNo} type="text" placeholder="" autoFocus />
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
                                <input name="roomCapacity" onChange={capacityChanged} value={capacity} type="text" maxLength="4" placeholder="" />
                            </div>

                            <div className="buttonCont">
                                <button className="saveButton" disabled={isDisbale} onClick={createRoom} name="createRoom">{buttonText}</button>
                            </div>

                        </div>

                        <div style={{ display: "block" }}>
                            {tableRows}
                        </div>
                    </div>

                    <Modal
                        isOpen={isBuildingModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeBuildingModal}
                        style={customStyles}

                        contentLabel="Example Modal"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Add New Building Name</h2>

                        <input id="newBuildingName" />

                        <button onClick={closeBuildingModal}>Save</button>
                    </Modal>

                    <Modal
                        isOpen={isFloorModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeFloorModal}
                        style={customStyles}

                        contentLabel="Example Modal New"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>Add New Floor Name</h2>
                        <input id="newFloorName" />
                        <button onClick={closeFloorModal}>Save</button>
                    </Modal>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}
export default CreateSeatPlanNew;

function SelectOption(props) {
    return (
        <option value={props.id}>{props.name}</option>
    );
}


function TableRow(props) {

    const [display, setDisplay] = useState("flex");
    const onClick = () => {

        var r = window.confirm("Are you sure to delete this room -" + props.r + " ?\nYou can add it again later.");
        if (r === true) {
            let postData = new FormData();
            postData.append("id", props.id);
            Axios.post(`${window.$apiUrl}/room.php?action=delete`, postData).then(response => {
                if (response.data.issuccess) {
                    setDisplay("none");
                    alert("Deleted successfully.");
                }
                else {
                    alert(response.data.message);
                }

            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.
        }
    }


    return (

        <div className="addedRoom" style={{ display: `${display}` }}>
            <div>{props.r}</div>
            <div>{props.startRoll === "0" ? "-" : props.startRoll}</div>
            <div>{props.endRoll === "0" ? "-" : props.endRoll}</div>
            <div>{props.total}</div>
            <div><button className="deleteRoom" onClick={onClick}>Delete</button></div>
        </div>

    );
}
