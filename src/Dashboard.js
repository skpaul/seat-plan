import React from "react";


export default function Dashboard(){
   let data = localStorage.getItem('myData');
    return(
        <>
            <div>Im Dashboard</div>
            <div>{data}</div>
        </>
    ) ;

}