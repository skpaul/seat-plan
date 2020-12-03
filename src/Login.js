import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";

function Login(props) {
    //const apiUrl = "http://localhost";
    const apiUrl = "http://209.126.69.61:5000";

    const[eiin, setEiin] = useState("");
    const[password, setPassword] = useState("");

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
        let data = new FormData();
        data.append("eiin",eiin);
        data.append("password", password);

        Axios.post(`${apiUrl}/seat-plan/api/validate-login.php`,data).then(response=>{
           
            localStorage.setItem('eiin', eiin);
            props.history.push('/dashboard'); // Redirect to dashboard
        }).catch(error=>{
            alert("Something goes wrong. Could not login.");
            console.log(error);
        });
       
    }

    return (
            <div className="login-master-wrapper">
                <main id="login-main">
                    <h1 className="login-h1">Seat Plan Management</h1>
                    <div id="login-form-container">
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
                            <input className="login-button" onClick={onSubmit} type="submit"  value="Submit"/>
                        </article>
                        </form>
                    </div>
                </main>
            </div>
    );
}

export default Login;