import React from 'react';
import {Link} from 'react-router-dom';
import "./TopNav.css";
export default function TopNav(){
    return(
        <div className="top-nav">
            <div>
                <Link to="/dashboard">Profile</Link>
            </div>

            <div>
            <Link to="/seat-plan/new/select-exam">Create Seat Plan</Link>
            </div>

            <div>
                <Link to="/view-seat-plan">View Seat Plan</Link>
            </div>

            <div>
                <Link to="/">Logout</Link>
            </div>
        </div>
    );
}