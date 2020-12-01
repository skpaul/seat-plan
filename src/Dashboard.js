import React, { useEffect, useState } from "react";
import Axios from "axios";
import Building from "./components/Building";

export default function Dashboard(props){
    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));
    
//    let eiin = localStorage.getItem('eiin');
    //setEIIN(localStorage.getItem('eiin'));

   if(eiinNo == null || eiinNo === ""){
       props.history.push('/');
   }

   const [district, setDistrict] = useState("");
   const [thana, setThana] = useState("");
   const [type, setType] = useState("");
   const [level, setLevel] = useState("");
   
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [post, setPost] = useState("");
   const [mobile, setMobile] = useState("");
   const [email, setEmail] = useState("");

   //Get data on component load event
   useEffect(()=>{
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        Axios.post("http://localhost/seat-plan/api/institute-details.php?action=get",postData).then(response=>{
            if(response.data){
                let data = response.data;
                setDistrict(data.district);
                setThana(data.thana);
                setType(data.type);
                setLevel(data.level);
                setName(data.name);
                setAddress(data.address);
                setPost(data.post);
                setMobile(data.mobile);
                setEmail(data.email);
            }
        }).catch(error=>{
            console.log(error);
        });
   },[]);



    const [buildings, setBuilding] = useState([]);
    const [count, setCount] = React.useState(0);

    //This function is passed to Building and called from there.
    const buildingUpdated = (value) => {console.log("I am from dashboard and value is -" + value)};

    const addNewFloor = event=>{
        event.preventDefault();
        setCount(count => count + 1);
        setBuilding(buildings => [...buildings, <Building updateFunction={buildingUpdated} key={count} val={count}/>]);
    }

    const allBuildings = buildings.map( item => (
        item
    ))

    const districtChanged=event=>{
        setDistrict(event.target.value);
    }

    const thanaChanged=event=>{
        setThana(event.target.value);
    }

    const typeChanged=event=>{
        setType(event.target.value);
    }

    const levelChanged=event=>{
        setLevel(event.target.value);
    }

    const nameChanged=event=>{
        setName(event.target.value);
    }

    const addressChanged=event=>{
        setAddress(event.target.value);
    }

    const postChanged=event=>{
        setPost(event.target.value);
    }

    const mobileChanged=event=>{
        setMobile(event.target.value);
    }

    const emailChanged=event=>{
        setEmail(event.target.value);
    }

    const saveProfile= (e)=>{
        e.preventDefault();
        let updatedData = new FormData();
        updatedData.append("eiin", eiinNo);
        updatedData.append("district", district);
        updatedData.append("thana", thana);
        updatedData.append("type", type);
        updatedData.append("level", level);
        updatedData.append("name", name);
        updatedData.append("address", address);
        updatedData.append("post", post);
        updatedData.append("mobile", mobile);
        updatedData.append("email", email);
        Axios.post("http://localhost/seat-plan/api/institute-details.php?action=save",updatedData).then(response=>{
            if(response.data.issuccess){
                alert("Saved");
            }
            else{
                alert("Could not save. Please try again");
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    return(
        <>
            
            {/* <div>{eiin}</div> */}
            <div className="field">
                <label>District</label>
                <input onChange={districtChanged} id="district" name="district" value={district} type="text"/>
            </div>
           
            <div className="field">
                <label>Thana</label>
                <input onChange={thanaChanged} id="thana" name="thana" type="text" value={thana} type="text"/>
            </div>

            <div className="field">
                <label>Type</label>
                <input onChange={typeChanged} id="type" name="type" value={type} type="text"/>
            </div>

            <div className="field">
                <label>Level</label>
                <input onChange={levelChanged} id="level" name="level" value={level} type="text"/>
            </div>
            <div className="field">
                <label>Name</label>
                <input onChange={nameChanged} id="name" name="name" value={name} type="text"/>
            </div>
            <div className="field">
                <label>Address</label>
                <input onChange={addressChanged} id="address" address="address" value={address} type="text"/>
            </div>
            <div className="field">
                <label>Post</label>
                <input onChange={postChanged} id="post" post="post" value={post} type="text"/>
            </div>
            <div className="field">
                <label>Mobile</label>
                <input onChange={mobileChanged} id="mobile" mobile="mobile" value={mobile} type="text"/>
            </div>
            <div className="field">
                <label>Email</label>
                <input onChange={emailChanged} id="email" email="email" value={email} type="text"/>
            </div>
            
            <button id="saveButton" onClick={saveProfile} type="button">Save</button>
            <div>
                {allBuildings}
            </div>
            
            <div onClick={addNewFloor}>Add Building</div>
            
           
        </>
    ) ;

}
