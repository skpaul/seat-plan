import React, { useState } from "react";
import Axios from "axios";

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
            console.log(response.data);
            localStorage.setItem('myData', "hi");
            props.history.push('/dashboard'); // Redirect to dashboard
        }).catch(error=>{
            console.log(error);
        });
       
    }

    return (
        <>    
            <input name="eiin" onChange={eiinChanged} value={eiin} type="text" />
            <input name="password" onChange={passChanged} value={password} type="password" />
            <button type="submit" onClick={onSubmit} >Submit</button>
        </>
    );
}

export default Login;