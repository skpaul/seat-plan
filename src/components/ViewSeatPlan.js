import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./ViewSeatPlan.css";
import TopNav from "./TopNav";
import SeatPlanTableRow from "./SeatPlanTableRow";
import Footer from "./../Footer";

export default function ViewSeatPlan(props) {
    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    const [examId, setExamId] = useState("");
    const [options, setOption] = useState([]);
    const [rows, setRow] = useState([]); //for table tr
    const [isDownloadVisible, setDownloadVisible] = useState(false);

    const [departmentId, setDepartmentId] = useState(localStorage.getItem('departmentId'));

    //Get data on component load event
    useEffect(() => {
        let postData = new FormData();
        // postData.append("eiin", eiinNo);
        postData.append("examId", examId);
        Axios.get(`${window.$apiUrl}/exam.php?action=list&departmentid=${departmentId}`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setOption(options => [...options, <SelectOption key={local_count} id={item.examId} name={item.name} />]);
            })

        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.
    }, []); //end of useEffect

    const selectOptions = options.map(item => (
        item
    ))

    const tableRows = rows.map(item => (
        item
    ))


    const [totalCapacity, setTotalCapacity] = useState(0);

    //This function is passed to Building and called from there.
    const roomDeleted = (value) => {
        setRow([]);
        setTotalCapacity(0);
        let selectedExamId = document.getElementById("examIdCombo").value;
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("examId", selectedExamId);

        Axios.post(`${window.$apiUrl}/view-seat-plan.php?action=list`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setTotalCapacity(prevTotal => prevTotal + parseInt(item.capacity));
                setRow(rows => [...rows, <SeatPlanTableRow roomDeleted={roomDeleted} key={item.id} id={item.id} b={item.building} f={item.floor} r={item.roomNo} startRoll={item.startRoll} endRoll={item.endRoll} total={item.capacity} />]);
            })
            // setCount(count => count + local_count);
            //setCount(local_count);
        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.

    };

    const examChanged = (e) => {
        let examId = e.target.value;
        if (examId == "") {
            setRow([]);
            setTotalCapacity(0);
            setDownloadVisible(false);
            return;
        }
        
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("examId", examId);
        Axios.post(`${window.$apiUrl}/view-seat-plan.php?action=list`, postData).then(response => {
            const items = response.data;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setTotalCapacity(prevTotal => prevTotal + parseInt(item.capacity));
                //setRow(rows => [...rows, <TableRow key={local_count} b={item.building} f={item.floor} r={item.roomNo} startRoll={item.startRoll} endRoll={item.endRoll} total={item.capacity} />]);

                setRow(rows => [...rows, <SeatPlanTableRow roomDeleted={roomDeleted} key={item.roomId} id={item.roomId} b={item.building} f={item.floor} r={item.roomNo} startRoll={item.startRoll} endRoll={item.endRoll} total={item.capacity} />]);
            })
            // setCount(count => count + local_count);
            //setCount(local_count);
        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.

        //make download button visible
        setDownloadVisible(true);
    }

    const downloadClicked = (e)=>{
        let selectedExamId = document.getElementById("examIdCombo").value;
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        postData.append("examId", selectedExamId);

        // axios({
        //     method: 'post',
        //     url: '/user/12345',
        //     data: {
        //       firstName: 'Fred',
        //       lastName: 'Flintstone'
        //     }
        //   });

        Axios({
            url: `${window.$apiUrl}/csv.php`,
            method: 'post',
            // responseType: 'blob', // important
            data : postData
          }).then((response) => {
            
             const url = `${window.$apiUrl}/csv-files/${eiinNo}.csv`;
             const link = document.createElement('a');
             link.href = url;
            link.target = "_blank";
            link.setAttribute(
                'download',
                `Data.csv`,
                );
             document.body.appendChild(link);
             link.click();
            //  document.body.removeChild(link);
            // Clean up and remove the link
            link.parentNode.removeChild(link);


          });

        // Axios.post(`${window.$apiUrl}/csv.php`, postData).then(response => {
        //     const items = response.data;
        //     let local_count = 0;
              
            
        // }).catch(error => {
        //     console.log(error);
        //     alert("Something goes wrong. Please try again");
        // }); //end of axios.
    }

    return (
        <>
            <div className="master-wrapper">
                <header style={{ marginBottom: "0", paddingTop: "0", boxShadow: "none" }}>
                    <TopNav />
                </header>
                <main>
                    {/* A good combobox here - https://react-select.com/home */}
                    <h1>Seat Plan Details</h1>
                    <div className="seatPlanCont box-shadow">
                        <select id="examIdCombo" onChange={examChanged}>
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
                                    <th></th>
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
                        {
                            isDownloadVisible && (
                                <div className="downloadButton" onClick={downloadClicked}>Download CSV</div>
                            )
                        }
                        
                    </div>
                    
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}

function SelectOption(props) {
    return (
        <option value={props.id}>{props.name}</option>
    );
}

// function TableRow(props){
//     return(
//         <tr>
//             <td>
//                 {props.b}
//             </td>
//             <td>
//                 {props.f}
//             </td>
//             <td>
//                 {props.r}
//             </td>
//             <td>
//                 {props.startRoll==0?props.startRoll:"-"}
//             </td>
//             <td>
//                 {props.endRoll==0?props.endRoll:"-"}
//             </td>
//             <td>
//                 {props.total}
//             </td>
//         </tr>
//     );
// }