import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import "./Login.css";

function Login(props) {
    localStorage.clear();
    const location = useLocation();
    localStorage.setItem('departmentId', location.state.departmentId);
    // console.log(location.state.departmentId);
    const[eiin, setEiin] = useState("");
    const[password, setPassword] = useState("");
    const[departmentDetails, setDepartmentDetails]= useState({});

    //Get data on component load event
    useEffect(() => {
        Axios.get(`${window.$apiUrl}/department-ministry.php?action=details&department-id=${location.state.departmentId}`).then(response => {
            const data = response.data;
            setDepartmentDetails(response.data);
            
           console.log(localStorage.getItem('departmentId'));
        }).catch(error => {
            console.log(error);
            alert("Something goes wrong. Please try again");
        }); //end of axios.

    }, []); //end of useEffect

    const eiinChanged = event=>{
        event.preventDefault();
        let value = event.target.value;
        setEiin(value);
    }

    const passChanged=event=>{
        event.preventDefault();
        setPassword(event.target.value.trim());
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setButtonText("wait..");
        let data = new FormData();
        data.append("eiin",eiin);
        data.append("password", password);

        Axios.post(`${window.$apiUrl}/validate-login.php`,data).then(response=>{
            
            if(!response.data.issuccess){
                alert(response.data.message);
                setButtonText("Try again");
                return;
            }

            setButtonText("Redirecting...");

            localStorage.setItem('eiin', eiin);
            props.history.push('/dashboard'); // Redirect to dashboard
        }).catch(error=>{
            alert("Something goes wrong. Could not login.");
            console.log(error);
            setButtonText("Try again");
        });
       
    }

    const[butonText, setButtonText]= useState("Login");
    return (
            <div className="login-master-wrapper">
                <main id="login-main">
                    <div className="loginTitle" style={{marginBottom:"20px"}}>Seat Plan Management</div>
                    <div style={{display:"flex"}}>
                        <div className="departmentLogo">
                            {/* <img src="logos/govt-logo.png"></img> */}
                            <img src={process.env.PUBLIC_URL + '/logos/' + departmentDetails.logoName } /> 
                        </div>
                        <div>
                            <div className="departmentName">{departmentDetails.fullNameOfDepartment}</div>
                            <div className="ministryName">{departmentDetails.ministryName}</div>
                        </div>
                    </div>
                   
                    <div style={{display:"flex"}}>
                    <iframe width="420" height="315"
                     allowFullScreen="allowfullscreen"
                        src="https://www.youtube.com/embed/v8B23p2snIo?autoplay=1">
                    </iframe>
                  
                   

                    <div id="login-form-container" style={{width:"442px", height:"314px", marginLeft:"20px"}}>
                        <h2 className="login-h2">Institute Login</h2>
                        <form>
                        <article className="login-article">
                            <input className="login-name-textbox" name="eiin" onChange={eiinChanged} value={eiin} type="text" placeholder="EIIN" />
                        </article>
                        <article  className="login-article">
                            <input className="login-password-textbox" name="password" onChange={passChanged} value={password} type="password" placeholder="password" />
                        </article>
                        <article  className="login-article">
                            {/* <button className="submit" type="submit" onClick={onSubmit}>Submit</button> */}
                            <input className="login-button" onClick={onSubmit} type="submit"  value={butonText}/>
                        </article>
                        </form>
                    </div>
                    </div>
                   
                </main>
            </div>
    );
}

export default Login;