import React, { useState } from "react";
import Axios from "axios";
import "./Home.css";
import { Link} from 'react-router-dom';


export default function Home(props){
    return(
        <div className="master-wrapper">
            <main>
                <h1>Seat Plan Management</h1>
                <div className="items">
                <Link to="/login">
                    <div className="item">
                        <div className="department">
                            Directorate Of Secondary & Higher Education
                        </div>
                        <div className="ministry">
                            Ministry of Education
                        </div>
                    </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}