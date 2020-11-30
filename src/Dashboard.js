import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Dashboard(props){
   let eiin = localStorage.getItem('eiin');
   
   // remove
    //localStorage.removeItem('myData');

    // remove all
    // localStorage.clear();

   console.log(eiin);
   if(eiin == null || eiin === ""){
       props.history.push('/'); // Redirect to dashboard
   }

   const [district, setDistrict] = useState("");
   useEffect(()=>{
        console.log("use effect");

        let postData = new FormData();
        postData.append("eiin", eiin);
        Axios.post("http://localhost/seat-plan/api/institute-details.php",postData).then(response=>{
            let data = response.data;
            console.log(data.level);
            setDistrict(data.district);
        }).catch(error=>{
            console.log(error);
        });

   },[]);

   useEffect(()=>{
    console.log("use effect");

    let postData = new FormData();
    postData.append("eiin", eiin);
    Axios.post("http://localhost/seat-plan/api/institute-details.php",postData).then(response=>{
        let data = response.data;
        console.log(data.level);
    }).catch(error=>{
        console.log(error);
    });

},[]);

    return(
        <>
            <div>Im Dashboard {district}</div>
            <div>{eiin}</div>
        </>
    ) ;

}