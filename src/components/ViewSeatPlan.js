import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./ViewSeatPlan.css";

export default function ViewSeatPlan(props){

    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    const[examId, setExamId] = useState("");
    const[options, setOption]=useState([]);
    const[rows, setRow]=useState([]); //for table tr

    const apiUrl = "http://localhost"; //http://209.126.69.61:5000

    //Get data on component load event
    useEffect(()=>{
        let postData = new FormData();
        // postData.append("eiin", eiinNo);
         postData.append("examId", examId);
        Axios.post(`${apiUrl}/seat-plan/api/exam.php?action=list`, postData).then(response => {
            const items = response.data;
            console.log(items);
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setOption(options => [...options, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
            }); //end of axios.
    }, []); //end of useEffect

    const selectOptions = options.map(item => (
        item
    ))

    const tableRows = rows.map(item => (
        item
    ))


    const[totalCapacity, setTotalCapacity] = useState(0);

    const examChanged=(e)=>{
        let examId = e.target.value;
        if(examId==""){
            setRow([]);
            setTotalCapacity(0);
            return;
        }

        let postData = new FormData();
         postData.append("eiin", eiinNo);
         postData.append("examId", examId);
        Axios.post(`${apiUrl}/seat-plan/api/view-seat-plan.php?action=list`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setTotalCapacity(prevTotal=>prevTotal+ parseInt(item.capacity) );
                setRow(rows => [...rows, <TableRow key={local_count} b={item.building} f={item.floor} r={item.roomNo} startRoll={item.startRoll} endRoll={item.endRoll} total={item.capacity} />]);
            })
            // setCount(count => count + local_count);
            //setCount(local_count);
            }).catch(error => {
                console.log(error);
            }); //end of axios.
    }

    return(
        <>
            {/* A good combobox here - https://react-select.com/home */}
            <select onChange={examChanged}>
                <option value="">select an exam</option>
                {selectOptions}
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Building</th>
                        <th>Floor</th>
                        <th>Room No.</th>
                        <th>Start Roll</th>
                        <th>End Roll</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">Grand Total = </td>
                        <td>{totalCapacity}</td>
                    </tr>
                </tfoot>
            </table>

            
        </>
    );
}

function SelectOption(props){
    return(
    <option value={props.id}>{props.name}</option>
    );
}

function TableRow(props){
    return(
        <tr>
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
                {props.startRoll?props.startRoll:"-"}
            </td>
            <td>
                {props.endRoll?props.endRoll:"-"}
            </td>
            <td>
                {props.total}
            </td>
        </tr>
    );
}