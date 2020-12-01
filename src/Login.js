import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";

function Login(props) {
    
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

        Axios.post("http://localhost/seat-plan/api/validate-login.php",data).then(response=>{
           
            localStorage.setItem('eiin', eiin);
            props.history.push('/dashboard'); // Redirect to dashboard
        }).catch(error=>{
            console.log(error);
        });
       
    }

    return (
            <div className="master-wrapper">
                <main id="login-main">
                    <h1>Seat Plan Management</h1>
                    <div id="login-form-container">
                        <h2>User Login</h2>
                        <form>
                        <article>
                            <input name="eiin" onChange={eiinChanged} value={eiin} type="text" placeholder="EIIN" />
                        </article>
                        <article>
                            <input name="password" onChange={passChanged} value={password} type="password" placeholder="password" />
                        </article>
                        <article>
                            {/* <button className="submit" type="submit" onClick={onSubmit}>Submit</button> */}
                            <input onClick={onSubmit} type="submit" className="submit" value="Submit"/>
                        </article>
                        </form>
                    </div>
                </main>
            </div>
    );
}

export default Login;