import React, { useEffect, useState } from "react";
import Axios from "axios";
import Building from "./components/Building";
import './bootstrap-grid.css';
import './teletalk.css';
import TopNav from "./components/TopNav";

export default function Dashboard(props) {

    const apiUrl = "http://localhost";
    // const apiUrl = "http://209.126.69.61:5000";

    const [eiinNo, setEIIN] = useState(localStorage.getItem('eiin'));

    //    let eiin = localStorage.getItem('eiin');
    //setEIIN(localStorage.getItem('eiin'));

    if (eiinNo == null || eiinNo === "") {
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
    const [password, setPassword] = useState("");


    const [count, setCount] = useState(0);

    //Get data on component load event
    useEffect(() => {
        let postData = new FormData();
        postData.append("eiin", eiinNo);
        //Get institute profile details -->
        Axios.post(`${apiUrl}/seat-plan/api/institute-details.php?action=get`, postData).then(response => {
            if (response.data) {
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
                setPassword(data.password);
            }
        }).catch(error => {
            console.log(error);
        }); //<--Get institute profile details


        Axios.post(`${apiUrl}/seat-plan/api/div-dist-thana.php?action=districtList`).then(response => {
            const items = response.data.districts;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setDistrictList(districtList => [...districtList, <SelectOption key={local_count} id={item.district} name={item.district} />]);
            })
           
            }).catch(error => {
                console.log(error);
            }); //end of axios.

    }, []);

    const[districtList, setDistrictList]=useState([]);
    const districtOptions = districtList.map(item => (
        item
    ))

    const[thanaList, setThanaList]=useState([]);
    const thanaOptions = thanaList.map(item => (
        item
    ))

    const districtChanged = event => {
        setDistrict(event.target.value);
        setThanaList([]);
        let formData = new FormData();
        formData.append("district", event.target.value);
        Axios.post(`${apiUrl}/seat-plan/api/div-dist-thana.php?action=thanaList`, formData).then(response => {
            const items = response.data.thanas;
            let local_count = 0;
            items.map((item) => {
                local_count += 1;
                setThanaList(thanaList => [...thanaList, <SelectOption key={local_count} id={item.thana} name={item.thana} />]);
            })
           
            }).catch(error => {
                console.log(error);
            }); //end of axios.
    }

    const thanaChanged = event => {
        setThana(event.target.value);
    }

    const typeChanged = event => {
        setType(event.target.value);
    }

    const levelChanged = event => {
        setLevel(event.target.value);
    }

    const nameChanged = event => {
        setName(event.target.value);
    }

    const addressChanged = event => {
        setAddress(event.target.value);
    }

    const postChanged = event => {
        setPost(event.target.value);
    }

    const mobileChanged = event => {
        setMobile(event.target.value);
    }

    const emailChanged = event => {
        setEmail(event.target.value);
    }

    const passwordChanged = event => {
        setPassword(event.target.value);
    }


    const saveProfile = (e) => {
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
        updatedData.append("password", password);

        Axios.post(`${apiUrl}/seat-plan/api/institute-details.php?action=save`, updatedData).then(response => {
            if (response.data.issuccess) {
                alert("Saved");
            }
            else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });//end of axios


        
    }

    return (
        <>
        <TopNav/>
            <div className="container box-shadow" style={{marginBottom:'50px'}}>
                <h2>
                    Institute Profile
                </h2>
                <form className="classic">
                    <div className="row">
                        <div className="col-lg-8">
                            <div key="nameDiv" className="field">
                                <label>Institute Name</label>
                                <input onChange={nameChanged} id="name" name="name" value={name} type="text" />
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div key="eiinDiv" className="field">
                                <label>EIIN</label>
                                <input id="eiinNo" name="eiinNo" value={eiinNo} type="text" readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="field">
                                <label>Institute Type</label>
                                <select onChange={typeChanged} id="type" name="type" value={type} >
                                    <option value="">select ...</option>
                                    <option value="School">School</option>
                                    <option value="College">Collecge</option>
                                    <option value="Madrasah">Madrasah</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="field">
                                <label>Level</label>
                                <input onChange={levelChanged} id="level" name="level" value={level} type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="field">
                                <label>Address</label>
                                <input onChange={addressChanged} id="address" address="address" value={address} type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="field">
                                <label>District</label>
                                {/* <input onChange={districtChanged} id="district" name="district" value={district} type="text" /> */}
                                <select onChange={districtChanged} id="district" name="district" value={district}>
                                    <option value="">select ...</option>
                                    {districtOptions}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="field">
                                <label>Thana</label>
                                <select onChange={thanaChanged} id="thana" name="thana" type="text" value={thana} type="text">
                                    <option value="">select ...</option>
                                    {thanaOptions}
                                </select>

                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="field">
                                <label>Post</label>
                                <input onChange={postChanged} id="post" post="post" value={post} type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="field">
                                <label>Mobile</label>
                                <input onChange={mobileChanged} id="mobile" mobile="mobile" value={mobile} type="text" />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="field">
                                <label>Email</label>
                                <input onChange={emailChanged} id="email" email="email" value={email} type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="field">
                                <label>Password</label>
                                <input onChange={passwordChanged} id="password" password="password" value={password} type="password" />
                            </div>
                        </div>
                    </div>

                    <br/>  <br/>
                    <button className="btn btn-large btn-dark" id="saveButton" onClick={saveProfile} type="button">SAVE PROFILE</button>
                    <br/>  <br/>  <br/>
                </form>
            </div>
        </>
    );
}


function SelectOption(props){
    return(
    <option value={props.id}>{props.name}</option>
    );
}