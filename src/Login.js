import React, { useState } from "react";

function Login(props) {
    
    const[eiin, setEiin] = useState("");

    const eiinChanged = event=>{
        event.preventDefault();
        let value = event.target.value;
        setEiin(value);
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        console.log(eiin);
        props.history.push('/dashboard'); // Redirect to dashboard
    }

    return (
        <>    
            <input name="eiin" onChange={eiinChanged} type="text" />
            <input name="password" type="password" />
            <button type="submit" onClick={onSubmit} >Submit</button>
        </>
    );
}

export default Login;