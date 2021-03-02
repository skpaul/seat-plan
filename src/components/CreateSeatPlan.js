import React, { useState, useEffect } from "react";
import Axios from 'axios';
import TopNav from "./TopNav";
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import "./CreateSeatPlan.css";

function CreateSeatPlan(){

    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    const[examId, setExamId] = useState("");

    const[options, setOption]=useState([]);
    const selectOptions = options.map(item => (
        item
    ))


    //Get data on component load event
    useEffect(()=>{
        let postData = new FormData();
        // postData.append("eiin", eiinNo);
         postData.append("examId", examId);
        Axios.post(`${window.$apiUrl}/exam.php?action=list`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setOption(options => [...options, <SelectOption key={local_count} id={item.id} name={item.name} />]);
            })
           
            }).catch(error => {
                console.log(error);
                alert("Something goes wrong. Please try again");
            }); //end of axios.
    }, []); //end of useEffect

    const examChanged=(e)=>{
       setExamId(e.target.value);
    }

    let history = useHistory();

    const goToBuildingSelection=(e)=>{
        e.preventDefault();
        if(examId===""){
            alert("Select Exam");
            return;
        }

        history.push({
            pathname: '/seat-plan/new/select-building',
            search: '?query=abc',
            state: { id: examId, eiin:eiinNo }
        });
    }

    return(
        <>
            <TopNav/>
            {/* A good combobox here - https://react-select.com/home */}
            <h1>Select Examination</h1>

            <div className="cont box-shadow">
                <select onChange={examChanged}>
                    <option value="">select an exam</option>
                    {selectOptions}
                </select>

                <button onClick={goToBuildingSelection}>Next</button>
            </div>
           
        </>
    );
}
export default withRouter(CreateSeatPlan);

function SelectOption(props){
    return(
    <option value={props.id}>{props.name}</option>
    );
}