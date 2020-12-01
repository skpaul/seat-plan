import React from "react";

export default function Room(props){
    return (
        <div>
            <input type="text" name="roomNo" placeholder="room number"/>
            <input type="text" placeholder="start roll (optional)"/>
            <input type="text" placeholder="end roll (optional)"/>
            <input type="text" placeholder="total quantity"/>
        </div>
    );
}