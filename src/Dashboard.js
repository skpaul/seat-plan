import React, { useEffect, useState } from "react";
import Axios from "axios";

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

   useEffect(()=>{
    // console.log("use effect");

    let postData = new FormData();
    postData.append("eiin", eiin);
    Axios.post("http://localhost/seat-plan/api/institute-details.php",postData).then(response=>{
        let data = response.data;
        // console.log(data.level);
    }).catch(error=>{
        console.log(error);
    });

},[]);

const [divs, setDiv] = useState([]);
const [counterKey, setCounterKey] = React.useReducer(c => c + 1, 0);

const [count, setCount] = React.useState(0);
  

 const addNewDiv = event=>{
     event.preventDefault();
     setCount(count => count + 1);
     console.log(count);
     setDiv(divs => [...divs, <Testdiv key={count} val={count}/>]);
 }

    const allDivs = divs.map( item => (
        item
    ))

    return(
        <>
            <div>Im Dashboard {district}</div>
            <div>{eiin}</div>
            <button onClick={addNewDiv}>Add Div</button>
            <div>

            {allDivs}
            </div>
        </>
    ) ;

}

 function Testdiv(props){
    console.log(props.val);
    return (<h1 key={props.val}>HI</h1>);
}